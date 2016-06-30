
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
    = first:simple_condition reminders:(S* "and" S* simple_condition)* S*
    {
      return  {
          conditions: buildList(first, reminders, 3)
      };
    }

simple_condition
    = member_scope_rule

/*MEMBER SCOPE*/

member_scope_rule
    = scope:"member" S* type:"created" S* period_filter:period_filter
        {
            return {
                scope: scope,
                type: type,
                condition: null,
                period_filter: period_filter,
                occurence_filter:null,
                geo_filter:null
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
                occurence_filter:null,
                period_filter:null,
                geo_filter:null

            };
        }/member_condition


/*MEMBER CONDITION*/

member_condition
    = scope:"member" S* type:"did" S* conditions:did_rule S* occurence:occurence_filter? S* geo:geo_filter? S* period:period_filter?
    {
        return {
            scope:scope,
            type:type,
            condition:conditions,
            occurence_filter:occurence,
            period_filter:period,
            geo_filter:geo
        };
    }
    /scope:"member" S* type:"has" S* conditions:has_rule_completed S* occurence:occurence_filter?  S* geo:geo_filter? S* period:period_filter?
      {
          return {
              scope:scope,
              type:type,
              condition:conditions,
              occurence_filter:occurence,
              period_filter:period,
              geo_filter:geo
          };
      }
    /scope:"member" S* type:"has" S* conditions:has_rule_gained_lost S* period:period_filter?
        {
            return {
                scope:scope,
                type:type,
                condition:conditions,
                occurence_filter:null,
                period_filter:period,
                geo_filter:null
            };
        }
    /scope:"member" S* type:"has" S* conditions:has_rule_been S* geo:geo_filter S* period:period_filter?
        {
            return {
                scope:scope,
                type:type,
                condition:conditions,
                occurence_filter:null,
                period_filter:period,
                geo_filter:geo
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
               geo_filter:geo
           };
       }
   /scope:"member" S* type:"with" S* condition:with_condition
      {
          return {
              scope:scope,
              type:type,
              condition:condition,
              occurence_filter:null,
              period_filter:null,
              geo_filter:null
          };
      }
     /scope:"member" S* type:"without" S* condition:with_condition
        {
            return {
                scope:scope,
                type:type,
                condition:condition,
                occurence_filter:null,
                period_filter:null,
                geo_filter:null
            };
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

has_rule_completed
    = type:"not" S* subType:"completed" S* challengeCode:challengeCode
    {
        return {
            type:type,
            sub_type:subType,
            code:challengeCode,
            condition:null
        }
    }/ subType:"completed" S* challengeCode:challengeCode
     {
         return {
             type:null,
             sub_type:subType,
             code:challengeCode,
             condition:null
         }
     }


member_action_condition
    = "with" S* first:attribute_operator_value remainders:(S* "&" S* attribute_operator_value)*
    {
        return buildList(first,remainders,3);
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
            type:type
        }
    }
    / type: S* "been"
    {
        return {
            type:null
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
/*OTHER*/

attribute_operator_value
    = attributeName:attributeName S* operator:OPERATOR S* value:(STRING / NUMBER)
    {
         return {
             operator: operator,
             name: attributeName,
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

timeframe
    = value:("minutes" / "minute" / "hours" / "hour" / "days" / "day" / "weeks" / "week" / "months" / "month" / "years" / "year" )
    {
        return value.replace(/s/g,'');
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


STRING "string"
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

challengeCode "challengeCode"
    = code

actionCode "actionCode"
    = code

prizeCode "prizeCode"
    = code

beaconCode "beaconCode"
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

smartlistCode "smartlistCode"
    = code

attributeName "attributeName"
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

date_full_year "year"
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


TIME_24 "time"
    = hour:time_hour_24 ":" minute:time_minute second:(":" time_second)?
    {
        return {
            hour: hour,
            minute: minute,
            second: second ? second[1] : "00"
        }
    }

DATE "date"
    = year:date_full_year "-" month:date_month "-" day:date_day
    {
         return year + "-" + month + "-" + day;
    }


DATE_TIME "datetime"
    = year:date_full_year "-" month:date_month "-" day:date_day "T" time:TIME_24
    {
          return year + "-" + month + "-" + day + "T" + time.hour + ":" + time.minute + ":" + time.second;
    }

OPERATOR
    = op:(">=" / "<=" / "=" / ">" / "<")
    {
        return op;
    }
