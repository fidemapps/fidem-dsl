
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
}
/scope:'member' S* "belongs to smartlist" S* firstCode:smartlistCode S* codes:( S* "&" S* smartlistCode:smartlistCode)* S* condition:smartlist_condition?
{
    var rule =  {
        scope:scope,
        type: "smartlist",
        condition:{
            codes: buildList(firstCode, codes, 3)
        }
    };

    if(condition){
        rule.condition.condition=condition;
    }

    return rule;
}
/scope:'member' S* "do not belongs to smartlist" S* firstCode:smartlistCode S* codes:(S* "&" S* smartlistCode:smartlistCode)* S* condition:smartlist_condition?
{
    var rule = {
        scope:scope,
        type: "smartlist",
        negative:true,
        condition:{
            codes: buildList(firstCode, codes, 3)
        }
    };

    if(condition){
        rule.condition.condition=condition;
    }

    return rule;
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
=scope:"member" S* type:"did" S* conditionType:("nothing" / "something")  S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter? S* moment:moment_filter?
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

    if(moment){
        rule.moment_filter=moment;
    }

    return rule;
}
/ scope:"member" S* type:"did" S* "not" S* conditions:did_rule S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter? S* moment:moment_filter?
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

    if(moment){
        rule.moment_filter=moment;
    }

    return rule;
}
/ scope:"member" S* type:"did" S* conditions:did_rule S* occurrence:occurrence_filter? S* geo:geo_filter? S* period:period_filter? S* moment:moment_filter?
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

    if(moment){
        rule.moment_filter=moment;
    }

    return rule;
}
/scope:"member" S* type:"has" S* conditions:has_rule_completed S* occurrence:occurrence_filter?  S* geo:geo_filter? S* period:period_filter? S* moment:moment_filter?
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

    if(moment){
        rule.moment_filter=moment;
    }

    return rule;
}
/scope:"member" S* type:"has" S* "not" S* conditions:has_rule_completed S* occurrence:occurrence_filter?  S* geo:geo_filter? S* period:period_filter? S* moment:moment_filter?
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

    if(moment){
        rule.moment_filter=moment;
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

    if(geo){
        rule.geo_filter=geo;
    }

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
        rule.number=number
    }

    return rule;
}

has_rule_been
=  S* "been"
{
    return {
        type:"been"
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

has_rule_completed
=type:"completed" S* challengeCode:challengeCode
{
    return {
        type:type,
        code:challengeCode
    }
}




/*OCCURENCE FILTER*/

occurrence_filter
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
        number:[start,end],
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
    var rule = {
    type : 'on',
    days:{type:"days",list:buildList(first,remainders,3)}
    };

    if(months){
        rule.months = months;
    }

    if(years){
        rule.years = years;
    }

    if(time){
        rule.time=time;
    }

    return rule;
}
/"on" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
{
    var rule= {
        type : 'on',
        days:{type:"day",list:["day"]}
    };

    if(months){
        rule.months = months;
    }

    if(years){
        rule.years = years;
    }

    if(time){
        rule.time=time;
    }

    return rule;
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
    var rule =  {
        type: 'onDate',
        date:buildList(first,remainders,3)
    };

    if(time){
        rule.time=time;
    }

    return rule;
}

onThe
= "the" S* first:POSITION remainders:(S* "," S* position:POSITION)* S* "day" S* months:(ofMonth/ "of" S* "month") S* years:(inYear / dateRules)? S* time:timeRule?
{
    var result={
        type: 'onThe',
        days: {type:"position",list:buildList(first,remainders,3)},
        months:months
    };


    if(Array.isArray(months)){
        result.months={type:'month', list:["month"]};
    }

    if(years){
        result.years = years;
    }

    if(time){
        result.time=time;
    }

    return result;
}

/*SYSTEM CONDITION*/
system_condition
="every" S* first:WEEK_DAY remainders:(S* "," S* weekDays:WEEK_DAY)*  S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
{
    var rule=  {
        scope : "system",
        type:'every',
        days:{type:"days",list:buildList(first,remainders,3)}
    };

    if(months){
        rule.months = months;
    }

    if(years){
        rule.years = years;
    }

    if(time){
        rule.time=time;
    }

    return rule;
}
/"every" S* "day" S* months:ofMonth? S* years:(inYear / dateRules)? S* time:timeRule?
{
    var rule = {
        scope : "system",
        type:'every',
        days:{type:"day",list:["day"]}
    };

    if(months){
        rule.months = months;
    }

    if(years){
        rule.years = years;
    }

    if(time){
        rule.time=time;
    }
    return rule;
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
