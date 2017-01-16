
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
= first:simple_condition reminders:(S* "and" S+ simple_condition)* S*
{
    return  {
        conditions: buildList(first, reminders, 3)
    };
}

simple_condition
= member_scope_rule

/*MEMBER SCOPE*/

member_scope_rule
= scope:"member" S+ type:"created" S+ periodFilter:periodFilterCreatedLite
{
    return {
        scope: scope,
        type: type,
        periodFilter: periodFilter
    };
}
/ scope:"member" S+ "lives" S+ "in" S+ query:live_condition
{

    return {
        scope: scope,
        type: "lives",
        query:query
    };
}
/ scope:"member" S+ "lives" S+ "not" S+ "in" S+ query:live_condition
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
= "city"  S+ value:STRING
{
    return {
        type:'city',
        cityName: value
    }
}
/ "state"  S+ value:STRING
{
    return {
        type:'state',
        stateName: value
    }
}
/ "country" S+ value:STRING
{
    return {
        type:'country',
        countryName: value
    }
}
/ "zip"  S+ value:STRING
{
    return {
        type:'zip',
        zipCode: value
    }
}

/*MEMBER CONDITION*/

member_condition
=scope:"member" S+ type:"did" S+ conditionType:("nothing" / "something")  S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter? S* moment:momentFilter?
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

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/ scope:"member" S+ type:"did" S+ "not" S+ conditions:did_rule S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter? S* moment:momentFilter?
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

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/ scope:"member" S+ type:"did" S+ conditions:did_rule S* occurrence:occurrenceFilter? S* geo:geoFilter? S* period:periodFilter?  S* moment:momentFilter?
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

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ conditions:has_rule_completed S* occurrence:occurrenceFilter? S* period:periodFilter?  S* moment:momentFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }


    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ "not" S+ conditions:has_rule_completed S* occurrence:occurrenceFilter?   S* period:periodFilter? S* moment:momentFilter?
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


    if(occurrence){
        rule.occurrenceFilter = occurrence;
    }

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ conditions:has_rule_gained_lost S* period:periodFilter? S* moment:momentFilter?
{
    var rule= {
        scope:scope,
        type:type,
        query:conditions
    };

    if(period){
        rule.periodFilter=period;
    }

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ "not" S+ conditions:has_rule_gained_lost S* period:periodFilter? S* moment:momentFilter?
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

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ conditions:has_rule_been S+ geo:geoFilter S* period:periodFilter? S* moment:momentFilter?
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

    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"has" S+ "not" S+ conditions:has_rule_been S+ geo:geoFilter S* period:periodFilter? S* moment:momentFilter?
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


    if(moment){
        rule.momentFilter=moment;
    }

    return rule;
}
/scope:"member" S+ type:"is" S+ geo:geoFilterIsLite
{
    var rule= {
        scope:scope,
        type:type,
        geoFilter:geo
    };

    return rule;
}
/scope:"member" S+ type:"with" S+ condition:( with_condition / member_attribute_condition)
{
    return {
        scope:scope,
        type:"with",
        query:condition
    };
}
/scope:"member" S+ type:"without" S+ condition:(with_condition / member_attribute_condition)
{
    return {
        scope:scope,
        type:"with",
        negative:true,
        query:condition
    };
}



did_rule
=type:"action" S+ actionCode:actionCode  condition:member_action_condition?
{
    var rule= {
        type:type,
        actionCode:actionCode
    };

    if(condition){
        rule.conditions=condition;
    }

    return rule;
}
/type:"check-in" S+ checkinCode:checkinCode  condition:member_action_condition?
{
    var rule= {
        type:"action",
        actionCode:"check-in"
    };

    if(condition){
        rule.conditions = condition.concat([
            {
                "operator": "=",
                "name": "checkin_code",
                "value": checkinCode
            }
        ]);
    }else{
    	rule.conditions = [
    	    {
                "operator": "=",
                "name": "checkin_code",
                "value": checkinCode
            }
        ];
    }

    return rule;
}

has_rule_completed
=type:"completed" S+ challengeCode:challengeCode
{
    return {
        type:type,
        challengeCode:challengeCode
    }
}


member_action_condition
= S+ "with" S+ first:attribute_operator_value remainders:(S* "&" S* attribute_operator_value)*
{
    return buildList(first,remainders,3);
}

