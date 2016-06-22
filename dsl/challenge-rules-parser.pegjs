/*
  Gamification Rules
  ==================

  OPERATOR (>=, <=, =, >, <)
  timeframe (minute, hour, day, week, month, year)
  WEEK_DAY (monday,tuesday,wednesday,thursday,friday,saturday,sunday,weekday,weekend)

  give x POINTS_LEVEL_LIST
  give x BADGE_1
  give x 10_PERCENT_REBATE
  give x MEMBER_TAG

  challenge CHALLENGE_CODE [x times][within x timeframe]

  action ACTION_CODE [x times][within x timeframe]  [with TAG 'TAG_NAME' [= x]][in zone ZONE_CODE[,ZONE_CODE]][near X of beacon BEACON_CODE[,BEACON_CODE]] system_condition

  member level LEVEL_LIST [operator] x [with TAG 'TAG_NAME' [= x]]
  member points LEVEL_LIST [operator] x [with TAG 'TAG_NAME' [= x]]
  member tag TAG_NAME  [operator] x [with TAG 'TAG_NAME' [= x]]
  member in zone ZONE_CODE[,ZONE_CODE] [for x timeframe]

  member did nothing [occurence_filter,period_filter]
  member did something [occurence_filter,period_filter]
  member did not ACTION_CODE [occurence_filter,period_filter]
  member did not ACTION_CODE with [attribute_name OPERATOR value][occurence_filter,period_filter]
  member has completed CHALLENGE_CODE [occurence_filter,period_filter]
  member has not completed CHALLENGE_CODE [occurence_filter,period_filter]

  occurece_filter
    at least x time
    at least x times
    less than x time
    less than x times
    exactly x time
    exactly x times

  period_filter
    before TIME_DATE
    after TIME_DATE
    between TIME_DATE and TIME_DATE
    in last x timeframe

  // NOT IMPLEMENTED YET
  member new level LEVEL_CODE [x times][within x timeframe]  [with TAG TAG_NAME [= x]]
  zone enter CODE
  zone exit CODE
*/

/*HELPER FUNCTIONS*/
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
    = first:simple_rule reminders:(S* "and" S* simple_rule)+ rewards:(S* simple_reward)+
    {
        return {
            rules: buildList(first, reminders, 3),
            rewards: buildList(null, rewards, 1)
        };
    }

    / rule:simple_rule rewards:(S* simple_reward)+
    {
        return  {
            rules: [rule],
            rewards: buildList(null, rewards, 1)
        }
    }

simple_rule
    = scope:"action" S* actionCode:actionCode conditions:(S* condition)* filters:(S* filter)* S* system:system_condition?
    {

        var theRule = {
            scope: scope,
            code: actionCode,
            conditions: buildList(null, conditions, 1),
            filters: buildList(null, filters, 1),
        };
        if(system){
                theRule.system = system;
        }
        return theRule
    }
    / scope:"challenge" S* challengeCode:challengeCode conditions:(S* condition)* filters:(S* filter)*
    {
        return {
            scope: scope,
            code: challengeCode,
            conditions: buildList(null, conditions, 1),
            filters: buildList(null, filters, 1)
        };
    }
    / scope:"member" S* type:("level" / "point") S* levelCode:levelCode S* operator:OPERATOR? S* value:NUMBER S* filter:withTag?
    {
        var theRule = {
            scope: scope,
            type: type,
            levelCode: levelCode,
            conditions: [ {operator: operator ? operator : '>=', type: type, value: value} ],
            filters: filter ? [ filter ] : []
        };

        return theRule;
    }
    / scope:"member" S* type:"tag" S* tagCode:tagCode S* operator:OPERATOR? S* value:NUMBER S* filter:withTag?
    {
        var theRule = {
            scope: scope,
            type: type,
            tagClusterCode: tagCode.tagClusterCode,
            levelCode: tagCode.tagCode,
            conditions: [ {operator: operator ? operator : '>=', type: type, value: value} ],
            filters: filter ? [ filter ] : []
        };

        return theRule;
    }
    / scope:"member" S* "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)* durationOption:(S* "for" S* NUMBER S* timeframe)?
    {
        var theRule = {
            scope: scope,
            type: "zone",
            codes: buildList(first, reminders, 3),
            duration: (durationOption) ? durationOption[3] : null,
            timeframe: (durationOption) ? durationOption[5] : null
        };

        return theRule;
    }/ member_condition
/* (SG): NOT SUPPORTED YET
    / scope:"member" S* type:"level up" S* levelCode:levelCode conditions:(S* condition)* S* filter:withTag?
    {
        return {
            scope: scope,
            type: type,
            levelCode: levelCode,
            conditions: buildList(null, conditions, 1),
            filters: filter ? [ filter ] : []
        };
    }
*/


