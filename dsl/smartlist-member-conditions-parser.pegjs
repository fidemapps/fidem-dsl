/*
  List Member Conditions Rules
  ============================

    DATE_CRITERIA : last X time, between start_date end_date
    NUMBER_CRITERIA : >, <, =, <=, >=, *IN()
    STRING_CRITERIA : =, !=, *IN()
    COORDINATE_CRITERIA: = *lat,long, *around circle, *within square

    // Member related
    member tag CODE NUMBER_CRITERIA
    member level CODE NUMBER_CRITERIA
    member point CODE NUMBER_CRITERIA
    member segment CODE NUMBER_CRITERIA

    member city STRING_CRITERIA
    member state STRING_CRITERIA
    member country STRING_CRITERIA
    member postal_code STRING_CRITERIA

    member created DATE_CRITERIA

    member in zone ZONE_CODE,ZONE_CODE

    // Challenge related
    * challenge CODE

    // Action related
    action CODE
    * action CODE with data attributes GENERIC_CRITERIA
    * action CODE with data attributes GENERIC_CRITERIA with coordinates COORDINATE_CRITERIA

    // FILTER
    only top X by member points LEVEL_CODE
    * only top X by member level LEVEL_CODE
    * only top X by member tag TAG
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
    = conditions / filter:filter
    {
      return  {
          conditions: [],
          filter: filter
      };
    }

conditions
    = first:simple_condition reminders:(S* "and" S* simple_condition)* S* filter:filter?
    {
      return  {
          conditions: buildList(first, reminders, 3),
          filter: filter
      };
    }

simple_condition
    = scope:"member" S* sub:"segment" S* segmentCode:segmentCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: "member",
            sub_scope: sub,
            code: segmentCode,
            operator: operator,
            value: value
        };
    }
    / scope:"member" S* sub:("level" / "points") S* levelCode:levelCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: "member",
            sub_scope: sub,
            code: levelCode,
            operator: operator,
            value: value
        };
    }
    / scope:"member" S* sub:"tag" S* tagCode:tagCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: "member",
            sub_scope: sub,
            code: tagCode,
            operator: operator,
            value: value
        };
    }
    / scope:"member" S* "created" S* condition:"last" S* qty:NUMBER S* timeframe:timeframe
    {
        return {
            scope: "member",
            sub_scope: "created",
            condition: condition,
            quantity: qty,
            timeframe: timeframe
        };
    }
    / scope:"member" S* "created" S* condition:"between" S* date1:DATE_TIME S* date2:DATE_TIME
    {
        return {
            scope: "member",
            sub_scope: "created",
            condition: condition,
            date1: date1,
            date2: date2
        };
    }
    / scope:"member" S* sub:("city" / "state" / "zip" / "country") S* operator:("=" / "!=") S* value:string
    {
        return {
            scope: "member",
            sub_scope: sub,
            operator: operator,
            value: value
        };
    }
    / scope:"member" S* "in zone" S* zoneCode:zoneCode S*
    {
        return {
            scope: "member",
            sub_scope: "zone",
            code: zoneCode
        };
    }
    / scope:"challenge" S* challengeCode:challengeCode S* firstCondition:("with" S* condition)? conditions:(S* "and" S* condition)*
    {
        return {
            scope: "challenge",
            code: challengeCode,
            conditions: buildList(firstCondition ? firstCondition[2] : null, conditions, 3)
        };
    }
    / scope:"action" S* actionCode:actionCode S* firstCondition:("with" S* condition)? conditions:(S* "and" S* condition)*
    {
        return {
            scope: "action",
            code: actionCode,
            conditions: buildList(firstCondition ? firstCondition[2] : null, conditions, 3)
        };
    }

filter
    = "only top" S* quantity:NUMBER S* "by member" S* type:("points" / "level") S* levelCode:levelCode
    {
        return {
            quantity: quantity,
            type: type,
            levelCode: levelCode
        };
    }

condition
    = attributeName:attributeName S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:stringOrNumber
    {
      return {
          name: attributeName,
          operator: operator,
          value: value
      }
    }

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

segmentCode "segmentCode"
    = code

challengeCode "challengeCode"
    = code

actionCode "actionCode"
    = code

levelCode "levelCode"
    = code

tagCode "tagCode"
    = code

zoneCode "zoneCode"
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

date_month "month"
    = $(DIGIT DIGIT)

date_day "day"
    = $(DIGIT DIGIT)

time_hour "hour"
    = $(DIGIT DIGIT)

time_minute "minute"
    = $(DIGIT DIGIT)

time_second "second"
    = $(DIGIT DIGIT)

TIME "time"
    = hour:time_hour ":" minute:time_minute second:(":" time_second)?
    {
        return {
            hour: hour,
            minute: minute,
            second: second | "00"
        }
    }

DATE_TIME "datetime"
    = year:date_full_year "-" month:date_month "-" day:date_day S* time:TIME?
    {
        if(time){
            //return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(time.hour), parseInt(time.minute), parseInt(time.second), 0);
            return year + "-" + month + "-" + day + "T" + time.hour + ":" + time.minute + ":" + time.second;
        }
        else{
            //return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            return year + "-" + month + "-" + day;
        }
    }
