'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Member conditions Rules:', function () {
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
                        },
                        occurence_filter: null,
                        geo_filter:null,
                        moment_filter:null,
                        period_filter: null

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
                        },
                        occurence_filter: null,
                        geo_filter:null,
                        moment_filter:null,
                        period_filter: null

                    }
                ]);
                done();
            });

            it('member did not TEST with jean < 2, bob = 3', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2& bob = 3');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'not',
                            code: 'TEST',
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
                        },
                        occurence_filter: null,
                        geo_filter:null,
                        moment_filter:null,
                        period_filter: null

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
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: 2
                                }
                            ]
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        },
                        geo_filter:null,
                        moment_filter:null,
                        period_filter: null

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
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: 2
                                }
                            ]
                        },
                        occurence_filter: null,
                        period_filter: {
                            type: 'before',
                            date: [
                                new Date('2016-03-03 04:40:40')
                            ]
                        },
                        geo_filter:null,
                        moment_filter:null
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
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: [
                                {
                                    operator: '<',
                                    attribute: 'jean',
                                    value: "thomas"
                                }
                            ]
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        },
                        period_filter:{
                            type: 'before',
                            date: [
                                new Date('2016-03-03 04:40:40')
                            ]
                        },
                        geo_filter:null,
                        moment_filter:null
                    }
                ]);
                done();
            });
            
            it('member did not TEST in zone montreal',function(){
                should(true).eql(false);
            });

            it('member did not TEST at least 4 times on monday',function(){
                var rule = parser.parse('member did not TEST at least 4 times on monday');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: null
                        },
                        occurence_filter: {number:4,type:'least'},
                        geo_filter:null,
                        moment_filter:{
                            days: { list: [ 'monday' ], type: 'days' },
                            months: null,
                            time: null,
                            type: 'on',
                            years: null
                        },
                        period_filter: null

                    }
                ]);
            });

            it('member did not TEST at least 4  times on the 1st,2nd day of december before 12:59 pm',function(){
                var rule = parser.parse('member did not TEST at least 4 times on the 1st,2nd day of december before 12:59 pm');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: null
                        },
                        occurence_filter: {number:4,type:'least'},
                        geo_filter:null,
                        moment_filter: {
                            days: { list: [ '1st', '2nd' ], type: 'position' },
                            months: { list: [ 'december' ], type: 'of' },
                            time: { list: [ '24:59' ], type: 'before' },
                            type: 'onThe',
                            years: null
                        },
                        period_filter: null

                    }
                ]);
            });

            it('member did not TEST at least 4  times on 2016-04-04,2017-04-04,2018-04-04',function(){
                var rule = parser.parse('member did not TEST at least 4  times on 2016-04-04,2017-04-04,2018-04-04');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'did',
                        condition: {
                            type: 'not',
                            code: 'TEST',
                            conditions: null
                        },
                        occurence_filter: {number:4,type:'least'},
                        geo_filter:null,
                        moment_filter: {
                            date: [
                                new Date(2016,4-1,4),
                                new Date(2017,4-1,4),
                                new Date(2018,4-1,4)
                ],
                time: null,
                    type: 'onDate'
            },
                        period_filter: null

                    }
                ]);
            });

        });

        describe('has', function () {
            describe('complete',function(){

                it('member has completed TEST ', function (done) {

                    var rule = parser.parse('member has completed TEST ');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'completed',
                                code: 'TEST'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:null,
                            moment_filter:null

                        }]
                    );
                    done();
                });

                it('member has not completed TEST', function (done) {

                    var rule = parser.parse('member has not completed TEST');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type: 'not',
                            sub_type:'completed',
                            code: 'TEST'
                        },
                        occurence_filter: null,
                        period_filter: null,
                        geo_filter:null,
                        moment_filter:null

                    }]);
                    done();
                });

                it('member has not completed TEST less than 3 times', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type: 'not',
                            sub_type:'completed',
                            code: 'TEST'
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        },
                        period_filter: null,
                        geo_filter:null,
                        moment_filter:null
                    }]);
                    done();
                });

                it('member has not completed TEST before 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'completed',
                                code: 'TEST'
                            },
                            occurence_filter: null,
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            },
                            geo_filter:null,
                            moment_filter:null
                        }]);
                    done();
                });

                it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'completed',
                                code: 'TEST'
                            },
                            occurence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            },
                            geo_filter:null,
                            moment_filter:null
                        }]);
                    done();
                });

            });

            describe('gained/lost',function(){
                
                describe('tag',function(){

                    it('member has gained tag bob',function(done){
                        var rule = parser.parse('member has gained tag bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'tag',
                                        tagCode: {
                                            tagClusterCode:null,
                                            tagCode : 'bob'
                                        }
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has lost 3 tag bob',function(done){
                        var rule = parser.parse('member has lost 3 tag bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: null,
                                    sub_type:'lost',
                                    object:{
                                        type:'tag',
                                        tagCode: {
                                            tagClusterCode:null,
                                            tagCode : 'bob'
                                        }
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not gained 3 tag bob',function(done){
                        var rule = parser.parse('member has not gained 3 tag bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: 'not',
                                    sub_type:'gained',
                                    object:{
                                        type:'tag',
                                        tagCode: {
                                            tagClusterCode:null,
                                            tagCode : 'bob'
                                        }
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not lost tag bob',function(done){
                        var rule = parser.parse('member has not lost tag bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: 'not',
                                    sub_type:'lost',
                                    object:{
                                        type:'tag',
                                        tagCode: {
                                            tagClusterCode:null,
                                            tagCode : 'bob'
                                        }
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has gained tag bob in last 3 days',function(done){
                        var rule = parser.parse('member has gained tag bob in last 3 days');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'tag',
                                        tagCode: {
                                            tagClusterCode:null,
                                            tagCode : 'bob'
                                        }
                                    }
                                },
                                occurence_filter: null,
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                },
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                });

                describe('points',function(){
                    
                    it('member has gained points bob',function(done){
                        var rule = parser.parse('member has gained points bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'points',
                                        levelCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has lost 3 points bob',function(done){
                        var rule = parser.parse('member has lost 3 points bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: null,
                                    sub_type:'lost',
                                    object:{
                                        type:'points',
                                        levelCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not gained 3 points bob',function(done){
                        var rule = parser.parse('member has not gained 3 points bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: 'not',
                                    sub_type:'gained',
                                    object:{
                                        type:'points',
                                        levelCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not lost points bob',function(done){
                        var rule = parser.parse('member has not lost points bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: 'not',
                                    sub_type:'lost',
                                    object:{
                                        type:'points',
                                        levelCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has gained points bob in last 3 days',function(done){
                        var rule = parser.parse('member has gained points bob in last 3 days');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'points',
                                        levelCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                },
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });
                });

                describe('prize',function(){
                    it('member has gained prize bob',function(done){
                        var rule = parser.parse('member has gained prize bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'prize',
                                        prizeCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has lost 3 prize bob',function(done){
                        var rule = parser.parse('member has lost 3 prize bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: null,
                                    sub_type:'lost',
                                    object:{
                                        type:'prize',
                                        prizeCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not gained 3 prize bob',function(done){
                        var rule = parser.parse('member has not gained 3 prize bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:3,
                                    type: 'not',
                                    sub_type:'gained',
                                    object:{
                                        type:'prize',
                                        prizeCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });

                    it('member has not lost prize bob',function(done){
                        var rule = parser.parse('member has not lost prize bob');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: 'not',
                                    sub_type:'lost',
                                    object:{
                                        type:'prize',
                                        prizeCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: null,
                                geo_filter:null,
                                moment_filter:null


                            }]
                        );
                        done();
                    });

                    it('member has gained prize bob in last 3 days',function(done){
                        var rule = parser.parse('member has gained prize bob in last 3 days');
                        should(rule).eql([
                            {
                                scope: 'member',
                                type: 'has',
                                condition: {
                                    number:null,
                                    type: null,
                                    sub_type:'gained',
                                    object:{
                                        type:'prize',
                                        prizeCode: 'bob'
                                    }
                                },
                                occurence_filter: null,
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                },
                                geo_filter:null,
                                moment_filter:null

                            }]
                        );
                        done();
                    });
                });

            });
            
            describe('has been',function(){
                
                it('member has been in zone',function(){

                    var rule = parser.parse('member has been in zone bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'zone',
                                zones:['bob']
                            },
                            moment_filter:null
                        }]);
                    
                });

                it('member has not been in zone',function(){

                    var rule = parser.parse('member has not been in zone bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'zone',
                                zones:['bob']
                            },
                            moment_filter:null
                        }]);

                });

                it('member has been in range',function(){

                    var rule = parser.parse('member has been in range of beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'inRange',
                                beacons:['bob']
                            },
                            moment_filter:null
                        }]);

                });

                it('member has not been in range',function(){

                    var rule = parser.parse('member has not been in range of beacon bob,tom');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'inRange',
                                beacons:['bob','tom']
                            },
                            moment_filter:null
                        }]);

                });
                
                it('member has been with RSSI over',function(){

                    var rule = parser.parse('member has been with RSSI over 310 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-over',
                                number:310,
                                beacons:['bob']
                            },
                            moment_filter:null
                        }]);

                });
                
                it('member has not been with RSSI over',function(){

                    var rule = parser.parse('member has not been  with RSSI over 310 from beacon bob,tom,carl');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-over',
                                number:310,
                                beacons:['bob','tom','carl']
                            },
                            moment_filter:null
                        }]);

                });

                it('member has been with RSSI below',function(){

                    var rule = parser.parse('member has been with RSSI below 4 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-below',
                                number:4,
                                beacons:['bob']
                            },
                            moment_filter:null
                        }]);

                });
                
                it('member has not been with RSSI below',function(){

                    var rule = parser.parse('member has not been with RSSI below 4 from beacon bob,eric,jean');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-below',
                                number:4,
                                beacons:['bob','eric','jean']
                            },
                            moment_filter:null
                        }]);

                });

                it('member has been with RSSI between',function(){

                    var rule = parser.parse('member has been with RSSI between 4 and 6 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-between',
                                start:4,
                                end:6,
                                beacons:['bob']
                            },
                            moment_filter:null
                        }]);
                });
                
                it('member has not been with RSSI between',function(){

                    var rule = parser.parse('member has not been with RSSI between 6 and 4 from beacon bob,norbert');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type:'been'
                            },
                            occurence_filter: null,
                            period_filter: null,
                            geo_filter:{
                                type:'RSSI-between',
                                start:6,
                                end:4,
                                beacons:['bob','norbert']
                            },
                            moment_filter:null
                        }]);

                });
                
            });

        });

    });
    
});