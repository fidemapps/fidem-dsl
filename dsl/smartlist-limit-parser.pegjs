/*
  List Limit Rules
  ============================

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
    = filter:filter
    {
      return  {
          filter: filter
      };
    }

filter
    = "only top" S* quantity:NUMBER S* "by member" S* rule:(("points") S* levelCode / "tag" S* tagCode)
    {
        return {
            quantity: quantity,
            type: rule[0],
            tagClusterCode: rule[rule.length - 1].tagClusterCode ? rule[rule.length - 1].tagClusterCode : null,
            code: rule[rule.length - 1].tagCode ? rule[rule.length - 1].tagCode : rule[rule.length - 1]
        };
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
