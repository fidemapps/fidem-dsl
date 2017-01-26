/*
  Availability Rules
  ==================

  time_period (minute, hour, day, week, month, year)

  level LEVELCODE >= 1
  tag TAGCODE >= 10
  //segment SEGMENTCODE >= 1 --> Not supported right now
  challenge CHALLENGECODE
  in geofence GEOFENCECODE[,GEOFENCECODE][for x time_period]

  // NOT IMPLEMENTED YET
  geofence enter GEOFENCECODE
  geofence exit GEOFENCECODE
 */
{

    //Merge 2 objects and their fields into one object

    if (typeof Object.assign != 'function') {
      Object.assign = function(target) {
        'use strict';
        if (target == null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source != null) {
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
        }
        return target;
      };
    }


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
    = scope:"level" S+ levelCode:levelCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: levelCode,
            operator: operator,
            value: value
        };
    }
    / scope:"tag" S+ tagCode:tagCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: tagCode.tagCode,
            tagClusterCode: tagCode.tagClusterCode,
            operator: operator,
            value: value
        };
    }
    / "in geofence" S+ first:geofenceCode reminders:(S* "," S* geofenceCode:geofenceCode)* durationOption:(S* "for" S* NUMBER S* timeframe)?
    {
        return {
            scope: "geofence",
            codes: buildList(first, reminders, 3),
            duration: (durationOption) ? durationOption[3] : null,
            timeframe: (durationOption) ? durationOption[5] : null
        };
    }
    / scope:"challenge" S+ challengeCode:challengeCode
    {
        return {
            scope: scope,
            code: challengeCode
        };
    }
    / "belongs to smartlist" S+ firstCode:smartlistCode S* codes:("," S* code:smartlistCode S*)*
    {
        return {
           scope: "smartlist",
           codes: buildList(firstCode, codes, 2)
       };
    }
    /"every" S+ first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                scope : 'every',
                days:{type:"days",list:buildList(first,remainders,3)},
                months:months,
                years:years,
                time:time
            }
        }
    /"every" S+ "day" S+ months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
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
    /member_condition

/*MEMBER CONDITION*/

member_condition
    = scope:"member" S+ type:"did" S+ conditions:did_rule S* filter1:occurrence_filter? S* filter2:period_filter? S* filter3:momentFilter?
    {
        return {
            scope:scope,
            type:type,
            condition:conditions,
            occurrence_filter:filter1,
            period_filter:filter2,
            moment_filter:filter3
        };
    }
    /scope:"member" S+ type:"has" S+ conditions:has_rule_completed S* filter1:occurrence_filter? S* filter2:period_filter? S* filter3:momentFilter?
      {
          return {
              scope:scope,
              type:type,
              condition:conditions,
              occurrence_filter:filter1,
              period_filter:filter2,
              moment_filter:filter3
          };
      }
    /scope:"member" S+ type:"has" S+ conditions:has_rule_gained_lost S* filter2:period_filter? S* filter3:momentFilter?
        {
           return {
               scope:scope,
               type:type,
               condition:conditions,
               occurrence_filter:null,
               period_filter:filter2,
               moment_filter:filter3
           };
        }
    /scope:"member" S+ type:"with" S+ condition:(member_attribute_condition)
    {
        return {
            scope:scope,
            type:"with",
            condition:{
                type: null,
                query: condition
            }
        };
    }
    /scope:"member" S+ type:"without" S+ condition:(member_attribute_condition)
    {
        return {
            scope:scope,
            type:"with",
            condition:{
                type: 'not',
                query: condition
            }
        };
    }


member_action_condition
    = "with" S+ first:attribute_operator_value remainders:(S* "&" S* attribute_operator_value)*
    {
        return buildList(first,remainders,3);
    }


did_rule
    =type:"nothing"
    {
        return {
             type:type
        }
    }/type:"not" S+ "action" S+ actionCode:actionCode S* condition:member_action_condition?
    {
        return {
            type:type,
            code:actionCode,
            conditions:condition
        }
    }
    /type:"not" S+ "check-in" s+ checkinCode:checkinCode S* condition:member_action_condition?
    {
        return {
            type:type,
            code:"check-in",
            conditions: condition ? condition.concat({
            	"operator": "=",
                 "name": "checkin_code",
                 "value": checkinCode}):
                 [{"operator": "=",
                 "name": "checkin_code",
                 "value": checkinCode}]
        }
    }
    /type:"something"
    {
        return {
            type:type
        }
    }/"action" S+ actionCode:actionCode S* condition:member_action_condition?
    {
    	return {
        	type:null,
            code:actionCode,
            conditions:condition
        }
    }
    /"check-in" S+ checkinCode:checkinCode S* condition:member_action_condition?
    {
    	return {
        	type:null,
            code:'check-in',
            conditions: condition ? condition.concat({
            	"operator": "=",
                 "name": "checkin_code",
                 "value": checkinCode}):
                 [{"operator": "=",
                 "name": "checkin_code",
                 "value": checkinCode}]
        }
    }

