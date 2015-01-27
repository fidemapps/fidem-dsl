/*
  Availability Rules
  ==================

    level LEVELCODE >= 1
    tag TAGCODE >= 10
    segment SEGMENTCODE >= 1
    challenge CHALLENGECODE
    in zone ZONECODE1[,ZONECODE2][for x TIMEFRAME]

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
            code: tagCode,
            operator: operator,
            value: value
        };
    }
    / scope:"segment" S* segmentCode:segmentCode S* operator:(">=" / "<=" / "=" / ">" / "<") S* value:NUMBER
    {
        return {
            scope: scope,
            code: segmentCode,
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

tagCode "tagCode"
    = code

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
