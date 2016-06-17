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
                            condition: {
                                type: 'nothing'
                            },
                            filters: []

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
                            filters: []
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
                            filters: [{
                                type: 'less',
                                number: 3
                            }]
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
                            filters: [{
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }]
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
                            filters: [{
                                type: 'less',
                                number: 3
                            }, {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }]
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
                            condition: {
                                type: null,
                                code: 'TEST'
                            },
                            filters: []

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
                        condition: {
                            type: 'not',
                            code: 'TEST'
                        },
                        filters: []

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
                        condition: {
                            type: 'not',
                            code: 'TEST'
                        },
                        filters: [{
                            type: 'less',
                            number: 3
                        }]
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
                            condition: {
                                type: 'not',
                                code: 'TEST'
                            },
                            filters: [{
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }]
                        }]
                });
                done();
            });

            it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40');
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'has',
                            condition: {
                                type: 'not',
                                code: 'TEST'
                            },
                            filters: [{
                                type: 'less',
                                number: 3
                            }, {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
                                ]
                            }]
                        }]
                });
                done();
            });

        });
    });
});