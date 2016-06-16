'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Rules:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse rules with system condition', function () {
            it('action TEST in zone CODE1,CODE2 on 2016-04-04 give 1 points', function (done) {

                var rule = parser.parse('action TEST in zone CODE1,CODE2 on 2016-04-04 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {type: 'on', date: [new Date(2016, 4 - 1, 4)], time: null}

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every sunday,monday give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every sunday,monday give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'days', list: ['sunday', 'monday']},
                            months: null,
                            years: null,
                            time: null
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every sunday,monday of march give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every sunday,monday of march give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'days', list: ['sunday', 'monday']},
                            months: {type: 'of', list: ['march']},
                            years: null,
                            time: null
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every sunday of march,january in 1959 give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every sunday of march,january in 1959 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'days', list: ['sunday']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'in', list: ['1959']},
                            time: null
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'day', list: ['day']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'from', list: [new Date(1959, 11, 10), new Date(1960, 2, 10)]},
                            time: null
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 before 04:00 am give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every day of march,january until 1960-03-10 before 04:00 am give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'day', list: ['day']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'until', list: [new Date(1960, 2, 10)]},
                            time: {type: 'before', list: ['04:00']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 on 2016-04-04,2015-03-03 between 05:30 am and 06:30 pm give 1 points', function (done) {

                var rule = parser.parse('action TEST in zone CODE1,CODE2 on 2016-04-04,2015-03-03 between 05:30 am and 06:30 pm give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'on',
                            date: [new Date(2016, 4 - 1, 4), new Date(2015, 3 - 1, 3)],
                            time: {type: 'between', list: ['05:30', '18:30']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every day of march,january starting at 1959-12-10 after 04:00 am give 1 points', function (done) {
                var rule = parser.parse('action TEST in zone CODE1,CODE2 every day of march,january starting at 1959-12-10 after 04:00 am give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        system: {
                            type: 'every',
                            days: {type: 'day', list: ['day']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'starting', list: [new Date(1959, 11, 10)]},
                            time: {type: 'after', list: ['04:00']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST every day of march,january starting at 1959-12-10 after 04:00 am give 1 points', function (done) {
                var rule = parser.parse('action TEST every day of march,january starting at 1959-12-10 after 04:00 am give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [],
                        system: {
                            type: 'every',
                            days: {type: 'day', list: ['day']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'starting', list: [new Date(1959, 11, 10)]},
                            time: {type: 'after', list: ['04:00']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST on the 1st day of march,january starting at 1959-12-10 after 04:00 am give 1 points', function (done) {
                var rule = parser.parse('action TEST on the 1st day of march,january in 1959 after 04:00 am give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [],
                        system: {
                            type: 'onThe',
                            days: {type: 'position', list: ['1st']},
                            months: {type: 'of', list: ['march', 'january']},
                            years: {type: 'in', list: ['1959']},
                            time: {type: 'after', list: ['04:00']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST on the 1st,12th day of month in 1959,1990 after 04:00 am give 1 points', function (done) {
                var rule = parser.parse('action TEST on the 1st,12th day of month in 1959,1990 after 04:00 am give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [],
                        system: {
                            type: 'onThe',
                            days: {type: 'position', list: ['1st','12th']},
                            months: {type: 'month', list: ['month']},
                            years: {type: 'in', list: ['1959','1990']},
                            time: {type: 'after', list: ['04:00']}
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

        });

        describe('Should restrict some parameter in the system condition', function () {

            it('action TEST every day of may starting at 1995-13-10 give 1 points', function (done) {

                try {
                    var rule = parser.parse('action TEST every day of may starting at 1995-13-10 give 1 points');
                } catch (err) {
                    err.message.should.equal('Expected date or whitespace but "1" found.');
                }

                done();
            });

            it('action TEST every day of may starting at 1995-12-32 give 1 points', function (done) {

                try {
                    var rule = parser.parse('action TEST every day of may starting at 1995-12-32 give 1 points');
                } catch (err) {
                    err.message.should.equal('Expected date or whitespace but "1" found.');
                }

                done();
            });

            it('action TEST every day of may starting at 1995-12-31 after 13:00 am give 1 points', function (done) {

                try {
                    var rule = parser.parse('action TEST every day of may starting at 1995-12-31 after 13:00 am give 1 points');
                } catch (err) {
                    err.message.should.equal('Expected time or whitespace but "1" found.');
                }

                done();
            });

            it('action TEST every day of may starting at 1995-12-31 after 13:00 am give 1 points', function (done) {

                try {
                    var rule = parser.parse('action TEST every day of may starting at 1995-12-31 after 02:60 am give 1 points');
                } catch (err) {
                    err.message.should.equal('Expected time or whitespace but "0" found.');
                }

                done();
            });
            
        });
    });
});
