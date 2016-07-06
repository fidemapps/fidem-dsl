'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions created:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member created conditions', function () {

            it('member created last 1 week', function (done) {
                var condition = parser.parse("member created in last 1 week");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { duration: 1, durationScope: 'week', type: 'last' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

            it('member created after 2014-01-01T10:10:10',function(){
                var condition = parser.parse("member created after 2014-01-01T10:10:10");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { date: [new Date('2014-01-01 10:10:10')], type: 'after' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created before 2014-01-01T10:10:10',function(){
                var condition = parser.parse("member created before 2014-01-01T10:10:10");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { date: [new Date('2014-01-01 10:10:10')], type: 'before' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did first eat',function(){
                var condition = parser.parse("member created since did first eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did',position:'first' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did last eat',function(){
                var condition = parser.parse("member created since did last eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did',position:'last' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did eat',function(){
                var condition = parser.parse("member created since did eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since received prize points',function(){

                var condition = parser.parse("member created since received prize points");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { prizeCode: 'points', type: 'since-received' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created between 2014-01-01T10:10:10 and 2015-01-01T08:08:08', function (done) {
                var condition = parser.parse('member created between 2014-01-01T10:10:10 and 2015-01-01T08:08:08');
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: {
                                date: [ new Date('2014-01-01 10:10:10'), new Date('2015-01-01 08:08:08') ],
                                type: 'between'
                            },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

        });

    });
});
