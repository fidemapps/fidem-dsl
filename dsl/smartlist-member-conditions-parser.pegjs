
/*HELPER FUNCTIONS*/
{

    //Merge 2 objects and their fields into one object

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
= scope:"member" S* type:"created" S* periodFilter:periodFilterCreatedLite
{
    return {
        scope: scope,
        type: type,
        periodFilter: periodFilter
    };
}
/ scope:"member" S* "lives" S* "in" S* query:live_condition
{

    return {
        scope: scope,
        type: "lives",
        query:query
    };
}
/ scope:"member" S* "lives" S* "not" S* "in" S* query:live_condition
{

    return {
        scope: scope,
        type: "lives",
        negative:true,
        query:query
    };
}/member_condition

/*LIVE CONDITION*/
live_condition
= "city"  S* value:name
{
    return {
        type:'city',
        cityName: value
    }
}
/ "state"  S* value:name
{
    return {
        type:'state',
        stateName: value
    }
}
/ "country" S* value:name
{
    return {
        type:'country',
        countryName: value
    }
}
/ "zip"  S* value:name
{
    return {
        type:'zip',
        zipCode: value
    }
}

/*MEMBER CONDITION*/

member_condition
=scope:"member" S* type:"did" S* conditionType:("nothing" / "something")  S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:{
            type:conditionType
        }

    };

    if(period){
        rule.periodFilter=period;
    }

    if(geo){
        rule.geoFilter=geo;
    }

    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }
    return rule;
}
/ scope:"member" S* type:"did" S* "not" S* conditions:did_rule S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    if(geo){
        rule.geoFilter=geo;
    }

    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    return rule;
}
/ scope:"member" S* type:"did" S* conditions:did_rule S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    if(geo){
        rule.geoFilter=geo;
    }

    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_completed S* occurrence:occurrenceFilter?  S* geo:geoFilter? S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    if(geo){
        rule.geoFilter=geo;
    }

    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_completed S* occurrence:occurrenceFilter?  S* geo:geoFilter? S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    if(geo){
        rule.geoFilter=geo;
    }

    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_gained_lost S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_gained_lost S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_been S* geo:geoFilter S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(geo){
        rule.geoFilter=geo;
    }

    if(period){
        rule.periodFilter=period;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_been S* geo:geoFilter S* period:periodFilter?
{
    var rule= {
        scope:scope,
        type:type,
        negative:true,
        query:conditions
    };

    if(geo){
        rule.geoFilter=geo;
    }

    if(period){
        rule.periodFilter=period;
    }

    return rule;
}
/scope:"member" S* type:"is" S* geo:geoFilterIsLite
{
    var rule= {
        scope:scope,
        type:type,
        geoFilter:geo
    };

    return rule;
}
/scope:"member" S* type:"with" S* condition:with_condition
{
    return {
        scope:scope,
        type:"with",
        query:condition
    };
}
/scope:"member" S* type:"without" S* condition:with_condition
{
    return {
        scope:scope,
        type:"with",
        negative:true,
        query:condition
    };
}


did_rule
=actionCode:actionCode S* condition:member_action_condition?
{
    var rule= {
        type:'action',
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

    var completeType=type+"_"+object.type;
    delete object.type;
    var rule = Object.assign({type:completeType},object);

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
=condition:object_rule_tag S* value:(operator_percent/operator_number)?
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
        type:'tag',
        tagCode:tagCode
    }
}

object_rule_points
="points" S* levelCode:levelCode
{
    return {
        type:'points',
        levelCode:levelCode

    }
}

object_rule_prize
="prize" S* prizeCode:prizeCode
{
    return {
        type:'prize',
        prizeCode:prizeCode
    }
}

/*OCCURRENCE FILTER*/

occurrenceFilter
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

/*period rule*/


/*periodFilterCreatedLite*/

periodFilterCreatedLite
= type:"before" S* date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"after" S* date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"between" S* start:DATE_TIME S* "and" S* end:DATE_TIME
{
    return {
        type:type,
        dates:[start,end]
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


/*periodFilter*/

periodFilter
= type:"before" S* date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"after" S* date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"between" S* start:DATE_TIME S* "and" S* end:DATE_TIME
{
    return {
        type:type,
        dates:[start,end]
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
        type:"since_"+type,
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
        type:"since_"+type,
        prizeCode:prizeCode
    }
}

/*GEO FILTER*/
geoFilter
= "in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
{
    return {
        type: 'zone',
        zoneCodes: buildList(first, reminders, 3)
    };
}
/ "in range of" S* beacons:beacon_list
{
    return {
        type: 'inRange',
        beaconCodes:beacons
    }
}
/ "with RSSI" S* type:("over"/"below") S* number:NUMBER S* "from" S* beacons:beacon_list
{
    return{
        type:"RSSI_"+type,
        rssiValue:number,
        beaconCodes:beacons
    }
}
/ "with RSSI" S* type:"between" S* start:NUMBER S* "and" S* end:NUMBER S* "from" S* beacons:beacon_list
{
    return{
        type:"RSSI_"+type,
        rssiValues:[start,end],
        beaconCodes:beacons
    }
}

beacon_list
= "beacon" S* first:beaconCode reminders:(S* "," S* beaconCode:beaconCode)*
{
    return buildList(first,reminders,3);
}

/*geoFilterIsLite*/
geoFilterIsLite="in zone" S* first:zoneCode reminders:(S* "," S* zoneCode:zoneCode)*
{
    return {
        type: 'zone',
        zoneCodes: buildList(first, reminders, 3)
    };
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
= (operator:OPERATOR S* value: NUMBER)
{
    return {
        operator: operator,
        value: value
    };
}
operator_percent
= operator:OPERATOR S* value:PERCENT S* "of total"
{
    return {
        relative:true,
        relativeScope:'total',
        operator: operator,
        value: value
    };
}
/operator:OPERATOR S* value:PERCENT
{
    return {
        relative:true,
        operator: operator,
        relativeScope:'member',
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

PERCENT "percentage"
=  ( "100"/(DIGIT? DIGIT) "." DIGIT+ /( DIGIT) "." DIGIT+ /(DIGIT? DIGIT)/DIGIT) S* "%"
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
= year:date_full_year "-" month:date_month "-" day:date_day "T" hour:time_hour_24 ":" minute:time_minute ":" second:time_second
{
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

OPERATOR
= op:(">=" / "<=" / "=" / ">" / "<")
{
    return op;
}
