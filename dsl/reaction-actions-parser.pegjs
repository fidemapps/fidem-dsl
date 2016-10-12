/*
  Reaction Actions Rules
  ======================

  give reward QUANTITY REWARD_CODE from PROGRAM_CODE to LIST_CODE

  send message text 'TEXT' with subject 'SUBJECT' to list LIST_CODE
  send message template TEMPLATE_CODE to list LIST_CODE

  send message text 'TEXT' with subject 'SUBJECT' to emails EMAIL[,EMAIL]
  send message template TEMPLATE_CODE to emails EMAIL[,EMAIL]
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
    = simple_action;

simple_action
    = "give reward" S+ quantity:NUMBER S+ rewardCode:rewardCode S+ "from program" S+ programCode:programCode S+ "to list" S+ listCode:listCode
    {
        return {
            action: "giveReward",
            rewardCode: rewardCode,
            quantity: quantity,
            programCode: programCode,
            listCode: listCode
        };
    }
    / "send message text" S+ text:string S+ "with subject" S+ subject:string S+ "to list" S+ listCode:listCode
    {
        return {
            action: "sendTextMessage",
            messageText: text,
            messageSubject: subject,
            listCode: listCode
        };
    }
    / "send message text" S+ text:string S+ "with subject" S+ subject:string S+ "to emails" S+ emailFirst:email emailReminders:(S* "," S* email)*
    {
        return {
            action: "sendTextMessage",
            messageText: text,
            messageSubject: subject,
            emails: buildList(emailFirst, emailReminders, 3)
        };
    }
    / "send message template" S+ templateMessageCode:templateMessageCode S+ "to list" S+ listCode:listCode
    {
        return {
            action: "sendTemplateMessage",
            templateMessageCode: templateMessageCode,
            listCode: listCode
        };
    }
    / "send message template" S+ templateMessageCode:templateMessageCode S+ "to emails" S+ emailFirst:email emailReminders:(S* "," S* email)*
    {
        return {
            action: "sendTemplateMessage",
            templateMessageCode: templateMessageCode,
            emails: buildList(emailFirst, emailReminders, 3)
        };
    }

email "email"
    = user:code "@" domain:code
    {
        return user + "@" + domain;
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

templateMessageCode "templateMessageCode"
    = code

listCode "listCode"
    = code

rewardCode "rewardCode"
    = code

programCode "programCode"
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
