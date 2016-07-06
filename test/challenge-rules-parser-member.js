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
                        query: {
                            type: 'nothing'
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did something give 1 points', function (done) {

                var rule = parser.parse('member did something give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        query: {
                            type: 'something'
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST with jean < 2 & bob = 3 give 1 points', function (done) {

                var rule = parser.parse('member did TEST with jean < 2 & bob = 3 give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        query: {
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
                        negative: true,
                        query: {
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
                            frequency: 3
                        }
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
                        negative: true,
                        query: {
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
                        negative: true,
                        query: {
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
                            frequency: 3
                        },
                        period_filter: {
                            type: 'before',
                            date: [
                                new Date('2016-03-03 04:40:40')
                            ]
                        }
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('member did not TEST in zone montreal', function () {
                var rule = parser.parse('member did not TEST in zone montreal give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'zone',
                            zoneCodes: ['montreal']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST in zone montreal,laval,levis', function () {
                var rule = parser.parse('member did not TEST in zone montreal,laval,levis give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'zone',
                            zoneCodes: ['montreal', 'laval', 'levis']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST in range of beacon shop', function () {
                var rule = parser.parse('member did not TEST in range of beacon shop give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beaconCodes: ['shop']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST in range of beacon shop,store,retail', function () {

                var rule = parser.parse('member did not TEST in range of beacon shop,retail,store give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beaconCodes: ['shop', 'retail', 'store']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST with RSSI over 3 from beacon shop', function () {
                var rule = parser.parse('member did not TEST with RSSI over 3 from beacon shop give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-over',
                            rssiValue: 3,
                            beaconCodes: ['shop']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST with RSSI below 5 from beacon shop,store', function () {
                var rule = parser.parse('member did not TEST with RSSI below 5 from beacon shop,store give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-below',
                            rssiValue: 5,
                            beaconCodes: ['shop', 'store']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST with RSSI between 3 and 10 from beacon shop,store', function () {
                var rule = parser.parse('member did not TEST with RSSI between 3 and 10 from beacon shop,store give 1 points');
                should(rule).eql({
                    rules: [{
                        scope: 'member',
                        type: 'did',
                        negative: true,
                        query: {
                            actionCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-between',
                            rssiValue: [3, 10],
                            beaconCodes: ['shop', 'store']
                        }

                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
            });

            it('member did not TEST at least 4 times on monday', function () {
                var rule = parser.parse('member did not TEST at least 4 times on monday give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {actionCode: 'TEST'},
                            moment_filter: {days: {list: ['monday'], type: 'days'}, type: 'on'},
                            negative: true,
                            occurrence_filter: {frequency: 4, type: 'least'},
                            scope: 'member',
                            type: 'did'
                        }
                    ]
                });
            });

            it('member did not TEST less than 4 times on the 1st,2nd day of december before 12:59 pm', function () {
                var rule = parser.parse('member did not TEST less than 4 times on the 1st,2nd day of december before 12:59 pm give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {actionCode: 'TEST'},
                            moment_filter: {
                                days: {list: ['1st', '2nd'], type: 'position'},
                                months: {list: ['december'], type: 'of'},
                                time: {list: ['24:59'], type: 'before'},
                                type: 'onThe'
                            },
                            negative: true,
                            occurrence_filter: {frequency: 4, type: 'less'},
                            scope: 'member',
                            type: 'did'
                        }
                    ]
                });
            });

            it('member did not TEST exactly 4 times on 2016-04-04,2017-04-04,2018-04-04', function () {
                var rule = parser.parse('member did not TEST exactly 4 times on 2016-04-04,2017-04-04,2018-04-04 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {actionCode: 'TEST'},
                            moment_filter: {
                                date: [new Date(2016, 4 - 1, 4), new Date(2017, 4 - 1, 4), new Date(2018, 4 - 1, 4)],
                                type: 'onDate'
                            },
                            negative: true,
                            occurrence_filter: {frequency: 4, type: 'exactly'},
                            scope: 'member',
                            type: 'did'
                        }
                    ]
                });
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
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            }

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
                            negative: true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                    done();
                });

                it('member has not completed TEST in zone bob give 1 points', function (done) {

                    var rule = parser.parse('member has not completed TEST in zone bob give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['bob']
                            }

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
                            negative: true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            occurrence_filter: {
                                type: 'less',
                                frequency: 3
                            }
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
                            negative: true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            }
                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                    done();
                });

                it('member has not completed TEST less than 3 times in zone bob before 2016-03-03T04:40:40 give 1 points', function (done) {

                    var rule = parser.parse('member has not completed TEST less than 3 times in zone bob before 2016-03-03T04:40:40 give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'completed',
                                challengeCode: 'TEST'
                            },
                            occurrence_filter: {
                                type: 'less',
                                frequency: 3
                            },
                            period_filter: {
                                type: 'before',
                                date: [
                                    new Date('2016-03-03 04:40:40')
                                ]
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['bob']
                            }
                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                    done();
                });

            });

            describe('gained/lost', function () {

                describe('tag', function () {

                    it('member has gained tag bob give 1 points', function (done) {
                        var rule = parser.parse('member has gained tag bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    type: 'gained',
                                    tagCode: {
                                        tagClusterCode: null,
                                        tagCode: 'bob'
                                    }

                                }

                            }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        });
                        done();
                    });

                    it('member has lost 3 tag bob give 1 points', function (done) {
                        var rule = parser.parse('member has lost 3 tag bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    quantity: 3,
                                    type: 'lost',
                                    tagCode: {
                                        tagClusterCode: null,
                                        tagCode: 'bob'
                                    }
                                }

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
                                        negative: true,
                                        query: {
                                            quantity: 3,
                                            type: 'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        }

                                    }],
                                rewards: [
                                    {quantity: 1, code: 'points'}
                                ]
                            }
                        );
                        done();
                    });

                    it('member has not lost tag bob give 1 points', function (done) {
                        var rule = parser.parse('member has not lost tag bob give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative: true,
                                        query: {
                                            type: 'lost',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
                                        }

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
                                        query: {
                                            type: 'gained',
                                            tagCode: {
                                                tagClusterCode: null,
                                                tagCode: 'bob'
                                            }
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

                });

                describe('points', function () {
                    it('member has gained points bob give 1 points', function (done) {
                        var rule = parser.parse('member has gained points bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    type: 'gained',
                                    levelCode: 'bob'

                                }

                            }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        });
                        done();
                    });

                    it('member has lost 3 points bob give 1 points', function (done) {
                        var rule = parser.parse('member has lost 3 points bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    quantity: 3,
                                    type: 'lost',
                                    levelCode: 'bob'
                                }
                            }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        });
                        done();
                    });

                    it('member has not gained 3 points bob give 1 points', function (done) {
                        var rule = parser.parse('member has not gained 3 points bob give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative: true,
                                        query: {
                                            quantity: 3,
                                            type: 'gained',
                                            levelCode: 'bob'
                                        }

                                    }],
                                rewards: [
                                    {quantity: 1, code: 'points'}
                                ]
                            }
                        );
                        done();
                    });

                    it('member has not lost points bob give 1 points', function (done) {
                        var rule = parser.parse('member has not lost points bob give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative: true,
                                        query: {
                                            type: 'lost',
                                            levelCode: 'bob'

                                        }

                                    }],
                                rewards: [
                                    {quantity: 1, code: 'points'}
                                ]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob in last 3 days give 1 points', function (done) {
                        var rule = parser.parse('member has gained points bob in last 3 days give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        query: {
                                            type: 'gained',
                                            levelCode: 'bob'
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
                });

                describe('prize', function () {
                    it('member has gained prize bob give 1 points', function (done) {
                        var rule = parser.parse('member has gained prize bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    type: 'gained',
                                    prizeCode: 'bob'

                                }

                            }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        });
                        done();
                    });

                    it('member has lost 3 prize bob give 1 points', function (done) {
                        var rule = parser.parse('member has lost 3 prize bob give 1 points');
                        should(rule).eql({
                            rules: [{
                                scope: 'member',
                                type: 'has',
                                query: {
                                    quantity: 3,
                                    type: 'lost',
                                    prizeCode: 'bob'
                                }
                            }],
                            rewards: [
                                {quantity: 1, code: 'points'}
                            ]
                        });
                        done();
                    });

                    it('member has not gained 3 prize bob give 1 points', function (done) {
                        var rule = parser.parse('member has not gained 3 prize bob give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative: true,
                                        query: {
                                            quantity: 3,
                                            type: 'gained',
                                            prizeCode: 'bob'
                                        }

                                    }],
                                rewards: [
                                    {quantity: 1, code: 'points'}
                                ]
                            }
                        );
                        done();
                    });

                    it('member has not lost points bob give 1 points', function (done) {
                        var rule = parser.parse('member has not lost prize bob give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        negative: true,
                                        query: {
                                            type: 'lost',
                                            prizeCode: 'bob'
                                        }

                                    }],
                                rewards: [
                                    {quantity: 1, code: 'points'}
                                ]
                            }
                        );
                        done();
                    });

                    it('member has gained points bob in last 3 days give 1 points', function (done) {
                        var rule = parser.parse('member has gained prize bob in last 3 days give 1 points');
                        should(rule).eql({
                                rules: [
                                    {
                                        scope: 'member',
                                        type: 'has',
                                        query: {
                                            type: 'gained',
                                            prizeCode: 'bob'
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

            describe('been', function () {

                it('member has been in zone montreal', function () {
                    var rule = parser.parse('member has been in zone montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been in zone montreal', function () {
                    var rule = parser.parse('member has not been in zone montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been in zone montreal,laval,verdun', function () {
                    var rule = parser.parse('member has been in zone montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been in zone montreal,laval,verdun', function () {
                    var rule = parser.parse('member has not been in zone montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been in range of beacon montreal', function () {
                    var rule = parser.parse('member has been in range of beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been in range of beacon montreal', function () {
                    var rule = parser.parse('member has not been in range of beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been in range of beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has been in range of beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been in range of beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has not been in range of beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI over 3 from beacon montreal', function () {
                    var rule = parser.parse('member has been with RSSI over 3 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-over',
                                rssiValue: 3,
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI over 3 from beacon montreal', function () {
                    var rule = parser.parse('member has not been with RSSI over 3 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-over',
                                rssiValue: 3,
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI over 3 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has been with RSSI over 3 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-over',
                                rssiValue: 3,
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI over 3 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has not been with RSSI over 3 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-over',
                                rssiValue: 3,
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI below 3 from beacon montreal', function () {
                    var rule = parser.parse('member has been with RSSI below 3 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-below',
                                rssiValue: 3,
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI below 3 from beacon montreal', function () {
                    var rule = parser.parse('member has not been with RSSI below 3 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-below',
                                rssiValue: 3,
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI below 3 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has been with RSSI below 3 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-below',
                                rssiValue: 3,
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI below 3 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has not been with RSSI below 3 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-below',
                                rssiValue: 3,
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI between 3 and 4 from beacon montreal', function () {
                    var rule = parser.parse('member has been with RSSI between 3 and 4 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-between',
                                rssiValue: [3, 4],
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI between 3 and 4 from beacon montreal', function () {
                    var rule = parser.parse('member has not been with RSSI between 3 and 4 from beacon montreal give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-between',
                                rssiValue: [3, 4],
                                beaconCodes: ['montreal']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has been with RSSI between 3 and 4 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has been with RSSI between 3 and 4 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-between',
                                rssiValue: [3, 4],
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });

                it('member has not been with RSSI between 3 and 4 from beacon montreal,laval,verdun', function () {
                    var rule = parser.parse('member has not been with RSSI between 3 and 4 from beacon montreal,laval,verdun give 1 points');
                    should(rule).eql({
                        rules: [{
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'been'
                            },
                            geo_filter: {
                                type: 'RSSI-between',
                                rssiValue: [3, 4],
                                beaconCodes: ['montreal', 'laval', 'verdun']
                            }

                        }],
                        rewards: [
                            {quantity: 1, code: 'points'}
                        ]
                    });
                });


            });
        });

    });


});
