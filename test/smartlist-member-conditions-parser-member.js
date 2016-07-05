'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('List Member Conditions Member:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('did', function () {

            it('member did nothing', function (done) {

                var rule = parser.parse('member did nothing');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            condition: {
                                type: 'nothing'
                            }
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 & bob = 3', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2& bob = 3');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: 2
                                    },
                                    {
                                        operator: '=',
                                        name: 'bob',
                                        value: 3
                                    }
                                ]
                            }
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 less than 3 times', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 less than 3 times');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: 2
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            }
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 before 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: 2
                                    }
                                ]
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            }
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            }
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < "thomas" less than 3 time in zone montreal,laval after 2016-03-03T04:40:40',function(){
                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 time in zone montreal,laval after 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'after',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            },
                            geo_filter:{
                                type:'zone',
                                zones:['montreal','laval']
                            }
                        }
                    ]
                });
            });

            it('member did not TEST with jean < "thomas" less than 3 time in range of beacon BEACON1,BEACON2 since did eat',function(){

                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 time in range of beacon BEACON1,BEACON2 since did eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'since-did',
                                actionCode:'eat'
                            },
                            geo_filter:{
                                type:'inRange',
                                beacons:['BEACON1','BEACON2']
                            }
                        }
                    ]
                });
            });

            it('member did not TEST with jean < "thomas" less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat',function(){
                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'since-did',
                                position:'last',
                                actionCode:'eat'
                            },
                            geo_filter:{
                                type:'RSSI-below',
                                number:3,
                                beacons:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

            it('member did not TEST with jean < "thomas" less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat',function(){
                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'since-did',
                                position:'first',
                                actionCode:'eat'
                            },
                            geo_filter:{
                                type:'RSSI-over',
                                number:3,
                                beacons:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

            it('member did not TEST with jean < "thomas" less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since recieved prize bob',function(){
                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since received prize bob');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            negative:true,
                            condition: {
                                actionCode: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'since-received',
                                target:'prize',
                                prizeCode:'bob'
                            },
                            geo_filter:{
                                type:'RSSI-between',
                                number:[3,4],
                                beacons:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

        });

        describe('has', function () {
            
            describe('completed',function(){

                it('member has completed TEST ', function (done) {

                    var rule = parser.parse('member has completed TEST ');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    type:'completed',
                                    code: 'TEST'
                                }

                            }]
                    });
                    done();
                });

                it('member has not completed TEST', function (done) {

                    var rule = parser.parse('member has not completed TEST');
                    should(rule).eql({
                        conditions: [{
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type: 'completed',
                                code: 'TEST'
                            }

                        }]
                    });
                    done();
                });

                it('member has not completed TEST less than 3 times', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times');
                    should(rule).eql({
                        conditions: [{
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type: 'completed',
                                code: 'TEST'
                            },
                            occurrence_filter: {
                                type: 'less',
                                number: 3
                            }
                        }]
                    });
                    done();
                });

                it('member has not completed TEST before 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    type: 'completed',
                                    code: 'TEST'
                                },
                                period_filter: {
                                    type: 'before',
                                    date: [
                                        new Date('2016-03-03 04:40:40')
                                    ]
                                }
                            }]
                    });
                    done();
                });

                it('member has not completed TEST less than 3 times after 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times after 2016-03-03T04:40:40');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    type: 'completed',
                                    code: 'TEST'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'after',
                                    date: [
                                        new Date('2016-03-03 04:40:40')
                                    ]
                                }
                            }]
                    });
                    done();
                });

                it('member has not completed TEST less than 3 time in zone montreal,laval after 2016-03-03T04:40:40',function(){
                    var rule = parser.parse('member has not completed TEST less than 3 time in zone montreal,laval after 2016-03-03T04:40:40');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    code: 'TEST',
                                    type: 'completed'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'after',
                                    date: [
                                        new Date('2016-03-03 04:40:40')
                                    ]
                                },
                                geo_filter:{
                                    type:'zone',
                                    zones:['montreal','laval']
                                }
                            }
                        ]
                    });
                });

                it('member has not completed TEST less than 3 time in range of beacon BEACON1,BEACON2 since did eat',function(){

                    var rule = parser.parse('member has not completed TEST less than 3 time in range of beacon BEACON1,BEACON2 since did eat');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    code: 'TEST',
                                    type: 'completed'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'since-did',
                                    actionCode:'eat'
                                },
                                geo_filter:{
                                    type:'inRange',
                                    beacons:['BEACON1','BEACON2']
                                }
                            }
                        ]
                    });
                });

                it('member has not completed TEST less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat',function(){
                    var rule = parser.parse('member has not completed TEST less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    code: 'TEST',
                                    type: 'completed'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'since-did',
                                    position:'last',
                                    actionCode:'eat'
                                },
                                geo_filter:{
                                    type:'RSSI-below',
                                    number:3,
                                    beacons:['BEACON1','BEACON2','BEACON3']
                                }
                            }
                        ]
                    });
                });

                it('member has not completed TEST less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat',function(){
                    var rule = parser.parse('member has not completed TEST less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    code: 'TEST',
                                    type: 'completed'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'since-did',
                                    position:'first',
                                    actionCode:'eat'
                                },
                                geo_filter:{
                                    type:'RSSI-over',
                                    number:3,
                                    beacons:['BEACON1','BEACON2','BEACON3']
                                }
                            }
                        ]
                    });
                });

                it('member has not completed TEST less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since recieved prize bob',function(){
                    var rule = parser.parse('member has not completed TEST less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since received prize bob');
                    should(rule).eql({
                        conditions: [
                            {
                                scope: 'member',
                                type: 'has',
                                negative:true,
                                condition: {
                                    code: 'TEST',
                                    type: 'completed'
                                },
                                occurrence_filter: {
                                    type: 'less',
                                    number: 3
                                },
                                period_filter: {
                                    type: 'since-received',
                                    target:'prize',
                                    prizeCode:'bob'
                                },
                                geo_filter:{
                                    type:'RSSI-between',
                                    number:[3,4],
                                    beacons:['BEACON1','BEACON2','BEACON3']
                                }
                            }
                        ]
                    });
                });


            });

            describe('gained/lost',function(){

                describe('tag',function(){
                    
                    it('member has gained tag bob',function(done){
                        var rule = parser.parse('member has gained tag bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type: 'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has lost 3 tag bob',function(done){
                        var rule = parser.parse('member has lost 3 tag bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            number:3,
                                            type:'lost',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not gained 3 tag bob',function(done){
                        var rule = parser.parse('member has not gained 3 tag bob');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            number:3,
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not lost tag bob',function(done){
                        var rule = parser.parse('member has not lost tag bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            type:'lost',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob in last 3 days ',function(done){
                        var rule = parser.parse('member has gained tag bob in last 3 days');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'last',
                                            duration:3,
                                            durationScope:'day'

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob before 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained tag bob before 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'before',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob after 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained tag bob after 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'after',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10',function(done){
                        var rule = parser.parse('member has gained tag bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'between',
                                            date:[new Date('2016-04-04 10:10:10'),new Date('2016-04-05 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob since did eat',function(done){
                        var rule = parser.parse('member has gained tag bob since did eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob since did first eat',function(done){
                        var rule = parser.parse('member has gained tag bob since did first eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'first',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob since did last eat',function(done){
                        var rule = parser.parse('member has gained tag bob since did last eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'last',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained tag bob since received prize points',function(done){
                        var rule = parser.parse('member has gained tag bob since received prize points');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        },
                                        period_filter: {
                                            type:'since-received',
                                            target:'prize',
                                            prizeCode:'points'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                });

                describe('points',function(){

                    it('member has gained points bob',function(done){
                        var rule = parser.parse('member has gained points bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type: 'gained',
                                            levelCode:'bob'

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has lost 3 points bob',function(done){
                        var rule = parser.parse('member has lost 3 points bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            number:3,
                                            type:'lost',
                                            levelCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not gained 3 points bob',function(done){
                        var rule = parser.parse('member has not gained 3 points bob');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            number:3,
                                            type:'gained',
                                            levelCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not lost points bob',function(done){
                        var rule = parser.parse('member has not lost points bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            type:'lost',
                                            levelCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob in last 3 days ',function(done){
                        var rule = parser.parse('member has gained points bob in last 3 days');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'last',
                                            duration:3,
                                            durationScope:'day'

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob before 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained points bob before 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'before',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob after 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained points bob after 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'after',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10',function(done){
                        var rule = parser.parse('member has gained points bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'between',
                                            date:[new Date('2016-04-04 10:10:10'),new Date('2016-04-05 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob since did eat',function(done){
                        var rule = parser.parse('member has gained points bob since did eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob since did first eat',function(done){
                        var rule = parser.parse('member has gained points bob since did first eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'first',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob since did last eat',function(done){
                        var rule = parser.parse('member has gained points bob since did last eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'last',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob since received prize points',function(done){
                        var rule = parser.parse('member has gained points bob since received prize points');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            levelCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-received',
                                            target:'prize',
                                            prizeCode:'points'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                });

                describe('prize',function(){
                    it('member has gained prize bob',function(done){
                        var rule = parser.parse('member has gained prize bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type: 'gained',
                                            prizeCode:'bob'

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has lost 3 prize bob',function(done){
                        var rule = parser.parse('member has lost 3 prize bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            number:3,
                                            type:'lost',
                                            prizeCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not gained 3 prize bob',function(done){
                        var rule = parser.parse('member has not gained 3 prize bob');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            number:3,
                                            type:'gained',
                                            prizeCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has not lost prize bob',function(done){
                        var rule = parser.parse('member has not lost prize bob');
                        should(rule).eql({
                                conditions: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative:true,
                                        condition: {
                                            type:'lost',
                                            prizeCode:'bob'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob in last 3 days ',function(done){
                        var rule = parser.parse('member has gained prize bob in last 3 days');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'last',
                                            duration:3,
                                            durationScope:'day'

                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob before 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained prize bob before 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'before',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob after 2016-04-04T10:10:10',function(done){
                        var rule = parser.parse('member has gained prize bob after 2016-04-04T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'after',
                                            date:[new Date('2016-04-04 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10',function(done){
                        var rule = parser.parse('member has gained prize bob between  2016-04-04T10:10:10 and  2016-04-05T10:10:10');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'between',
                                            date:[new Date('2016-04-04 10:10:10'),new Date('2016-04-05 10:10:10')]
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob since did eat',function(done){
                        var rule = parser.parse('member has gained prize bob since did eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob since did first eat',function(done){
                        var rule = parser.parse('member has gained prize bob since did first eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'first',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob since did last eat',function(done){
                        var rule = parser.parse('member has gained prize bob since did last eat');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-did',
                                            position:'last',
                                            actionCode:'eat'
                                        }

                                    }]
                            }
                        );
                        done();
                    });

                    it('member has gained prize bob since received prize prize',function(done){
                        var rule = parser.parse('member has gained prize bob since received prize prize');
                        should(rule).eql({
                                conditions:[
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        condition: {
                                            type:'gained',
                                            prizeCode:'bob'
                                        },
                                        period_filter: {
                                            type:'since-received',
                                            target:'prize',
                                            prizeCode:'prize'
                                        }

                                    }]
                            }
                        );
                        done();
                    });
                });
            });
        });
    });
});