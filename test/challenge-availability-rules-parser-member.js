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

            it('member did not TEST with jean < 2, bob = 3', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2& bob = 3');
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
                            start:5,
                            end:3,
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

        describe('has', function () {
            describe('complete',function(){

                it('member has completed TEST ', function (done) {

                    var rule = parser.parse('member has completed TEST ');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type:'completed',
                                code: 'TEST'
                            }

                        }]
                    );
                    done();
                });

                it('member has not completed TEST', function (done) {

                    var rule = parser.parse('member has not completed TEST');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'completed',
                            code: 'TEST'
                        }

                    }]);
                    done();
                });

                it('member has not completed TEST less than 3 times', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'completed',
                            code: 'TEST'
                        },
                        occurrence_filter: {
                            type: 'less',
                            number: 3
                        }
                    }]);
                    done();
                });

                it('member has not completed TEST before 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'completed',
                                code: 'TEST'
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            }
                        }]);
                    done();
                });

                it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'completed',
                                code: 'TEST'
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
                                    type:'gained',
                                    tagCode: {
                                        tagClusterCode:null,
                                        tagCode : 'bob'
                                    }
                                }

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
                                    type:'lost',
                                    tagCode: {
                                        tagClusterCode:null,
                                        tagCode : 'bob'

                                    }
                                }

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
                                negative:true,
                                condition: {
                                    number:3,
                                    type:'gained',
                                    tagCode: {
                                        tagClusterCode:null,
                                        tagCode : 'bob'
                                    }
                                }

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
                                negative:true,
                                condition: {
                                    type:'lost',
                                    tagCode: {
                                        tagClusterCode:null,
                                        tagCode : 'bob'
                                    }
                                }

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
                                    type:'gained',
                                    tagCode: {
                                        tagClusterCode:null,
                                        tagCode : 'bob'
                                    }
                                },
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                }

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
                                    type:'gained',
                                    levelCode: 'bob'

                                }

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
                                    type:'lost',
                                    levelCode: 'bob'

                                }

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
                                negative:true,
                                condition: {
                                    number:3,
                                    type:'gained',
                                    levelCode: 'bob'

                                }

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
                                negative:true,
                                condition: {
                                    type:'lost',
                                    levelCode: 'bob'

                                }

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
                                    type:'gained',
                                    levelCode: 'bob'

                                },
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                }

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
                                    type:'gained',
                                    prizeCode: 'bob'

                                }

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
                                    type:'lost',
                                    prizeCode: 'bob'

                                }

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
                                negative:true,
                                condition: {
                                    number:3,
                                    type:'gained',
                                    prizeCode: 'bob'

                                }

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
                                negative:true,
                                condition: {
                                    type:'lost',
                                    prizeCode: 'bob'

                                }

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
                                    type:'gained',
                                    prizeCode: 'bob'

                                },
                                period_filter: {
                                    type:'last',
                                    duration:3,
                                    durationScope:'day'
                                }


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
                                type:'been'
                            },
                            geo_filter:{
                                type:'zone',
                                zones:['bob']
                            }
                        }]);
                    
                });

                it('member has not been in zone',function(){

                    var rule = parser.parse('member has not been in zone bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                               type:'been'
                            },
                            geo_filter:{
                                type:'zone',
                                zones:['bob']
                            }
                        }]);

                });

                it('member has been in range',function(){

                    var rule = parser.parse('member has been in range of beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'inRange',
                                beacons:['bob']
                            }
                        }]);

                });

                it('member has not been in range',function(){

                    var rule = parser.parse('member has not been in range of beacon bob,tom');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'inRange',
                                beacons:['bob','tom']
                            }
                        }]);

                });
                
                it('member has been with RSSI over',function(){

                    var rule = parser.parse('member has been with RSSI over 310 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-over',
                                number:310,
                                beacons:['bob']
                            }
                        }]);

                });
                
                it('member has not been with RSSI over',function(){

                    var rule = parser.parse('member has not been  with RSSI over 310 from beacon bob,tom,carl');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-over',
                                number:310,
                                beacons:['bob','tom','carl']
                            }
                        }]);

                });

                it('member has been with RSSI below',function(){

                    var rule = parser.parse('member has been with RSSI below 4 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-below',
                                number:4,
                                beacons:['bob']
                            }
                        }]);

                });
                
                it('member has not been with RSSI below',function(){

                    var rule = parser.parse('member has not been with RSSI below 4 from beacon bob,eric,jean');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-below',
                                number:4,
                                beacons:['bob','eric','jean']
                            }
                        }]);

                });

                it('member has been with RSSI between',function(){

                    var rule = parser.parse('member has been with RSSI between 4 and 6 from beacon bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-between',
                                start:4,
                                end:6,
                                beacons:['bob']
                            }
                        }]);
                });
                
                it('member has not been with RSSI between',function(){

                    var rule = parser.parse('member has not been with RSSI between 6 and 4 from beacon bob,norbert');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative:true,
                            condition: {
                                type:'been'
                            },
                            geo_filter:{
                                type:'RSSI-between',
                                start:6,
                                end:4,
                                beacons:['bob','norbert']
                            }
                        }]);

                });
                
            });

        });

    });
    
});