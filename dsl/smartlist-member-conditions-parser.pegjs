/*
  List Member Conditions Rules
  ============================

    time_period (minute, hour, day, week, month, year)

    DATE_CRITERIA : last X time, between start_date end_date
    NUMBER_CRITERIA : >, <, =, <=, >=, *IN()
    STRING_CRITERIA : =, !=, *IN()

    // Member related
    member tag CODE NUMBER_CRITERIA
    member level CODE NUMBER_CRITERIA
    member point CODE NUMBER_CRITERIA
    // member segment CODE NUMBER_CRITERIA  --> Not supported right now

    member city STRING_CRITERIA
    member state STRING_CRITERIA
    member country STRING_CRITERIA
    member postal_code STRING_CRITERIA

    member created DATE_CRITERIA

    member in zone ZONE_CODE[,ZONE_CODE][for x time_period] // durationOption:(S* "for" S* NUMBER S* timeframe)?

    // Challenge related
    * challenge CODE

    // Action related
    action CODE
    * action CODE with data attributes GENERIC_CRITERIA
    * action CODE with data attributes GENERIC_CRITERIA with coordinates COORDINATE_CRITERIA
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
    = first:simple_condition reminders:(S* "and" S* simple_condition)* S*
    {
      return  {
          conditions: buildList(first, reminders, 3)
      };
    }

member_scope_rule
    = scope:"member" S* "created" S* period_filter:period_filter
        {
            return {
                scope: "member",
                type: "created",
                period_filter: period_filter
            };
        }
        / scope:"member" S* sub:("city" / "state" / "zip" / "country") S* operator:("=" / "!=") S* value:string
        {
            return {
                scope: scope,
                type: sub,
                operator: operator,
                value: value,
            };
        }
        / scope:"member" S* "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
        {
            return {
                scope: scope,
                type: "zone",
                codes: buildList(first, reminders, 3)
            };
        }
        / scope: "member" S* "belongs to smartlist" S* firstCode:smartlistCode S* codes:("," S* code:smartlistCode)*
        {
            return {
            	scope: scope,
               type: "smartlist",
               codes: buildList(firstCode, codes, 2)
           };
        }/member_condition

simple_condition
    = member_scope_rule

conditionList
	=firstCondition:("with" S* attribute_operator_value) conditions:(S* "," S* attribute_operator_value)*
    {
    	return buildList(firstCondition ? firstCondition[2] : null, conditions, 3)
    }


member_action_condition
    = "with" S* first:attribute_operator_value remainders:(S* "," S* attribute_operator_value)*
    {
        return buildList(first,remainders,3);
    }




/*MEMBER CONDITION*/

member_condition
    = scope:"member" S* sub:"did" S* conditions:did_rule S* occurence:occurence_filter? S* period:period_filter?
    {
        return {
            scope:scope,
            type:sub,
            condition:conditions,
            occurence_filter:occurence,
            period_filter:period
        };
    }
    /scope:"member" S* sub:"has" S* conditions:has_rule_completed S* occurence:occurence_filter? S* period:period_filter?
      {
          return {
              scope:scope,
              type:sub,
              condition:conditions,
              occurence_filter:occurence,
              period_filter:period
          };
      }
    /scope:"member" S* sub:"has" S* conditions:has_rule_gained_lost S* period:period_filter?
        {
            return {
                scope:scope,
                sub_scope:sub,
                condition:conditions,
                occurence_filter:null,
                period_filter:period
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

object_rule
    ="tag" S* tagCode:tagCode
    {
        return {
            type:"tag",
            tagCode:tagCode
        }
    }
    /"points" S* levelCode:levelCode
    {
        return {
            type:"points",
            levelCode:levelCode
        }
    }
    /"prize" S* prizeCode:prizeCode
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

/*OTHER*/

inZoneAction
    = "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
    {
        return {
            type: 'zone',
            zones: buildList(first, reminders, 3)
        };
    }

attribute_operator_value
    = attributeName:attributeName S* operator:OPERATOR S* value:(string / NUMBER)
    {
         return {
             operator: operator,
             name: attributeName,
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

string
    = string1 / string2

stringOrNumber
  = string / NUMBER

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

challengeCode "challengeCode"
    = code

actionCode "actionCode"
    = code

prizeCode "prizeCode"
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

STRING "string"
    = string:string
    {
        return string;
    }

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
