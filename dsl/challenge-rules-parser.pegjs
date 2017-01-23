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

  action ACTION_CODE [x times][within x timeframe]  [with TAG 'TAG_NAME' [= x]][in geofence GEOFENCE_CODE[,GEOFENCE_CODE]][near X of beacon BEACON_CODE[,BEACON_CODE]] system_condition

  member level LEVEL_LIST [operator] x [with TAG 'TAG_NAME' [= x]]
  member points LEVEL_LIST [operator] x [with TAG 'TAG_NAME' [= x]]
  member tag TAG_NAME  [operator] x [with TAG 'TAG_NAME' [= x]]
  member in geofence GEOFENCE_CODE[,GEOFENCE_CODE] [for x timeframe]

  member did nothing [occurrence_filter,period_filter,moment_filter]
  member did something [occurrence_filter,period_filter,moment_filter]
  member did not ACTION_CODE [occurrence_filter,period_filter,moment_filter]
  member did not ACTION_CODE with [attribute_name OPERATOR value][occurrence_filter,period_filter,moment_filter]
  member has completed CHALLENGE_CODE [occurrence_filter,period_filter,moment_filter]
  member has not completed CHALLENGE_CODE [occurrence_filter,period_filter,moment_filter]

  occurrence_filter
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

  moment_filter
    before TIME
    after TIME
    between TIME and TIME
    during the [night/morning/afternoon/evening]

  // NOT IMPLEMENTED YET
  member new level LEVEL_CODE [x times][within x timeframe]  [with TAG TAG_NAME [= x]]
  geofence enter CODE
  geofence exit CODE
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
    = scope:"action" S+ actionCode:actionCode conditions:(S* condition)* filters:(S* filter)* S* system:system_condition?
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
    / scope:"challenge" S+ challengeCode:challengeCode conditions:(S* condition)* filters:(S* filter)*
    {
        return {
            scope: scope,
            code: challengeCode,
            conditions: buildList(null, conditions, 1),
            filters: buildList(null, filters, 1)
        };
    }
    / scope:"member" S+ type:("level" / "point") S+ levelCode:levelCode S* operator:OPERATOR? S* value:NUMBER S* filter:withTag?
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
    / scope:"member" S+ type:"tag" S+ tagCode:tagCode S* operator:OPERATOR? S* value:NUMBER S* filter:withTag?
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
    / scope:"member" S+ "in geofence" S+ first:geofenceCode reminders:(S* "," S* geofenceCode:geofenceCode)* durationOption:(S* "for" S+ NUMBER S+ timeframe)?
    {
        var theRule = {
            scope: scope,
            type: "geofence",
            codes: buildList(first, reminders, 3),
            duration: (durationOption) ? durationOption[3] : null,
            timeframe: (durationOption) ? durationOption[5] : null
        };

        return theRule;
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
    / member_condition
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

member_attribute_condition
= 'attribute' S+ condition:(gender_rules / age_rules  / language_rules /email_rules /phone_rules /integration_id_rules / address_rules)
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



simple_reward
    = "give" S+ qty:NUMBER S+ rewardCode:rewardCode
    {
        var theReward= {
            quantity: qty,
            code: rewardCode
        };

        return theReward
    }

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
    }
    /type:"not" S+ 'action' S+ actionCode:actionCode S* condition:member_action_condition?
    {
        return {
            type:type,
            code:actionCode,
            conditions:condition
        }
    }
	/type:"not" S+ 'check-in' S+ checkinCode:checkinCode S* condition:member_action_condition?
    {
        return {
            type:type,
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
    /type:"something"
    {
        return {
            type:type
        }
    }
    /"action" S+ actionCode:actionCode S* condition:member_action_condition?
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


/*OCCURENCE FILTER*/

occurrence_filter
    = "at least" S+ number:NUMBER S+ ("times" / "time")
    {
        return {
            type:'least',
            number:number
        }
    }
    /type:"less than" S+ number:NUMBER S+ ("times" / "time")
    {
        return {
          type:'less',
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
    /type:"after" S+ date:DATE_TIME_AFTER
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

system_condition
    = (every / on_rule)

condition
    = (withinTimeframe / numberOfTimes)

filter
    = (withTag / withData / inGeoFenceAction / nearBeaconAction)

on_rule
    = "on" S+ rule:( on_date / on_the )
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
    = "the" S+ first:POSITION remainders:(S* "," S* position:POSITION)* S+ "day" S+ months:(ofMonth/ "of" S+ "month") S* years:(inYear / dateRules)? S* time:timeRule?
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
    ="every" S+ first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
    {
        return {
            type : 'every',
            days:{type:"days",list:buildList(first,remainders,3)},
            months:months,
            years:years,
            time:time
        };
    }
    / "every" S+ "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
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
    = "before" S+ time:TIME_CHOICE
    {
        return {
            type:"before",
            list:[time]
        }
    }

afterTime
    = "after" S+ time:TIME_CHOICE
    {
        return {
            type:"after",
            list: [time]
        };
    }

betweenTimes
    = "between" S+ start:TIME_CHOICE S+ "and" S+ end:TIME_CHOICE
    {
        return {
            type:"between",
            list:[start,end]
        };
    }

/*SYSTEM CONDITION MONTH RELATED*/

ofMonth
    = "of" S+ first:MONTHS remainders:(S* "," S* months:MONTHS)*
    {
        return {
            type:"of",
            list:buildList(first,remainders,3)
        };
    }

/*SYSTEM CONDITION YEAR RELATED*/

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

/*MIX*/

inGeoFenceAction
    = "in geofence" S+ first:geofenceCode reminders:(S* "," S* geofenceCode:geofenceCode)*
    {
        return {
            type: 'geofence',
            geofences: buildList(first, reminders, 3)
        };
    }

nearBeaconAction
    = "near" S+ distance:NUMBER S+ "of beacon" S+ first:beaconCode reminders:(S* "," S* beaconCode:beaconCode)*
    {
        return {
            type: 'beacon',
            distance: distance,
            beacons: buildList(first, reminders, 3)
        };
    }

withTag
    = "with tag" S+ tagCode:tagCode
    {
        return {
            type: 'tag',
            tagClusterCode: tagCode.tagClusterCode,
            tag: tagCode.tagCode
        };
    }

withData
    = "with data" S+ attributeName:attributeName S* operator:OPERATOR S* value:(string / NUMBER)
    {
        return {
            type: 'data',
            operator: operator,
            attribute: attributeName,
            value: value
        };
    }

numberOfTimes
    = value:NUMBER S+ "times"
    {
        return {
          type: 'times',
          value: value
        }
    }

withinTimeframe
    = value:NUMBER S+ "times" S+ "within" S+ duration:NUMBER S+ durationScope:timeframe
    {
        return {
          type: 'times_within_timeframe',
          value: value,
          duration: duration,
          durationScope: durationScope
        }
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

code
    = chars:path_char+
    {
        return chars.join("");
    }

attributeName "attributeName"
    = code

prizeCode "prizeCode"
    = code

rewardCode "rewardCode"
    = code

actionCode "actionCode"
    = code

challengeCode "challengeCode"
    = code

languageCode "languageCode"
    = code

levelCode "levelCode"
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
    =$([0-1] DIGIT) / $([2][0-3]) / $(DIGIT)

time_minute
    = $([0-5] DIGIT)

time_second
    = $([0-5] DIGIT)

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

DATE "date (YYYY-MM-DD)"
= year:date_full_year "-" month:date_month "-" day:date_day
{
    return year + "-" + month + "-" + day;
}

DATE_AFTER "date (YYYY-MM-DD)"
= year:date_full_year "-" month:date_month "-" day:date_day
{
    var d=parseInt(day);
    var m=parseInt(month);
    var y=parseInt(year);

    if(d >= 31){
        d="01";
        m++;
    }else{
        d++;
    }
    if(m >= 12){
        m="01"
        y++;
    }

    return y + "-" + (m.toString().length === 1? "0"+m:m) + "-" + (d.toString().length === 1? "0"+d:d);
}


DATE_TIME_STRING "datetime (YYYY-MM-DDThh:mm:ss)"
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

        return {hour:hour,minute:minute};
    }

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

DAY_MOMENTS
    = moment:("night" / "morning" / "afternoon" / "evening")

GENDER
    = gender:('male' / 'female' / 'other')