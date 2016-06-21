'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Rules: Member condition', function () {

        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('did', function () {

            it('member did nothing give 1 points', function (done) {

                var rule = parser.parse('member did nothing give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        conditions: {
                            type: 'nothing'
                        },
                        occurence_filter: null,
                        period_filter: null

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2, bob = 3 give 1 points', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2, bob = 3 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        conditions: {
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
                        period_filter: null
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 less than 3 times give 1 points', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 less than 3 times give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        conditions: {
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
                        period_filter: null
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points', function (done) {

                var rule = parser.parse('member did not TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        conditions: {
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
                                new Date(2016, 2, 3, 4, 40, 40)
                            ]
                        }
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points', function (done) {

                var rule = parser.parse('member did not TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        conditions: {
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
                        period_filter: {
                            type: 'before',
                            date: [
                                new Date(2016, 2, 3, 4, 40, 40)
                            ]
                        }
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

        });

        describe('has', function () {

            it('member has completed TEST give 1 points', function (done) {

                var rule = parser.parse('member has completed TEST give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'has',
                        conditions: {
                            type: null,
                            code: 'TEST'
                        },
                        occurence_filter:null,
                        period_filter:null

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member has not completed TEST give 1 points', function (done) {

                var rule = parser.parse('member has not completed TEST give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter:null,
                        period_filter:null

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member has not completed TEST less than 3 times give 1 points', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        },
                        period_filter:null
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member has not completed TEST before 2016-03-03T04:40:40 give 1 points', function (done) {

                var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter:null,
                        period_filter: {
                            type: 'before',
                            date: [
                                new Date(2016, 2, 3, 4, 40, 40)
                            ]
                        }
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40 give 1 points', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'has',
                        conditions: {
                            type: 'not',
                            code: 'TEST'
                        },
                        occurence_filter: {
                            type: 'less',
                            number: 3
                        }, 
                        period_filter:{
                            type: 'before',
                            date: [
                                new Date(2016, 2, 3, 4, 40, 40)
                            ]
                        }
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

        });

    });


});