has_rule_gained_lost
    =type:"not" S+ subType:("gained"/"lost") S+ number:NUMBER? S* object:object_rule
    {
        return {
            type:type,
            sub_type:subType,
            number:number,
            object:object
        }
    }
    /subType:("gained"/"lost") S+ number:NUMBER? S* object:object_rule
    {
        return {
            type:null,
            sub_type:subType,
            number:number,
            object:object
        }
    }

object_rule
    ="tag" S+ tagCode:tagCode
    {
        return {
            type:"tag",
            tagCode:tagCode
        }
    }
    /"points" S+ levelCode:levelCode
    {
        return {
            type:"points",
            levelCode:levelCode
        }
    }
    /"prize" S+ prizeCode:prizeCode
    {
        return {
            type:"prize",
            prizeCode:prizeCode
        }
    }

has_rule_completed
    = type:"not" S+ subType:"completed" S+ challengeCode:challengeCode
    {
        return {
            type:type,
            sub_type:subType,
            code:challengeCode
        }
    }/ subType:"completed" S+ challengeCode:challengeCode
     {
         return {
             type:null,
             sub_type:subType,
             code:challengeCode
         }
     }


member_attribute_condition
= 'attribute' S+ condition:(gender_rules / age_rules /birthday_rules / language_rules /email_rules /phone_rules /integration_id_rules / address_rules)
{
    return  Object.assign({type:'attribute'},condition)
}
/type:"attribute" S+ attribute:('first name'/ 'last name'/ 'alias' / 'picture' / 'external id')
{
    return {
        type: type,
        attribute: attribute.replace(" ","_")
    }
}

gender_rules
= attribute:"gender" S+ "equal to" S+ value:GENDER
{
    return {
        attribute: attribute,
        operator: '=',
        value: value
    }
}
/attribute:"gender"
{
    return {
        attribute: attribute
    }
}


age_rules
=attribute:"age" S+ value:operator_number
{
    return Object.assign({attribute: attribute},value)
}
/attribute:"age"
{
    return {
        attribute: attribute
    }
}


birthday_rules
= attribute:'birthday' S+ "is" S+ value:"today"
{
    return {
        attribute: attribute,
        operator: '=',
        value: value
    }
}
/attribute:"birthday"
{
    return {
        attribute: attribute
    }
}

language_rules
= attribute: 'language' S+ 'equal to' S+ code:languageCode
{
    return {
        attribute: attribute,
        operator: '=',
        value: code
    }
}
/ attribute: 'language'
{
    return {
        attribute: attribute
    }
}

address_rules
= attribute: 'address' S+ name:('city'/'state'/'country') S+ 'equal to' S+ value:name
{
    return {
        attribute: attribute,
        name: name,
        operator: '=',
        value: value
    }
}
/ attribute: 'address' S+ name:('city'/'state'/'country'/'street'/'zip')
{
    return {
        attribute: attribute,
        name: name,
    }
}
/ attribute: 'address'
{
    return {
        attribute: attribute
    }
}


email_rules
=  attribute: 'email' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute,
        typeValue: value
     }
}
/attribute: 'email'
 {
     return {
         attribute: attribute
      }
 }

phone_rules
=  attribute: 'phone' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute,
        typeValue: value
     }
}
/attribute: 'phone'
 {
     return {
         attribute: attribute
      }
 }

integration_id_rules
=  attribute: 'integration id' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute.replace(' ', '_'),
        typeValue:value
     }
}
/attribute: 'integration id'
 {
     return {
         attribute: attribute.replace(' ', '_')
      }
 }



/*OCCURRENCE FILTER*/

occurrence_filter
    = "at least" S+ number:NUMBER S+ ("times" / "time")
    {
        return {
            type:'least',
            number:number
        }
    }
    /"less than" S+ number:NUMBER S+ ("times" / "time")
    {
        return {
          type:"less",
          number:number
        }
    }
    /type:"exactly" S+ number:NUMBER S+ ("times" / "time")
    {
        return {
          type:type,
          number:number
        }
    }

