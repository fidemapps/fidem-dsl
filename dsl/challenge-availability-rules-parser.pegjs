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
    / scope:"tag" S* tagClusterCode:tagClusterCode? tagCode:tagCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: tagCode,
            tagClusterCode: tagClusterCode ? tagClusterCode : null,
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
    = code

tagClusterCode "tagClusterCode"
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
