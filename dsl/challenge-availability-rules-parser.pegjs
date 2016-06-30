
/*HELPER FUNCTIONS*/
{

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
    = first:simple_rule reminders:(S* "and" S* simple_rule)* S*
    {
      return  buildList(first, reminders, 3);
    }


simple_rule
    =scope:"member" S* type:"created" S* period_filter:period_filter
     {
         return {
             scope: scope,
             type: type,
             condition:null,
             period_filter: period_filter,
             occurence_filter:null,
             geo_filter:null,
             moment_filter:null
         };
     }
     / scope:"member" S* type:("city" / "state" / "zip" / "country") S* operator:("=" / "!=") S* value:STRING
     {
         return {
             scope: scope,
             type: type,
             condition:{
                 operator: operator,
                 value: value
             },
             period_filter: null,
             occurence_filter:null,
             geo_filter:null,
             moment_filter:null

         };
     }
    /scope:'member' S* "belongs to smartlist" S* firstCode:smartlistCode S* codes:("," S* code:smartlistCode)* S* condition:smartlist_condition?
    {
        return {
           scope:scope,
           type: "smartlist",
           condition:{
                type:null,
                codes: buildList(firstCode, codes, 2),
                condition:condition
           },
           period_filter: null,
           occurence_filter:null,
           geo_filter:null,
           moment_filter:null
       };
    }
    /scope:'member' S* "do not belongs to smartlist" S* firstCode:smartlistCode S* codes:("," S* code:smartlistCode)* S* condition:smartlist_condition?
    {
        return {
           scope:scope,
           type: "smartlist",
           condition:{
                type:"not",
                codes: buildList(firstCode, codes, 2),
                condition:condition
           },
           period_filter: null,
           occurence_filter:null,
           geo_filter:null,
           moment_filter:null
       };
    }
    /system_condition
    /member_condition

/*SMARTLIST CONDITION*/

smartlist_condition
    =type:"since" S* number:NUMBER S* timeframe:timeframe
    {
        return{
            type:type,
            number:number,
            timeframe:timeframe
        }
    }

/*MEMBER CONDITION*/

member_condition
    = scope:"member" S* type:"did" S* conditions:did_rule S* filter1:occurence_filter? S* filter3:geo_filter? S* filter2:period_filter? S* filter4:moment_filter?
    {
        return {
            scope:scope,
            type:type,
            condition:conditions,
            occurence_filter:filter1,
            period_filter:filter2,
            geo_filter:filter3,
            moment_filter:filter4
        };
    }
    /scope:"member" S* type:"has" S* conditions:has_rule_completed S* filter1:occurence_filter? S* filter3:geo_filter? S* filter2:period_filter? S* filter4:moment_filter?
      {
          return {
              scope:scope,
              type:type,
              condition:conditions,
              occurence_filter:filter1,
              period_filter:filter2,
              geo_filter:filter3,
              moment_filter:filter4
          };
      }
    /scope:"member" S* type:"has" S* conditions:has_rule_gained_lost S* filter2:period_filter?
        {
           return {
               scope:scope,
               type:type,
               condition:conditions,
               occurence_filter:null,
               period_filter:filter2,
               geo_filter:null,
               moment_filter:null
           };
        }
        /scope:"member" S* type:"has" S* conditions:has_rule_been S* geo:geo_filter
            {
                return {
                    scope:scope,
                    type:type,
                    condition:conditions,
                    occurence_filter:null,
                    period_filter:null,
                    geo_filter:geo,
                    moment_filter:null
                };
            }
       /scope:"member" S* type:"is" S* geo:geo_filter
           {
               return {
                   scope:scope,
                   type:type,
                   condition:null,
                   occurence_filter:null,
                   period_filter:null,
                   geo_filter:geo,
                   moment_filter:null
               };
           }
       /scope:"member" S* "with" S* condition:with_condition
          {
              condition.sub_type=condition.type;
              condition.type=null;
              return {
                  scope:scope,
                  type:"with",
                  condition:condition,
                  occurence_filter:null,
                  period_filter:null,
                  geo_filter:null,
                  moment_filter:null
              };
          }
         /scope:"member" S* "without" S* condition:with_condition
            {
                condition.sub_type=condition.type;
                condition.type="not";
                return {
                    scope:scope,
                    type:"with",
                    condition:condition,
                    occurence_filter:null,
                    period_filter:null,
                    geo_filter:null,
                    moment_filter:null
                };
            }



member_action_condition
    = "with" S* first:attribute_operator_value remainders:(S* "&" S* attribute_operator_value)*
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

has_rule_gained_lost
    =type:"not" S* subType:("gained"/"lost") S* number:NUMBER? S* object:object_rule
    {
        return {
            type:type,
            sub_type:subType,
            number:number,
            object:object
        }
    }
    /subType:("gained"/"lost") S* number:NUMBER? S* object:object_rule
    {
        return {
            type:null,
            sub_type:subType,
            number:number,
            object:object
        }
    }

has_rule_been
    = type:"not" S* "been"
    {
        return {
            type:type,
            sub_type:"been"
        }
    }
    / type: S* "been"
    {
        return {
            type:null,
            sub_type:"been"
        }
    }

with_condition
    = condition:object_rule_tag S* value:operator_number?
    {
        return Object.assign(condition,value);

    }
    /condition:object_rule_points S* value:operator_number
    {
        return Object.assign(condition,value);

    }
    /condition:object_rule_prize
    {
        return condition;
    }


object_rule
    = (object_rule_tag / object_rule_points / object_rule_prize)

object_rule_tag
    ="tag" S* tagCode:tagCode
    {
        return {
            type:"tag",
            tagCode:tagCode
        }
    }

object_rule_points
    ="points" S* levelCode:levelCode
    {
        return {
            type:"points",
            levelCode:levelCode
        }
    }

object_rule_prize
    ="prize" S* prizeCode:prizeCode
    {
        return {
            type:"prize",
            prizeCode:prizeCode
        }
    }

 has_rule_completed
     = type:"not" S* subType:"completed" S* challengeCode:challengeCode S* conditionList:member_action_condition?
     {
         return {
             type:type,
             sub_type:subType,
             code:challengeCode,
             condition:conditionList
         }
     }/ subType:"completed" S* challengeCode:challengeCode S* conditionList:member_action_condition?
      {
          return {
              type:null,
              sub_type:subType,
              code:challengeCode,
              condition:conditionList
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
    = type:"before" S* date:DATE_TIME
    {
        return {
            type:type,
            date:[date]
        }
    }
    /type:"after" S* date:DATE_TIME
    {
        return {
            type:type,
            date:[date]
        }
    }
    /type:"between" S* start:DATE_TIME S* "and" S* end:DATE_TIME
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
    /"since" S* type:"did" S* position:("first"/"last")? S* actionCode:actionCode
    {
        return {
            type:"since-"+type,
            position:position,
            actionCode:actionCode
        }
    }
    /"since" S* type:"received" S* target:"prize" S* prizeCode:prizeCode
    {
        return {
            type:"since-"+type,
            target:target,
            prizeCode:prizeCode
        }
    }

/*GEO FILTER*/
geo_filter
    = "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
    {
        return {
            type: 'zone',
            zones: buildList(first, reminders, 3)
        };
    }
    / "in range of" S* beacons:beacon_list
    {
        return {
            type: 'inRange',
            beacons:beacons
        }
    }
    / "with RSSI" S* type:("over"/"below") S* number:NUMBER S* "from" S* beacons:beacon_list
    {
        return{
            type:"RSSI-"+type,
            number:number,
            beacons:beacons
        }
    }
    / "with RSSI" S* type:"between" S* start:NUMBER S* "and" S* end:NUMBER S* "from" S* beacons:beacon_list
    {
        return{
            type:"RSSI-"+type,
            start:start,
            end:end,
            beacons:beacons
        }
    }

beacon_list
    = "beacon" S* first:beaconCode reminders:(S* "," S* beaconCode:beaconCode)*
    {
        return buildList(first,reminders,3);
    }

/*MOMENT FILTER*/
moment_filter
    ="on" S* first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                type : 'on',
                days:{type:"days",list:buildList(first,remainders,3)},
                months:months,
                years:years,
                time:time
            }
        }
    /"on" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                type : 'on',
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
            type: 'onDate',
            date:buildList(first,remainders,3),
            time:time
        }
    }

