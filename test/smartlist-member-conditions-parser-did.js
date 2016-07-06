'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions did:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('should parse did condition', function () {

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

            it('member did something', function (done) {

                var rule = parser.parse('member did something');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
                            condition: {
                                type: 'something'
                            }
                        }
                    ]
                });
                done();
            });

            it('member did  TEST with jean < 2 & bob = 3', function (done) {

                var rule = parser.parse('member did  TEST with jean < 2& bob = 3');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'did',
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
                                frequency: 3
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
                                frequency: 3
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
                                frequency: 3
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
                                frequency: 3
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
                                frequency: 3
                            },
                            period_filter: {
                                type: 'since-did',
                                position:'last',
                                actionCode:'eat'
                            },
                            geo_filter:{
                                type:'RSSI-below',
                                rssiValue:3,
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
                                frequency: 3
                            },
                            period_filter: {
                                type: 'since-did',
                                position:'first',
                                actionCode:'eat'
                            },
                            geo_filter:{
                                type:'RSSI-over',
                                rssiValue:3,
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
                                frequency: 3
                            },
                            period_filter: {
                                type: 'since-received',
                                target:'prize',
                                prizeCode:'bob'
                            },
                            geo_filter:{
                                type:'RSSI-between',
                                rssiValue:[3,4],
                                beacons:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

        });

    });
});