has_rule_gained_lost
=type:("gained"/"lost") S+ number:NUMBER? S* object:object_rule
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
= "been"
{
    return {
        type:"been"
    }
}

with_condition
=condition:object_rule_tagCluster S* value:operator_number?
{
    return value ? Object.assign(condition,value):Object.assign(condition,{operator:'>',value:0});
}
/condition:object_rule_tag S* value:(operator_percent/operator_number/operator_position)?
{
    return value ? Object.assign(condition,value):Object.assign(condition,{operator:'>',value:0});
}
/condition:object_rule_points S* value:operator_number?
{
    return value ? Object.assign(condition,value):Object.assign(condition,{operator:'>',value:0});
}
/condition:object_rule_prize
{
    return condition;
}
/condition:object_rule_level S* value:operator_number?
{
    return value ? Object.assign(condition,value):Object.assign(condition,{operator:'>',value:0});
}

object_rule
=(object_rule_tag / object_rule_points / object_rule_prize)

object_rule_tag
="tag" S+ tagCode:tagCode
{
    return {
        type:'tag',
        tagCode:tagCode
    }
}

object_rule_tagCluster
="tag cluster" S+ tagClusterCode:tagClusterCode
{
    return {
        type:'tagCluster',
        tagClusterCode:tagClusterCode
    }
}

object_rule_points
="points" S+ levelCode:levelCode
{
    return {
        type:'points',
        levelCode:levelCode

    }
}

object_rule_level
="level" S+ levelCode:levelCode
{
    return {
        type:'level',
        levelCode:levelCode
    }
}

object_rule_prize
="prize" S+ prizeCode:prizeCode
{
    return {
        type:'prize',
        prizeCode:prizeCode
    }
}

member_attribute_condition
= 'attribute' S+ condition:(gender_rules / age_rules  / language_rules /email_rules /phone_rules /integration_id_rules / address_rules)
{
    return  Object.assign({type:'attribute'},condition)
}
/type:"attribute" S+ attribute:('first name'/ 'last name'/ 'alias' / 'picture' / 'external id')
{
    return {
        type: type,
        attribute: attribute.replace(" ","_")
    }
}

gender_rules
= attribute:"gender" S+ "equal to" S+ value:GENDER
{
    return {
        attribute: attribute,
        operator: '=',
        value: value
    }
}
/attribute:"gender"
{
    return {
        attribute: attribute
    }
}


age_rules
=attribute:"age" S+ value:operator_number
{
    return Object.assign({attribute: attribute},value)
}
/attribute:"age"
{
    return {
        attribute: attribute
    }
}

language_rules
= attribute: 'language' S+ 'equal to' S+ code:languageCode
{
    return {
        attribute: attribute,
        operator: '=',
        value: code
    }
}
/ attribute: 'language'
{
    return {
        attribute: attribute
    }
}

address_rules
= attribute: 'address' S+ name:('city'/'state'/'country') S+ 'equal to' S+ value:name
{
    return {
        attribute: attribute,
        name: name,
        operator: '=',
        value: value
    }
}
/ attribute: 'address' S+ name:('city'/'state'/'country'/'street'/'zip')
{
    return {
        attribute: attribute,
        name: name,
    }
}
/ attribute: 'address'
{
    return {
        attribute: attribute
    }
}


email_rules
=  attribute: 'email' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute,
        typeValue: value
     }
}
/attribute: 'email'
 {
     return {
         attribute: attribute
      }
 }

phone_rules
=  attribute: 'phone' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute,
        typeValue: value
     }
}
/attribute: 'phone'
 {
     return {
         attribute: attribute
      }
 }

integration_id_rules
=  attribute: 'integration id' S+ 'with type' S+ value:name
{
    return {
        attribute: attribute.replace(' ', '_'),
        typeValue:value
     }
}
/attribute: 'integration id'
 {
     return {
         attribute: attribute.replace(' ', '_')
      }
 }

/*OCCURRENCE FILTER*/

occurrenceFilter
= "at least" S+ number:NUMBER S+ "times"
{
    return {
        type:'least',
        frequency:number
    }
}
/"at least" S+ "once"
{
    return {
        type:'least',
        frequency:1
    }
}
/"less than" S+ number:NUMBER S+ "times"
{
    return {
        type:"less",
        frequency:number
    }
}
/"less than" S+ "once"
{
    return {
        type:"less",
        frequency:1
    }
}
/type:"exactly" S+ number:NUMBER S+ "times"
{
    return {
        type:type,
        frequency:number
    }
}
/type:"exactly" S+ "once"
{
    return {
        type:type,
        frequency:1
    }
}

