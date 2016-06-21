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
                        condition: {
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
                                '2016-03-03T04:40:40'
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
                        period_filter: {
                            type: 'before',
                            date: [
                                '2016-03-03T04:40:40'
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

            describe('completed', function () {

                it('member has completed TEST give 1 points', function (done) {

                    var rule = parser.parse('member has completed TEST give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: null,
                                sub_type: 'completed',
                                code: 'TEST'
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

                it('member has not completed TEST give 1 points', function (done) {

                    var rule = parser.parse('member has not completed TEST give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type: 'completed',
                                code: 'TEST'
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

                it('member has not completed TEST less than 3 times give 1 points', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type: 'completed',
                                code: 'TEST'
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

                it('member has not completed TEST before 2016-03-03T04:40:40 give 1 points', function (done) {

                    var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40 give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                type: 'not',
                                sub_type: 'completed',
                                code: 'TEST'
                            },
                            occurence_filter: null,
                            period_filter: {
                                type: 'before',
                                date: [
                                    '2016-03-03T04:40:40'
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
                            condition: {
                                type: 'not',
                                sub_type: 'completed',
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
                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                    done();
                });

            });

            describe('gained/loss', function () {

                it('member has gained tag bob give 1 points', function (done) {
                    var rule = parser.parse('member has gained tag bob give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                number: null,
                                type: null,
                                sub_type: 'gained',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
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

                it('member has loss 3 tag bob give 1 points', function (done) {
                    var rule = parser.parse('member has loss 3 tag bob give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            condition: {
                                number: 3,
                                type: null,
                                sub_type: 'loss',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
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

                it('member has not gained 3 tag bob give 1 points', function (done) {
                    var rule = parser.parse('member has not gained 3 tag bob give 1 points');
                    should(rule).eql({
                            rules: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    condition: {
                                        number: 3,
                                        type: 'not',
                                        sub_type: 'gained',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    occurence_filter: null,
                                    period_filter: null

                                }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        }
                    );
                    done();
                });

                it('member has not loss tag bob give 1 points', function (done) {
                    var rule = parser.parse('member has not loss tag bob give 1 points');
                    should(rule).eql({
                            rules: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    condition: {
                                        number: null,
                                        type: 'not',
                                        sub_type: 'loss',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    occurence_filter: null,
                                    period_filter: null

                                }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        }
                    );
                    done();
                });

                it('member has gained tag bob exactly 3 times give 1 points', function (done) {
                    var rule = parser.parse('member has gained tag bob exactly 3 times give 1 points');
                    should(rule).eql({
                            rules: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    condition: {
                                        number: null,
                                        type: null,
                                        sub_type: 'gained',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    occurence_filter: {
                                        type: 'exactly',
                                        number: 3
                                    },
                                    period_filter: null

                                }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        }
                    );
                    done();
                });

                it('member has gained tag bob in last 3 days give 1 points', function (done) {
                    var rule = parser.parse('member has gained tag bob in last 3 days give 1 points');
                    should(rule).eql({
                            rules: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    condition: {
                                        number: null,
                                        type: null,
                                        sub_type: 'gained',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    occurence_filter: null,
                                    period_filter: {
                                        type: 'last',
                                        duration: 3,
                                        durationScope: 'day'
                                    }

                                }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        }
                    );
                    done();
                });

                it('member has gained tag bob exactly 3 times in last 3 days give 1 points', function (done) {
                    var rule = parser.parse('member has gained tag bob exactly 3 times in last 3 days give 1 points');
                    should(rule).eql({
                            rules: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    condition: {
                                        number: null,
                                        type: null,
                                        sub_type: 'gained',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    occurence_filter: {
                                        type: 'exactly',
                                        number: 3
                                    },
                                    period_filter: {
                                        type: 'last',
                                        duration: 3,
                                        durationScope: 'day'
                                    }

                                }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        }
                    );
                    done();
                });

            })
        });

    });


});
