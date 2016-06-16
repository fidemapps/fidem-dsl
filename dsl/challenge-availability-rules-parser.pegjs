/*
  Availability Rules
  ==================

  time_period (minute, hour, day, week, month, year)

  level LEVELCODE >= 1
  tag TAGCODE >= 10
  //segment SEGMENTCODE >= 1 --> Not supported right now
  challenge CHALLENGECODE
  in zone ZONECODE[,ZONECODE][for x time_period]

  // NOT IMPLEMENTED YET
  zone enter ZONECODE
  zone exit ZONECODE
 */
{
    function extractOptional(optional, index) {
        return optional ? optional[index] : null;
    }

    function extractList(list, index) {
        var result = [], i;

        for (i = 0; i < list.length; i++) {
            if (list[i][index] !== null) {
                result.push(list[i][index]);
            }
        }

        return result;
    }

    function buildList(first, rest, index) {
        return (first !== null ? [first] : []).concat(extractList(rest, index));
    }
}

start
    = rules;

rules
    = first:simple_rule reminders:(S* "and" S* simple_rule)+
    {
        return  buildList(first, reminders, 3);
    }

    / rule:simple_rule
    {
        return [rule];
    }

simple_rule
    = scope:"level" S* levelCode:levelCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: levelCode,
            operator: operator,
            value: value
        };
    }
    / scope:"tag" S* tagCode:tagCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: tagCode.tagCode,
            tagClusterCode: tagCode.tagClusterCode,
            operator: operator,
            value: value
        };
    }
    / "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)* durationOption:(S* "for" S* NUMBER S* timeframe)?
    {
        return {
            scope: "zone",
            codes: buildList(first, reminders, 3),
            duration: (durationOption) ? durationOption[3] : null,
            timeframe: (durationOption) ? durationOption[5] : null
        };
    }
    / scope:"challenge" S* challengeCode:challengeCode
    {
        return {
            scope: scope,
            code: challengeCode
        };
    }
    / "belongs to smartlist" S* firstCode:smartlistCode S* codes:("," S* code:smartlistCode)*
    {
        return {
           scope: "smartlist",
           codes: buildList(firstCode, codes, 2)
       };
    }
    /"every" S* first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                scope : 'every',
                days:{type:"days",list:buildList(first,remainders,3)},
                months:months,
                years:years,
                time:time
            }
        }
    /"every" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                scope : 'every',
                days:{type:"day",list:["day"]},
                months:months,
                years:years,
                time:time

            }
        }
    /onRule



onRule
    = "on" S* rule:( onDate / onThe )
    {
        return rule;
    }

onDate
    = first:DATE S* remainders:(S* "," S* DATE)* S* time:timeRule?
    {
        return {
            scope: 'on',
            date:buildList(first,remainders,3),
            time:time
        }
    }

onThe
    = "the" S* first:POSITION remainders:(S* "," S* position:POSITION)* S* "day" S* months:(ofMonth/ "of" S* "month") S* years:(inYear / dateRules)? S* time:timeRule?
    {
        var result={
           scope: 'onThe',
           days: {type:"position",list:buildList(first,remainders,3)},
           months:months,
           years:years,
           time:time
        };

        if(Array.isArray(months)){
            result.months={type:'month', list:["month"]};
        }

        return result;
    }

string1
    = '"' chars:([^\n\r\f\\"] / "\\" )* '"'
    {
        return chars.join("");
    }

string2
    = "'" chars:([^\n\r\f\\'] / "\\" )* "'"
    {
        return chars.join("");
    }

string
    = string1 / string2

code_char
    = [_a-z0-9-\.]i

code
    = chars:code_char+
    {
        return chars.join("");
    }

challengeCode "challengeCode"
    = code

levelCode "levelCode"
    = code

segmentCode "segmentCode"
    = code

smartlistCode "smartlistCode"
    = code

tagCode "tagCode"
    = tagClusterCode:tagClusterCode? code:code
    {
        return {
            tagCode: code,
            tagClusterCode: tagClusterCode ? tagClusterCode : null
        }
    }

tagClusterCode
    = code:code ":" { return code; }

zoneCode "zoneCode"
    = code

NUMBER "number"
    = [+-]? (DIGIT* "." DIGIT+ / DIGIT+)
    {
        return parseFloat(text());
    }

DIGIT "digit"
    = [0-9]

s
    = [ \t\r\n\f]+

S "whitespace"
    = s

STRING "string"
    = string:string
    {
        return string;
    }

timeframe
    = value:("minutes" / "minute" / "hours" / "hour" / "days" / "day" / "weeks" / "week" / "months" / "month" / "years" / "year" )
    {
        return value.replace(/s/g,'');
    }

timeRule
    = (beforeTime / afterTime / betweenTimes)

beforeTime
    = "before" S* time:TIME_CHOICE
    {
        return {
            type:"before",
            list:[time]
        }
    }

afterTime
    = "after" S* time:TIME_CHOICE
    {
        return {
            type:"after",
            list: [time]
        };
    }

betweenTimes
    = "between" S* start:TIME_CHOICE S* "and" S* end:TIME_CHOICE
    {
        return {
            type:"between",
            list:[start,end]
        };
    }

ofMonth
    = "of" S* first:MONTHS remainders:(S* "," S* months:MONTHS)*
    {
        return {
            type:"of",
            list:buildList(first,remainders,3)
        };
    }

inYear
    = "in" S* first:YEARS remainders:(S* "," S* years:YEARS)*
    {
        return {
            type:"in",
            list:buildList(first,remainders,3)
        };
    }

dateRules
    = (fromDate / startingDate / untilDate)

fromDate
    = "from" S* start:DATE S* "to" S* end:DATE
    {
        return {
            type:"from",
            list:[start,end]
        };
    }

startingDate
    = "starting at" S* year:DATE
    {
        return {
            type:"starting",
            list:[year]
        };
    }

untilDate
    = "until" S* year:DATE
    {
        return {
            type:"until",
            list:[year]
        };
    }

DIGIT "digit"
    = [0-9]

date_full_year
    = $(DIGIT DIGIT DIGIT DIGIT)

date_month
    = ($([0] DIGIT) / $([1] [0-2]))

date_day
    = ($([0-2] DIGIT) / $([3] [0-1]))

time_hour
    = $([0] DIGIT) / $([1] [0-2]) / $(DIGIT)

time_minute
    = $([0-5] DIGIT)

time_second
    = $([0-5] DIGIT)

DATE "date"
    = year:date_full_year "-" month:date_month "-" day:date_day
    {
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

TIME_CHOICE
    = time:TIME S* choice:("am"/"pm")
     {
        if(choice=="pm"){
            time.hour=parseInt(time.hour)+12;
        }
        return time.hour+":"+time.minute;
    }

TIME "time"
    = hour:time_hour ":" minute:time_minute
    {

        return {hour:hour,minute:minute};
    }

WEEK_DAY
    = day:("sunday" / "monday" / "tuesday" / "wednesday" / "thursday" / "friday" / "saturday" / "weekday" / "weekend")
    {
        return day;
    }

YEARS "year"
    = years:date_full_year
    {
        return years;
    }

MONTHS
    = months:("january" / "february" / "march" / "april" / "may" / "june" / "july" / "august" / "september" / "october" / "november" / "december")
    {
        return months;
    }

POSITION
    = position:("1st" / "2nd" / "3rd" / $([4-9] "th") / $(DIGIT DIGIT "th")/ "last")
    {
        return position;
    }