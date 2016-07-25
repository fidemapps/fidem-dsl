'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions "belongs to smartlist":', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member belongs to smartlist condition', function () {

            it('member belongs to smartlist bob', function (done) {
                var condition = parser.parse('member belongs to smartlist bob');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob']
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob,roger,mike,steve',function(done){
                var condition = parser.parse('member belongs to smartlist bob,roger,mike,steve');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','roger','mike','steve']
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 1 minute',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 1 minute');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:1,
                                    durationScope:'minute'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 1 minutes',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 1 minutes');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:1,
                                    durationScope:'minute'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob,steve since 30 hours',function(done){
                var condition = parser.parse('member belongs to smartlist bob,steve since 30 hours');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve'],
                                condition:{
                                    type:'since',
                                    duration:30,
                                    durationScope:'hour'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob,steve since 30 hour',function(done){
                var condition = parser.parse('member belongs to smartlist bob,steve since 30 hour');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve'],
                                condition:{
                                    type:'since',
                                    duration:30,
                                    durationScope:'hour'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob,steve,mike since 3000 days',function(done){
                var condition = parser.parse('member belongs to smartlist bob,steve,mike since 3000 days');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve','mike'],
                                condition:{
                                    type:'since',
                                    duration:3000,
                                    durationScope:'day'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob,steve,mike since 3000 day',function(done){
                var condition = parser.parse('member belongs to smartlist bob,steve,mike since 3000 day');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve','mike'],
                                condition:{
                                    type:'since',
                                    duration:3000,
                                    durationScope:'day'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 2 week',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 2 week');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:2,
                                    durationScope:'week'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 2 weeks',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 2 weeks');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:2,
                                    durationScope:'week'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 6 month',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 6 month');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:6,
                                    durationScope:'month'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 6 months',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 6 months');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:6,
                                    durationScope:'month'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 8 year',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 8 year');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:8,
                                    durationScope:'year'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member belongs to smartlist bob since 8 years',function(done){
                var condition = parser.parse('member belongs to smartlist bob since 8 years');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:8,
                                    durationScope:'year'
                                }
                            }
                        }
                    ]
                });
                done();
            });


        });

        describe('Should parse member does not belong to smartlist condition', function () {

            it('member does not belong to smartlist bob', function (done) {
                var condition = parser.parse('member does not belong to smartlist bob');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob']
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob,roger,mike,steve',function(done){
                var condition = parser.parse('member does not belong to smartlist bob,roger,mike,steve');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','roger','mike','steve']
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 1 minute',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 1 minute');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:1,
                                    durationScope:'minute'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 1 minutes',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 1 minutes');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:1,
                                    durationScope:'minute'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob,steve since 30 hours',function(done){
                var condition = parser.parse('member does not belong to smartlist bob,steve since 30 hours');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve'],
                                condition:{
                                    type:'since',
                                    duration:30,
                                    durationScope:'hour'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob,steve since 30 hour',function(done){
                var condition = parser.parse('member does not belong to smartlist bob,steve since 30 hour');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve'],
                                condition:{
                                    type:'since',
                                    duration:30,
                                    durationScope:'hour'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob,steve,mike since 3000 days',function(done){
                var condition = parser.parse('member does not belong to smartlist bob,steve,mike since 3000 days');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve','mike'],
                                condition:{
                                    type:'since',
                                    duration:3000,
                                    durationScope:'day'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob,steve,mike since 3000 day',function(done){
                var condition = parser.parse('member does not belong to smartlist bob,steve,mike since 3000 day');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob','steve','mike'],
                                condition:{
                                    type:'since',
                                    duration:3000,
                                    durationScope:'day'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 2 week',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 2 week');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:2,
                                    durationScope:'week'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 2 weeks',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 2 weeks');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:2,
                                    durationScope:'week'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 6 month',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 6 month');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:6,
                                    durationScope:'month'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 6 months',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 6 months');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:6,
                                    durationScope:'month'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 8 year',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 8 year');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:8,
                                    durationScope:'year'
                                }
                            }
                        }
                    ]
                });
                done();
            });

            it('member does not belong to smartlist bob since 8 years',function(done){
                var condition = parser.parse('member does not belong to smartlist bob since 8 years');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            type: 'belongs',
                            negative:true,
                            query:{
                                type:'smartlist',
                                smartlistCodes:['bob'],
                                condition:{
                                    type:'since',
                                    duration:8,
                                    durationScope:'year'
                                }
                            }
                        }
                    ]
                });
                done();
            });


        });


    });
});