/*period rule*/


/*periodFilterCreatedLite*/

periodFilterCreatedLite
= type:"before" S+ date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"after" S+ date:DATE_TIME_AFTER
{
    return {
        type:type,
        date:date
    }
}
/type:"between" S+ start:DATE_TIME S+ "and" S+ end:DATE_TIME_AFTER
{
    return {
        type:type,
        dates:[start,end]
    }
}
/"in last" S+ durationScope:timeframe
{
    return {
        type:"last",
        duration: 1,
        durationScope: durationScope
    }
}
/"in last" S+ duration:NUMBER S+ durationScope:timeframes
{
    return {
        type:"last",
        duration: duration,
        durationScope: durationScope
    }
}




/*periodFilter*/

periodFilter
= type:"before" S+ date:DATE_TIME
{
    return {
        type:type,
        date:date
    }
}
/type:"after" S+ date:DATE_TIME_AFTER
{
    return {
        type:type,
        date:date
    }
}
/type:"between" S+ start:DATE_TIME S+ "and" S+ end:DATE_TIME_AFTER
{
    return {
        type:type,
        dates:[start,end]
    }
}
/"in last" S+ duration:NUMBER S+ durationScope:timeframes
{
    return {
        type:"last",
        duration: duration,
        durationScope: durationScope
    }
}
/"in last" S+ durationScope:timeframe
{
    return {
        type:"last",
        duration: 1,
        durationScope: durationScope
    }
}
/"since" S+ type:"did" S+ position:("first"/"last")? S* scope:"action" S+ actionCode:actionCode
{
    var rule = {
        type:"since_"+type,
        scope:scope,
        actionCode:actionCode
    };

    if(position){
        rule.position=position;
    }

    return rule;
}
/"since" S+ type:"did" S+ position:("first"/"last")? S* scope:"check-in" S+ checkinCode:checkinCode
{
    var rule = {
        type:"since_"+type,
        scope:scope,
        checkinCode:checkinCode
    };

    if(position){
        rule.position=position;
    }

    return rule;
}
/"since" S+ type:"received" S+ scope:"prize" S+ prizeCode:prizeCode
{
    return {
        type:"since_"+type,
        scope:scope,
        prizeCode:prizeCode
    }
}

/*GEO FILTER*/
geoFilter
= "in geofence" S+ first:geofenceCode reminders:(S* "," S* geofenceCode:geofenceCode)*
{
    return {
        type: 'geofence',
        geofenceCodes: buildList(first, reminders, 3)
    };
}
/ "in range of" S+ beacons:beacon_list
{
    return {
        type: 'in_range',
        beaconCodes:beacons
    }
}
/ "with RSSI" S+ type:("over"/"below") S+ number:NUMBER S+ "from" S+ beacons:beacon_list
{
    return{
        type:type=='over'? "rssi_over":"rssi_below",
        rssiValue:number,
        beaconCodes:beacons
    }
}
/ "with RSSI" S+ type:"between" S+ start:NUMBER S+ "and" S+ end:NUMBER S+ "from" S+ beacons:beacon_list
{
    return{
        type:"rssi_between",
        rssiValues:[start,end],
        beaconCodes:beacons
    }
}

beacon_list
= "beacon" S+ first:beaconCode reminders:(S* "," S* beaconCode:beaconCode)*
{
    return buildList(first,reminders,3);
}

/*geoFilterIsLite*/
geoFilterIsLite="in geofence" S+ first:geofenceCode reminders:(S* "," S* geofenceCode:geofenceCode)*
{
    return {
        type: 'geofence',
        geofenceCodes: buildList(first, reminders, 3)
    };
}

