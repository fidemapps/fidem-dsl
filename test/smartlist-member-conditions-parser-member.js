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
                            sub_scope: 'did',
                            conditions: {
                                type: 'nothing'
                            },
                            occurence_filter: null,
                            period_filter: null
                        }
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2, bob = 3', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2, bob = 3');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'did',
                            conditions: {
                                type: 'not',
                                code: 'TEST',
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
                            },
                            occurence_filter: null,
                            period_filter: null
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
                            sub_scope: 'did',
                            conditions: {
                                type: 'not',
                                code: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: 2
                                    }
                                ]
                            },
                            occurence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: null
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
                            sub_scope: 'did',
                            conditions: {
                                type: 'not',
                                code: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: 2
                                    }
                                ]
                            },
                            occurence_filter: null,
                            period_filter: {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
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
                            sub_scope: 'did',
                            conditions: {
                                type: 'not',
                                code: 'TEST',
                                conditions: [
                                    {
                                        operator: '<',
                                        name: 'jean',
                                        value: "thomas"
                                    }
                                ]
                            },
                            occurence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }
                        }
                    ]
                });
                done();
            });

        });

        describe('has', function () {

            it('member has completed TEST ', function (done) {

                var rule = parser.parse('member has completed TEST ');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'has',
                            conditions: {
                                type: null,
                                code: 'TEST'
                            },
                            occurence_filter: null,
                            period_filter: null

                        }]
                });
                done();
            });

            it('member has not completed TEST', function (done) {

                var rule = parser.parse('member has not completed TEST');
                should(rule).eql({
                    conditions: [{
                        scope: 'member',
                        sub_scope: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter: null,
                        period_filter: null

                    }]
                });
                done();
            });

            it('member has not completed TEST less than 3 times', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times');
                should(rule).eql({
                    conditions: [{
                        scope: 'member',
                        sub_scope: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        },
                        period_filter: null
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
                            sub_scope: 'has',
                            conditions: {
                                type: 'not',
                                code: 'TEST'
                            },
                            occurence_filter: null,
                            period_filter: {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }
                        }]
                })
                ;
                done();
            });

            it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'has',
                            conditions: {
                                type: 'not',
                                code: 'TEST'
                            },
                            occurence_filter: {
                                type: 'less',
                                number: 3
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }
                        }]
                });
                done();
            });

        });
    });
});