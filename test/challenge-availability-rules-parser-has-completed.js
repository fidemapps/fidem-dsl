'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Member conditions Rules completed:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('has completed', function () {

            it('member has completed TEST ', function (done) {

                var rule = parser.parse('member has completed TEST ');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
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
                    negative: true,
                    condition: {
                        type: 'completed',
                        challengeCode: 'TEST'
                    }

                }]);
                done();
            });

            it('member has not completed TEST less than 3 times', function (done) {

                var rule = parser.parse('member has not completed TEST less than 3 times');
                should(rule).eql([{
                    scope: 'member',
                    type: 'has',
                    negative: true,
                    condition: {
                        type: 'completed',
                        challengeCode: 'TEST'
                    },
                    occurrence_filter: {
                        type: 'less',
                        frequency: 3
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
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
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
                        negative: true,
                        condition: {
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
                        }
                    }]);
                done();
            });

            it('member has not completed TEST in zone montreal', function () {
                var rule = parser.parse('member has not completed TEST in zone montreal');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'zone',
                            zones: ['montreal']
                        }

                    }
                ]);
            });

            it('member has not completed TEST in zone montreal,laval,levis', function () {
                var rule = parser.parse('member has not completed TEST in zone montreal,laval,levis');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'zone',
                            zones: ['montreal', 'laval', 'levis']
                        }

                    }
                ]);
            });

            it('member has not completed TEST in range of beacon shop', function () {
                var rule = parser.parse('member has not completed TEST in range of beacon shop');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beacons: ['shop']
                        }

                    }
                ]);
            });

            it('member has not completed TEST in range of beacon shop,store,retail', function () {
                var rule = parser.parse('member has not completed TEST in range of beacon shop,store,retail');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beacons: ['shop', 'store', 'retail']
                        }

                    }
                ]);
            });

            it('member has not completed TEST with RSSI over 3 from beacon shop', function () {
                var rule = parser.parse('member has not completed TEST with RSSI over 3 from beacon shop');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-over',
                            rssiValue: 3,
                            beacons: ['shop']
                        }

                    }
                ]);
            });

            it('member has not completed TEST with RSSI below 5 from beacon shop,store', function () {
                var rule = parser.parse('member has not completed TEST with RSSI below 5 from beacon shop,store');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-below',
                            rssiValue: 5,
                            beacons: ['shop', 'store']
                        }

                    }
                ]);
            });

            it('member has not completed TEST with RSSI between 5 and 3 from beacon shop,store', function () {
                var rule = parser.parse('member has not completed TEST with RSSI between 5 and 3 from beacon shop,store');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        geo_filter: {
                            type: 'RSSI-between',
                            rssiValue: [5, 3],
                            beacons: ['shop', 'store']
                        }

                    }
                ]);
            });

            it('member has not completed TEST at least 4 times on monday', function () {
                var rule = parser.parse('member has not completed TEST at least 4 times on monday');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        occurrence_filter: {frequency: 4, type: 'least'},
                        moment_filter: {
                            days: {list: ['monday'], type: 'days'},
                            type: 'on'
                        }

                    }
                ]);
            });

            it('member has not completed TEST at least 4 times on the 1st,2nd day of december before 12:59 pm', function () {
                var rule = parser.parse('member has not completed TEST at least 4 times on the 1st,2nd day of december before 12:59 pm');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        occurrence_filter: {frequency: 4, type: 'least'},
                        moment_filter: {
                            days: {list: ['1st', '2nd'], type: 'position'},
                            months: {list: ['december'], type: 'of'},
                            time: {list: ['24:59'], type: 'before'},
                            type: 'onThe'
                        }

                    }
                ]);
            });

            it('member has not completed TEST at least 4 times on 2016-04-04,2017-04-04,2018-04-04', function () {
                var rule = parser.parse('member has not completed TEST at least 4 times on 2016-04-04,2017-04-04,2018-04-04');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        condition: {
                            type: 'completed',
                            challengeCode: 'TEST'
                        },
                        occurrence_filter: {frequency: 4, type: 'least'},
                        moment_filter: {
                            date: [
                                new Date(2016, 4 - 1, 4),
                                new Date(2017, 4 - 1, 4),
                                new Date(2018, 4 - 1, 4)
                            ],
                            type: 'onDate'
                        }


                    }
                ]);
            });

        });

    });

});