/*MOMENT FILTER*/
momentFilter
= type:"before" S+ time:TIME
{
    return {
        type: type,
        times: [time]
    }
}
/ type:"after" S+ time:TIME
{
    return {
        type: type,
        times: [time]
    }
}
/ type:"between" S+ time1:TIME S+ "and" S+ time2:TIME
{
    return {
        type: type,
        times: [time1,time2]
    }
}
/"during the" S+ moment:DAY_MOMENTS
{
    return {
        type: "during",
        moment: moment
    }
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
operator_percent
= operator:OPERATOR S* value:PERCENT
{
    return {
        relative:true,
        operator: operator,
        relativeScope:'member',
        value: value
    };
}

operator_position
= operator:POSITION S* value:PERCENT
  {
      return {
          relative:true,
          operator: operator,
          value: value,
          relativeScope: 'position'
      };
  }
/ operator:POSITION S* value:NATURAL_NUMBER
{
    return {
        operator: operator,
        value: value
    };
}



/*PRIMARY*/

timeframe
 = value:( "minute" /  "hour" /  "day" /  "week" / "month" /  "year" )
 {
     return value.replace(/s/g,'');
 }

 timeframes
 = value:("minutes" /"hours" / "days"  / "weeks"  / "months" / "years"  )
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

checkinCode "checkinCode"
= code

languageCode "languageCode"
= code

tagCode "tagCode"
= tagClusterCode:tagClusterCodeForTag code:code
{
    return {
        tagCode: code,
        tagClusterCode: tagClusterCode
    }
}

tagClusterCodeForTag
=tagClusterCode:tagClusterCode ":" {return tagClusterCode}


tagClusterCode "tagClusterCode"
= code:code { return code; }

geofenceCode "geofenceCode"
= code

attributeName "attributeName"
= code

NUMBER "number"
= [+-]? (DIGIT* "." DIGIT+ / DIGIT+)
{
    return parseFloat(text());
}

NATURAL_NUMBER "natural number"
= (DIGIT+)
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
= ($([0] [1-9]) / $([1] [0-2]))

date_day
= ($([0-2] DIGIT) / $([3] [0-1]))

time_hour_12
= $([0] DIGIT) / $([1] [0-2]) / $(DIGIT)

time_hour_24
=$([0-1] DIGIT) / $([2][0-3]) / $(DIGIT)

time_minute
= $([0-5] DIGIT)

time_second
= $([0-5] DIGIT)


TIME_24 "24h time (hh:mm)"
= hour:time_hour_24 ":" minute:time_minute
{
    return {
        hour: hour,
        minute: minute
    }
}

TIME_CHOICE
    = time:TIME_12 S* choice:("am"/"pm")
     {
        if(time.hour == '12'){
            if(choice=="pm"){
                return "12:"+time.minute;
            }else{
                return "00:"+time.minute;
            }
        }
        if(choice=="pm"){
            time.hour=parseInt(time.hour)+12;
        }

        return time.hour+":"+time.minute;
    }

TIME_12 "12h time (hh:mm am/pm)"
    = hour:time_hour_12 ":" minute:time_minute
    {

        return {hour: hour.length === 1? "0"+hour:hour,minute:minute};
    }

TIME
= time:TIME_CHOICE
{
    return  time;
}
/ time:TIME_24
{
    return  (time.hour.length ===  1? "0"+time.hour :time.hour)  + ":" + time.minute;
}

DATE "date (YYYY-MM-DD)"
= year:date_full_year "-" month:date_month "-" day:date_day
{
    return year + "-" + month + "-" + day;
}

DATE_AFTER "date (YYYY-MM-DD)"
= year:date_full_year "-" month:date_month "-" day:date_day
{
    var d=parseInt(day);
    var m=parseInt(month);
    var y=parseInt(year);

    if(d >= 31){
        d="01";
        m++;
    }else{
        d++;
    }
    if(m >= 12){
        m="01"
        y++;
    }

    return y + "-" + (m.toString().length === 1? "0"+m:m) + "-" + (d.toString().length === 1? "0"+d:d);
}

DATE_TIME
= date:DATE S+ time:TIME_CHOICE
{
    return date + " " + time;
}
/ date:DATE S+ time:TIME_24
{
    return date + " " + (time.hour.length ===  1? "0"+time.hour :time.hour)  + ":" + time.minute;
}
/date:DATE
 {
     return date + " " + "00:00";
 }


DATE_TIME_AFTER
= date:DATE S+ time:TIME
{
    return date + " " + time;
}
/date:DATE_AFTER
{
    return date + " " + "00:00";
}

OPERATOR
= op:(">=" / "<=" / "=" / ">" / "<")
{
    return op;
}

DAY_MOMENTS
    = moment:("night" / "morning" / "afternoon" / "evening")

POSITION
= pos:('in top')
{
    return 'top';
}

GENDER
= gender:('male' / 'female' / 'other')