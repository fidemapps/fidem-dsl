'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions has completed:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('completed',function(){

            it('member has completed TEST ', function (done) {

                var rule = parser.parse('member has completed TEST ');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type:'completed',
                                challengeCode: 'TEST'
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
                        query: {
                            type: 'completed',
                            challengeCode: 'TEST'
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
                        query: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        occurrenceFilter: {
                            type: 'less',
                            frequency: 3
                        }
                    }]
                });
                done();
            });

            it('member has not completed TEST before 2016-03-03 04:40 am', function (done) {

                var rule = parser.parse('member has not completed TEST before 2016-03-03 04:40 am');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            periodFilter: {
                                type: 'before',
                                date: '2016-03-03 04:40'
                            }
                        }]
                });
                done();
            });

            it('member has not completed TEST less than 3 times after 2016-03-03 4:40 am', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times after 2016-03-03 4:40 am');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'after',
                                date: '2016-03-03 04:40'
                            }
                        }]
                });
                done();
            });

            it.skip('member has not completed TEST less than 3 time in zone montreal,laval after 2016-03-03T04:40:40',function(){
                var rule = parser.parse('member has not completed TEST less than 3 time in zone montreal,laval after 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                challengeCode: 'TEST',
                                type: 'completed'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'after',
                                date: '2016-03-03 04:40:40'
                            },
                            geoFilter:{
                                type:'zone',
                                zoneCodes:['montreal','laval']
                            }
                        }
                    ]
                });
            });

            it.skip('member has not completed TEST less than 3 time in range of beacon BEACON1,BEACON2 since did eat',function(){

                var rule = parser.parse('member has not completed TEST less than 3 time in range of beacon BEACON1,BEACON2 since did eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                challengeCode: 'TEST',
                                type: 'completed'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'since_did',
                                actionCode:'eat'
                            },
                            geoFilter:{
                                type:'inRange',
                                beaconCodes:['BEACON1','BEACON2']
                            }
                        }
                    ]
                });
            });

            it.skip('member has not completed TEST less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat',function(){
                var rule = parser.parse('member has not completed TEST less than 3 time with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                challengeCode: 'TEST',
                                type: 'completed'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'since_did',
                                position:'last',
                                actionCode:'eat'
                            },
                            geoFilter:{
                                type:'RSSI_below',
                                rssiValue:3,
                                beaconCodes:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

            it.skip('member has not completed TEST less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat',function(){
                var rule = parser.parse('member has not completed TEST less than 3 time with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first eat');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                challengeCode: 'TEST',
                                type: 'completed'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'since_did',
                                position:'first',
                                actionCode:'eat'
                            },
                            geoFilter:{
                                type:'RSSI_over',
                                rssiValue:3,
                                beaconCodes:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });

            it.skip('member has not completed TEST less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since recieved prize bob',function(){
                var rule = parser.parse('member has not completed TEST less than 3 time with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since received prize bob');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            query: {
                                challengeCode: 'TEST',
                                type: 'completed'
                            },
                            occurrenceFilter: {
                                type: 'less',
                                frequency: 3
                            },
                            periodFilter: {
                                type: 'since_received',
                                prizeCode:'bob'
                            },
                            geoFilter:{
                                type:'RSSI_between',
                                rssiValues:[3,4],
                                beaconCodes:['BEACON1','BEACON2','BEACON3']
                            }
                        }
                    ]
                });
            });


        });


    });
});