onThe
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

/*SYSTEM CONDITION*/
system_condition
    ="every" S* first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                scope : "system",
                type:'every',
                days:{type:"days",list:buildList(first,remainders,3)},
                months:months,
                years:years,
                time:time
            }
        }
    /"every" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
        {
            return {
                scope : "system",
                type:'every',
                days:{type:"day",list:["day"]},
                months:months,
                years:years,
                time:time
            }
        }
    /system_onRule

system_onRule
    = "on" S* rule:(onDate /onThe )
    {
        return Object.assign({scope:"system"},rule);
    }

/*MIX*/
attribute_operator_value
    = attributeName:attributeName S* operator:OPERATOR S* value:(STRING / NUMBER)
    {
         return {
             operator: operator,
             attribute: attributeName,
             value: value
         };
    }

operator_number
    = operator:OPERATOR S* value: NUMBER
    {
         return {
             operator: operator,
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

STRING "string"
    = string:(string1 / string2)
    {
        return string;
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

beaconCode "beaconCode"
    = code

actionCode "actionCode"
	= code

prizeCode "prizeCode"
    = code

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

time_hour_12
    = $([0] DIGIT) / $([1] [0-2]) / $(DIGIT)

time_hour_24
    =$([0-1] DIGIT) / $([2][0-3])

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