simple_reward
    = "give" S* qty:NUMBER S* rewardCode:rewardCode
    {
        var theReward= {
            quantity: qty,
            code: rewardCode
        };

        return theReward
    }

/*MEMBER CONDITION*/

member_condition
    = scope:"member" S* type:"did" S* conditions:did_rule S* filter1:occurence_filter? S* filter2:period_filter?
    {
        return {
            scope:scope,
            type:type,
            condition:conditions,
            occurence_filter:filter1,
            period_filter:filter2
        };
    }
    /scope:"member" S* type:"has" S* conditions:has_rule S* filter1:occurence_filter? S* filter2:period_filter?
      {
          return {
              scope:scope,
              type:type,
              condition:conditions,
              occurence_filter:filter1,
              period_filter:filter2
          };
      }



member_action_condition
    = "with" S* first:attribute_operator_value remainders:(S* "," S* attribute_operator_value)*
    {
        return buildList(first,remainders,3);
    }


did_rule
    =type:"nothing"
    {
        return {
             type:type
        }
    }/type:"not" S* actionCode:actionCode S* condition:member_action_condition?
    {
        return {
            type:type,
            code:actionCode,
            conditions:condition
        }
    }

    /type:"something"
    {
        return {
            type:type
        }
    }/actionCode:actionCode S* condition:member_action_condition?
    {
    	return {
        	type:null,
            code:actionCode,
            condition:condition
        }
    }

has_rule
    = type:"not" S* subType:"completed" S* challengeCode:challengeCode
    {
        return {
            type:type,
            sub_type:subType,
            code:challengeCode
        }
    }/ subType:"completed" S* challengeCode:challengeCode
     {
         return {
             type:null,
             sub_type:subType,
             code:challengeCode
         }
     }
    /type:"not" S* subType:("gained"/"lost") S* number:NUMBER? S* ("tags"/"tag") S* tagCode:tagCode
    {
        return {
            type:type,
            sub_type:subType,
            number:number,
            tagCode:tagCode
        }
    }
    /subType:("gained"/"lost") S* number:NUMBER? S* ("tags"/"tag") S* tagCode:tagCode
    {
        return {
            type:null,
            sub_type:subType,
            number:number,
            tagCode:tagCode
        }
    }

/*OCCURENCE FILTER*/

occurence_filter
    = "at" S* type:"least" S* number:NUMBER S* ("times" / "time")
    {
        return {
            type:type,
            number:number
        }
    }
    /type:"less" S* "than" S* number:NUMBER S* ("times" / "time")
    {
        return {
          type:type,
          number:number
        }
    }
    /type:"exactly" S* number:NUMBER S* ("times" / "time")
    {
        return {
          type:type,
          number:number
        }
    }

/*PERIOD_FILTER*/

period_filter
    = type:"before" S* date:DATE_TIME_STRING
    {
        return {
            type:type,
            date:[date]
        }
    }
    /type:"after" S* date:DATE_TIME_STRING
    {
        return {
            type:type,
            date:[date]
        }
    }
    /type:"between" S* start:DATE_TIME_STRING S* "and" S* end:DATE_TIME_STRING
    {
        return {
            type:type,
            date:[start,end]
        }
    }
    /"in" S* type:"last" S* duration:NUMBER S* durationScope:timeframe
    {
        return {
            type:type,
            duration: duration,
            durationScope: durationScope
        }
    }

/*SYSTEM CONDITION*/

system_condition
    = (every / on_rule)

condition
    = (withinTimeframe / numberOfTimes)

filter
    = (withTag / withData / inZoneAction / nearBeaconAction)

on_rule
    = "on" S* rule:( on_date / on_the )
    {
        return rule;
    }

on_date
    = first:DATE S* remainders:(S* "," S* DATE)* S* time:timeRule?
    {
        return {
            type: 'on',
            date:buildList(first,remainders,3),
            time:time
        }
    }