/*PERIOD_FILTER*/

period_filter
    = type:"before" S+ date:DATE_TIME
    {
        return {
            type:type,
            dates:[date]
        }
    }
    /type:"after" S+ date:DATE_TIME
    {
        return {
            type:type,
            dates:[date]
        }
    }
    /type:"between" S+ start:DATE_TIME S+ "and" S+ end:DATE_TIME_AFTER
    {
        return {
            type:type,
            dates:[start,end]
        }
    }
    /"in" S+ type:"last" S+ duration:NUMBER S+ durationScope:timeframe
    {
        return {
            type:type,
            duration: duration,
            durationScope: durationScope
        }
    }

/*MOMENT FILTER*/
momentFilter
= type:"before" S+ time:TIME
{
    return {
        type: type,
        times: [time]
    }
}
/ type:"after" S+ time:TIME
{
    return {
        type: type,
        times: [time]
    }
}
/ type:"between" S+ time1:TIME S+ "and" S+ time2:TIME
{
    return {
        type: type,
        times: [time1,time2]
    }
}
/"during the" S+ moment:DAY_MOMENTS
{
    return {
        type: "during",
        moment: moment
    }
}



/*SYSTEM CONDITION*/
onRule
    = "on" S+ rule:( onDate / onThe )
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
    = "the" S+ first:POSITION remainders:(S* "," S* position:POSITION)* S+ "day" S+ months:(ofMonth/ "of" S* "month") S* years:(inYear / dateRules)? S* time:timeRule?
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

