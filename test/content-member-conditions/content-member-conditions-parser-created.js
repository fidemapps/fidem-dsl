'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions created:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member created conditions', function () {

            it('member created last 1 week', function (done) {
                var condition = parser.parse("member created in last 1 weeks");
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: { duration: 1, durationScope: 'week', type: 'last' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

            it('member created after 2014-01-01',function(){
                var condition = parser.parse("member created after 2014-01-01");
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: { date: '2014-01-02 00:00', type: 'after' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created after 2014-01-01 10:10',function(){
                var condition = parser.parse("member created after 2014-01-01 10:10");
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: { date: '2014-01-01 10:10', type: 'after' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created before 2014-01-01',function(){
                var condition = parser.parse("member created before 2014-01-01");
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: { date: '2014-01-01 00:00', type: 'before' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created before 2014-01-01 10:10 pm',function(){
                var condition = parser.parse("member created before 2014-01-01 10:10 pm");
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: { date: '2014-01-01 22:10', type: 'before' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created between 2014-01-01 8:10 and 2015-01-31', function (done) {
                var condition = parser.parse('member created between 2014-01-01 08:10 and 2015-01-31');
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: {
                                dates: [ '2014-01-01 08:10', '2015-02-01 00:00' ],
                                type: 'between'
                            },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

            it('member created between 2014-01-01 8:10 and 2015-01-01 08:08', function (done) {
                var condition = parser.parse('member created between 2014-01-01 08:10 and 2015-01-01 08:08');
                should(condition).eql({
                    conditions: [
                        {

                            periodFilter: {
                                dates: [ '2014-01-01 08:10', '2015-01-01 08:08' ],
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
