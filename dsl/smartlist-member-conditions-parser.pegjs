
/*HELPER FUNCTIONS*/
{

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
        period_filter: period_filter
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
        }
    };
}/member_condition


/*MEMBER CONDITION*/

member_condition
=scope:"member" S* type:"did" S* conditionType:("nothing" / "something")  S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        condition:{
            type:conditionType
        }

    };

    if(period){
        rule.period_filter=period;
    }

    if(geo){
        rule.geo_filter=geo;
    }

    if(occurrence){
        rule.occurrence_filter = occurrence;
    }
    return rule;
}
/ scope:"member" S* type:"did" S* "not" S* conditions:did_rule S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    if(geo){
        rule.geo_filter=geo;
    }

    if(occurrence){
        rule.occurrence_filter = occurrence;
    }

    return rule;
}
/ scope:"member" S* type:"did" S* conditions:did_rule S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    if(geo){
        rule.geo_filter=geo;
    }

    if(occurrence){
        rule.occurrence_filter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_completed S* occurrence:occurrence_filter?  S* geo:geo_filter? S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    if(geo){
        rule.geo_filter=geo;
    }

    if(occurrence){
        rule.occurrence_filter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_completed S* occurrence:occurrence_filter?  S* geo:geo_filter? S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    if(geo){
        rule.geo_filter=geo;
    }

    if(occurrence){
        rule.occurrence_filter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_gained_lost S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_gained_lost S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        condition:conditions
    };

    if(period){
        rule.period_filter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_been S* geo:geo_filter S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        condition:conditions
    };

    if(geo){
        rule.geo_filter=geo;
    }

    if(period){
        rule.period_filter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_been S* geo:geo_filter S* period:period_filter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        condition:conditions
    };

    if(geo){
        rule.geo_filter=geo;
    }

    if(period){
        rule.period_filter=period;
    }

    return rule;
}
/scope:"member" S* type:"is" S* geo:geo_filter
{
    var rule= {
        scope:scope,
        type:type,
        geo_filter:geo
    };

    return rule;
}
/scope:"member" S* type:"with" S* condition:with_condition
{
    return {
        scope:scope,
        type:"with",
        condition:condition
    };
}
/scope:"member" S* type:"without" S* condition:with_condition
{
    return {
        scope:scope,
        type:"with",
        negative:true,
        condition:condition
    };
}


did_rule
=actionCode:actionCode S* condition:member_action_condition?
{
    var rule= {
        actionCode:actionCode
    };

    if(condition){
        rule.conditions=condition;
    }

    return rule;
}

has_rule_completed
=type:"completed" S* challengeCode:challengeCode
{
    return {
        type:type,
        challengeCode:challengeCode
    }
}


member_action_condition
= "with" S* first:attribute_operator_value remainders:(S* "&" S* attribute_operator_value)*
{
    return buildList(first,remainders,3);
}

has_rule_gained_lost
=type:("gained"/"lost") S* number:NUMBER? S* object:object_rule
{
    var rule= Object.assign({type:type},object);

    if(number){
        rule.quantity=number;
    }

    return rule;
}

has_rule_been
= S* "been"
{
    return {
        type:"been"
    }
}

with_condition
=condition:object_rule_tag S* value:operator_number?
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
=(object_rule_tag / object_rule_points / object_rule_prize)

object_rule_tag
="tag" S* tagCode:tagCode
{
    return {
        tagCode:tagCode
    }
}

object_rule_points
="points" S* levelCode:levelCode
{
    return {
        levelCode:levelCode
    }
}

object_rule_prize
="prize" S* prizeCode:prizeCode
{
    return {
        prizeCode:prizeCode
    }
}

/*OCCURRENCE FILTER*/

occurrence_filter
= "at" S* type:"least" S* number:NUMBER S* ("times" / "time")
{
    return {
        type:type,
        frequency:number
    }
}
/type:"less" S* "than" S* number:NUMBER S* ("times" / "time")
{
    return {
        type:type,
        frequency:number
    }
}
/type:"exactly" S* number:NUMBER S* ("times" / "time")
{
    return {
        type:type,
        frequency:number
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
    var rule = {
        type:"since-"+type,
        actionCode:actionCode
    };

    if(position){
        rule.position=position;
    }

    return rule;
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
        rssiValue:number,
        beacons:beacons
    }
}
/ "with RSSI" S* type:"between" S* start:NUMBER S* "and" S* end:NUMBER S* "from" S* beacons:beacon_list
{
    return{
        type:"RSSI-"+type,
        rssiValue:[start,end],
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
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
}

DATE_TIME "datetime"
= year:date_full_year "-" month:date_month "-" day:date_day "T" hour:time_hour_24 ":" minute:time_minute ":" second:time_second
{
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second), 0);
}

OPERATOR
= op:(">=" / "<=" / "=" / ">" / "<")
{
    return op;
}
