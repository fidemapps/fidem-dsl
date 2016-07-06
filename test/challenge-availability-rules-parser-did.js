'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Member conditions Rules did:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
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
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'nothing'
                        }

                    }
                ]);
                done();
            });

            it('member did something', function (done) {

                var rule = parser.parse('member did something');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'something'
                        }

                    }
                ]);
                done();
            });

            it('member did not TEST with jean < 2 & bob = 3', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 & bob = 3');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: 2
                                },
                                {
                                    operator: '=',
                                    attribute: 'bob',
                                    value: 3
                                }
                            ]
                        }

                    }
                ]);
                done();
            });

            it('member did not TEST with jean < 2 less than 3 times', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 less than 3 times');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: 2
                                }
                            ]
                        },
                        occurrence_filter: {
                            type: 'less',
                            number: 3
                        }

                    }
                ]);
                done();
            });

            it('member did not TEST with jean < 2 before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 before 2016-03-03T04:40:40');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
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
                ]);
                done();
            });

            it('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: "thomas"
                                }
                            ]
                        },
                        occurrence_filter: {
                            type: 'less',
                            number: 3
                        },
                        period_filter:{
                            type: 'before',
                            date: [
                                new Date('2016-03-03 04:40:40')
                            ]
                        }
                    }
                ]);
                done();
            });
            
            it('member did not TEST in zone montreal',function(){
                var rule = parser.parse('member did not TEST in zone montreal');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'zone',
                            zones:['montreal']
                        }

                    }
                ]);
            });

            it('member did not TEST in zone montreal,laval,levis',function(){
                var rule = parser.parse('member did not TEST in zone montreal,laval,levis');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'zone',
                            zones:['montreal','laval','levis']
                        }

                    }
                ]);
            });

            it('member did not TEST in range of beacon shop',function(){
                var rule = parser.parse('member did not TEST in range of beacon shop');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'inRange',
                            beacons:['shop']
                        }

                    }
                ]);
            });

            it('member did not TEST in range of beacon shop,store,retail',function(){
                var rule = parser.parse('member did not TEST in range of beacon shop,store,retail');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'inRange',
                            beacons:['shop','store','retail']
                        }

                    }
                ]);
            });

            it('member did not TEST with RSSI over 3 from beacon shop',function(){
                var rule = parser.parse('member did not TEST with RSSI over 3 from beacon shop');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'RSSI-over',
                            number:3,
                            beacons:['shop']
                        }

                    }
                ]);
            });

            it('member did not TEST with RSSI below 5 from beacon shop,store',function(){
                var rule = parser.parse('member did not TEST with RSSI below 5 from beacon shop,store');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'RSSI-below',
                            number:5,
                            beacons:['shop','store']
                        }

                    }
                ]);
            });

            it('member did not TEST with RSSI between 5 and 3 from beacon shop,store',function(){
                var rule = parser.parse('member did not TEST with RSSI between 5 and 3 from beacon shop,store');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        geo_filter:{
                            type:'RSSI-between',
                            number:[5,3],
                            beacons:['shop','store']
                        }

                    }
                ]);
            });

            it('member did not TEST at least 4 times on monday',function(){
                var rule = parser.parse('member did not TEST at least 4 times on monday');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        occurrence_filter: {number:4,type:'least'},
                        moment_filter:{
                            days: { list: [ 'monday' ], type: 'days' },
                            type: 'on'
                        }

                    }
                ]);
            });

            it('member did not TEST at least 4 times on the 1st,2nd day of december before 12:59 pm',function(){
                var rule = parser.parse('member did not TEST at least 4 times on the 1st,2nd day of december before 12:59 pm');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        occurrence_filter: {number:4,type:'least'},
                        moment_filter: {
                            days: { list: [ '1st', '2nd' ], type: 'position' },
                            months: { list: [ 'december' ], type: 'of' },
                            time: { list: [ '24:59' ], type: 'before' },
                            type: 'onThe'
                        }

                    }
                ]);
            });

            it('member did not TEST at least 4 times on 2016-04-04,2017-04-04,2018-04-04',function(){
                var rule = parser.parse('member did not TEST at least 4  times on 2016-04-04,2017-04-04,2018-04-04');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        negative:true,
                        condition: {
                            actionCode: 'TEST'
                        },
                        occurrence_filter: {number:4,type:'least'},
                        moment_filter: {
                            date: [
                                new Date(2016,4-1,4),
                                new Date(2017,4-1,4),
                                new Date(2018,4-1,4)
                            ],
                                type: 'onDate'
                        }


                    }
                ]);
            });

        });
        

    });
    
});