on_the
    = "the" S* first:POSITION remainders:(S* "," S* position:POSITION)* S* "day" S* months:(ofMonth/ "of" S* "month") S* years:(inYear / dateRules)? S* time:timeRule?
    {
        var result={
           type: 'onThe',
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

every
    ="every" S* first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
    {
        return {
            type : 'every',
            days:{type:"days",list:buildList(first,remainders,3)},
            months:months,
            years:years,
            time:time
        };
    }
    / "every" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
    {
        return {
            type : 'every',
            days:{type:"day",list:["day"]},
            months:months,
            years:years,
            time:time

        };
    }

/*SYSTEM CONDITION TIME RELATED*/

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

/*SYSTEM CONDITION MONTH RELATED*/

ofMonth
    = "of" S* first:MONTHS remainders:(S* "," S* months:MONTHS)*
    {
        return {
            type:"of",
            list:buildList(first,remainders,3)
        };
    }

/*SYSTEM CONDITION YEAR RELATED*/

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

/*MIX*/

inZoneAction
    = "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
    {
        return {
            type: 'zone',
            zones: buildList(first, reminders, 3)
        };
    }

nearBeaconAction
    = "near" S* distance:NUMBER S* "of beacon" S* first:beaconCode reminders:(S* "," S* beaconCode:beaconCode)*
    {
        return {
            type: 'beacon',
            distance: distance,
            beacons: buildList(first, reminders, 3)
        };
    }

withTag
    = "with tag" S* tagCode:tagCode
    {
        return {
            type: 'tag',
            tagClusterCode: tagCode.tagClusterCode,
            tag: tagCode.tagCode
        };
    }

withData
    = "with data" S* attributeName:attributeName S* operator:OPERATOR S* value:(string / NUMBER)
    {
        return {
            type: 'data',
            operator: operator,
            attribute: attributeName,
            value: value
        };
    }

numberOfTimes
    = value:NUMBER S* "times"
    {
        return {
          type: 'times',
          value: value
        }
    }

withinTimeframe
    = value:NUMBER S* "times" S* "within" S* duration:NUMBER S* durationScope:timeframe
    {
        return {
          type: 'times_within_timeframe',
          value: value,
          duration: duration,
          durationScope: durationScope
        }
    }

attribute_operator_value
    = attributeName:attributeName S* operator:OPERATOR S* value:(string / NUMBER)
    {
         return {
             operator: operator,
             attribute: attributeName,
             value: value
         };
    }
    
/*PRIMARY*/

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

path_start
    = [_a-z]i

path_char
    = [_a-z0-9-\.]i

path
    = start:path_start chars:path_char*
    {
        return start + chars.join("");
    }

name
    = chars:path_char+
    {
        return chars.join("");
    }

code
    = chars:path_char+
    {
        return chars.join("");
    }

attributeName "attributeName"
    = code

rewardCode "rewardCode"
    = code

actionCode "actionCode"
    = code

challengeCode "challengeCode"
    = code

levelCode "levelCode"
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

beaconCode "beaconCode"
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

NULL_VALUE "<null>"
 = 'n' 'u' 'l' 'l'
 {
    return null;
 }

STRING "string"
    = string:string
    {
        return string;
    }

PATH "path"
    = path:path
    {
        return path;
    }

HASH "hash"
    = "#" name:name
    {
        return name;
    }

date_full_year
    = $(DIGIT DIGIT DIGIT DIGIT)

date_month
    = ($([0] DIGIT) / $([1] [0-2]))

date_day
    = ($([0-2] DIGIT) / $([3] [0-1]))

time_hour_12
    = $([0] DIGIT) / $([1] [0-2]) / $(DIGIT)

time_hour_24
    =$([0-1] DIGIT) / $([2] [0-3])

time_minute
    = $([0-5] DIGIT)

time_second
    = $([0-5] DIGIT)

DATE "date"
    = year:date_full_year "-" month:date_month "-" day:date_day
    {
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

DATE_TIME "datetime"
    = year:date_full_year "-" month:date_month "-" day:date_day "T" hour:time_hour_24 ":" minute:time_minute ":" second:time_second
    {
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second), 0);
    }

DATE_TIME_STRING "datetime"
    = year:date_full_year "-" month:date_month "-" day:date_day "T" hour:time_hour_24 ":" minute:time_minute ":" second:time_second
    {
        return year + "-" + month + "-" + day + "T" + hour + ":" + minute + ":" + second;
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

TIME_CHOICE
    = time:TIME_12 S* choice:("am"/"pm")
     {
        if(choice=="pm"){
            time.hour=parseInt(time.hour)+12;
        }
        return time.hour+":"+time.minute;
    }

TIME_12 "time"
    = hour:time_hour_12 ":" minute:time_minute
    {

        return {hour:hour,minute:minute};
    }

POSITION
    = position:("1st" / "2nd" / "3rd" / $([4-9] "th") / $(DIGIT DIGIT "th")/ "last")
    {
        return position;
    }

OPERATOR
    = op:(">=" / "<=" / "=" / ">" / "<")
    {
        return op;
    }

timeframe
    = value:("minutes" / "minute" / "hours" / "hour" / "days" / "day" / "weeks" / "week" / "months" / "month" / "years" / "year" )
    {
        return value.replace(/s/g,'');
    }