operator_number
= operator:OPERATOR S* value: NUMBER
{
    return {
        operator: operator,
        value: value
    };
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

name "name"
= chars:path_char+
{
    return chars.join("");
}

code_char
    = [_a-z0-9-\.]i

code
    = chars:code_char+
    {
        return chars.join("");
    }

attributeName "attributeName"
    = code

actionCode "actionCode"
	= code

prizeCode "prizeCode"
    = code

challengeCode "challengeCode"
    = code

levelCode "levelCode"
    = code

languageCode "language code"
    = firstLetter:[a-z] secondLetter:[a-z]
    {
        return firstLetter + secondLetter
    }

segmentCode "segmentCode"
    = code

smartlistCode "smartlistCode"
    = code

checkinCode "checkinCode"
	= code

tagCode "tagCode"
    = tagClusterCode:tagClusterCode code:code
    {
        return {
            tagCode: code,
            tagClusterCode: tagClusterCode
        }
    }

tagClusterCode
    = code:code ":" { return code; }

geofenceCode "geofenceCode"
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
    = "before" S+ time:TIME
    {
        return {
            type:"before",
            list:[time]
        }
    }

afterTime
    = "after" S+ time:TIME
    {
        return {
            type:"after",
            list: [time]
        };
    }

betweenTimes
    = "between" S+ start:TIME S+ "and" S+ end:TIME
    {
        return {
            type:"between",
            list:[start,end]
        };
    }

ofMonth
    = "of" S+ first:MONTHS remainders:(S* "," S* months:MONTHS)*
    {
        return {
            type:"of",
            list:buildList(first,remainders,3)
        };
    }

inYear
    = "in" S+ first:YEARS remainders:(S* "," S* years:YEARS)*
    {
        return {
            type:"in",
            list:buildList(first,remainders,3)
        };
    }

dateRules
    = (fromDate / startingDate / untilDate)

fromDate
    = "from" S+ start:DATE S+ "to" S+ end:DATE
    {
        return {
            type:"from",
            list:[start,end]
        };
    }

startingDate
    = "starting at" S+ year:DATE
    {
        return {
            type:"starting",
            list:[year]
        };
    }

untilDate
    = "until" S+ year:DATE
    {
        return {
            type:"until",
            list:[year]
        };
    }


date_full_year
    = $(DIGIT DIGIT DIGIT DIGIT)

date_year_month_day_long
=year: date_full_year "-" month:('01' / '03' / '05'/ '07'/ '08'/ '10'/ '12') "-" day: ($([0-2] DIGIT) / $([3] [0-1]))
{
    return year + '-' + month + '-' + day
}

date_year_month_day_short
=year: date_full_year "-" month:('04' / '06' / '09'/ '11') "-" day: ($([0-2] DIGIT) / $([3] [0]))
{
    return year + '-' + month + '-' + day
}
/year: date_full_year "-" month:'02' "-" day:($([0-1] DIGIT) / $([2] [0-8]))
{
    return year + '-' + month + '-' + day
}

date_month
    = ($([0] DIGIT) / $([1] [0-2]))

date_day
    = ($([0-2] DIGIT) / $([3] [0-1]))

time_hour_12
    = $([0] DIGIT) / $([1] [0-2]) / $(DIGIT)

time_hour_24
    =$([0-1] DIGIT) / $([2][0-3]) / $(DIGIT)

time_minute
    = $([0-5] DIGIT)

time_second
    = $([0-5] DIGIT)

TIME
= time:TIME_CHOICE
{
    return  time;
}
/ time:TIME_24
{
    return  (time.hour.length ===  1? "0"+time.hour :time.hour)  + ":" + time.minute;
}

TIME_24 "24h time (hh:mm)"
= hour:time_hour_24 ":" minute:time_minute
{
    return {
        hour: hour,
        minute: minute
    }
}

TIME_CHOICE
    = time:TIME_12 S* choice:("am"/"pm")
     {
        if(time.hour == '12'){
            if(choice=="pm"){
                return "12:"+time.minute;
            }else{
                return "00:"+time.minute;
            }
        }
        if(choice=="pm"){
            time.hour=parseInt(time.hour)+12;
        }

        return time.hour+":"+time.minute;
    }

TIME_12 "12h time (hh:mm am/pm)"
    = hour:time_hour_12 ":" minute:time_minute
    {

        return {hour: hour.length === 1? "0"+hour:hour,minute:minute};
    }

DATE "date (YYYY-MM-DD)"
= (date_year_month_day_long / date_year_month_day_short)


DATE_AFTER "date (YYYY-MM-DD)"
= date:date_year_month_day_long
{
    var splittedDate = date.split('-');
    var y=parseInt(splittedDate[0]);
    var m=parseInt(splittedDate[1]);
    var d=parseInt(splittedDate[2]);

    if(d >= 31){
        d="01";
        m++;
    }else{
        d++;
    }

    //This is to account for the december 31 case
    if(m > 12){
        m="01"
        y++;
    }

    return y + "-" + (m.toString().length === 1? "0"+m:m) + "-" + (d.toString().length === 1? "0"+d:d);

}
/ date:date_year_month_day_short
{
    var splittedDate = date.split('-');
    var y=parseInt(splittedDate[0]);
    var m=parseInt(splittedDate[1]);
    var d=parseInt(splittedDate[2]);

    //February case
    if(m === 2){

        if(d >= 28){
            d="01";
            m++;
        }else{
            d++;
        }

    }else{

        if(d >= 30){
            d="01";
            m++;
        }else{
            d++;
        }


    }

    return y + "-" + (m.toString().length === 1? "0"+m:m) + "-" + (d.toString().length === 1? "0"+d:d);
}

DATE_TIME
= dateTime:DATE_TIME_STRING
{
	return dateTime;
}
/date:DATE S+ time:TIME_CHOICE
{
    return date + "T" + time + ":00";
}
/ date:DATE S+ time:TIME_24
{
    return date + "T" + (time.hour.length ===  1? "0"+time.hour :time.hour)  + ":" + time.minute + ":00";
}
/date:DATE
{
	return date + "T" + "00:00:00";
}


DATE_TIME_STRING "datetime (YYYY-MM-DDThh:mm:ss)"
    = date:(date_year_month_day_long / date_year_month_day_short) "T" hour:time_hour_24 ":" minute:time_minute ":" second:time_second
    {
        return date + "T" + hour + ":" + minute + ":" + second;
    }

DATE_TIME_AFTER
= dateTime:DATE_TIME_STRING
{
	return dateTime;
}
 /date:DATE S+ time:TIME_CHOICE
{
    return date + "T" + time + ":00";
}
/ date:DATE S+ time:TIME_24
{
    return date + "T" + (time.hour.length ===  1? "0"+time.hour :time.hour)  + ":" + time.minute + ":00";
}
/date:DATE_AFTER
{
    return date + "T" + "00:00:00";
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

OPERATOR
    = op:(">=" / "<=" / "=" / ">" / "<")
    {
        return op;
    }

DAY_MOMENTS
    = moment:("night" / "morning" / "afternoon" / "evening")

GENDER
= gender:('male' / 'female' / 'other')
