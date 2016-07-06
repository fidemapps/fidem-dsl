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

        describe('created rule', function () {

            it('should parse simple created rule with in last give 1 points', function () {

                var rule = parser.parse('member created in last 3 days give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {duration: 3, durationScope: 'day', type: 'last'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });

            });

            it('should parse simple created rule with before', function () {

                var rule = parser.parse('member created before 2016-10-10T11:11:11 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'before', date: [new Date(2016, 10 - 1, 10, 11, 11, 11)]},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });


            });

            it('should parse simple created rule with between', function () {

                var rule = parser.parse('member created between 2016-10-10T11:11:11 and 2017-10-10T11:11:11 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {
                                type: 'between',
                                date: [new Date(2016, 10 - 1, 10, 11, 11, 11), new Date(2017, 10 - 1, 10, 11, 11, 11)]
                            },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });

            });

            it('should parse simple created rule with after', function () {

                var rule = parser.parse('member created after 2016-10-10T11:11:11 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'after', date: [new Date(2016, 10 - 1, 10, 11, 11, 11)]},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });

            });

            it('should parse simple created rule with since did', function () {
                var rule = parser.parse('member created since did actionCode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'since-did', actionCode: 'actionCode'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });

                var rule = parser.parse('member created since did first actionCode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'since-did', position: 'first', actionCode: 'actionCode'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });

                var rule = parser.parse('member created since did last actionCode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'since-did', position: 'last', actionCode: 'actionCode'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('should parse simple created rule with since received', function () {
                var rule = parser.parse('member created since received prize prizeCode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            period_filter: {type: 'since-received', target: 'prize', prizeCode: 'prizeCode'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('should parse simple created rule with since received on monday', function () {
                var rule = parser.parse('member created since received prize prizeCode on monday give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            moment_filter: {type: 'on', days: {list: ['monday'], type: 'days'}},
                            period_filter: {type: 'since-received', target: 'prize', prizeCode: 'prizeCode'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('should parse simple created rule with since received on monday of march in 2016 after 10:00 pm', function () {
                var rule = parser.parse('member created since received prize prizeCode on monday of march in 2016 after 10:00 pm give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            moment_filter: {
                                days: {list: ['monday'], type: 'days'},
                                months: {list: ['march'], type: 'of'},
                                time: {list: ['22:00'], type: 'after'},
                                type: 'on',
                                years: {list: ['2016'], type: 'in'}
                            },
                            period_filter: {prizeCode: 'prizeCode', target: 'prize', type: 'since-received'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('should parse simple created rule with since received on the 1st day of month  before 10:00 am', function () {
                var rule = parser.parse('member created since received prize prizeCode on the 1st day of month  before 10:00 am give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            moment_filter: {
                                days: {list: ['1st'], type: 'position'},
                                months: {list: ['month'], type: 'month'},
                                time: {list: ['10:00'], type: 'before'},
                                type: 'onThe'
                            },
                            period_filter: {prizeCode: 'prizeCode', target: 'prize', type: 'since-received'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('should parse simple created rule with since received on 2016-04-05 between 5:00 am and 10:00 am', function () {
                var rule = parser.parse('member created since received prize prizeCode on 2016-04-05  between 5:00 am and 10:00 am give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            moment_filter: {
                                date: [new Date(2016, 4 - 1, 5)],
                                time: {list: ['5:00', '10:00'], type: 'between'},
                                type: 'onDate'
                            },
                            period_filter: {prizeCode: 'prizeCode', target: 'prize', type: 'since-received'},
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

        });

//TODO:add moment filter
        describe('city rule', function () {

            it('should parse simple city rule with =', function () {
                var rule = parser.parse('member city = "montreal" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '=', value: 'montreal'},
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
            });

            it('should parse simple city rule with !=', function () {
                var rule = parser.parse('member city != "montreal" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '!=', value: 'montreal'},
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
            });

        });

        describe('state rule', function () {

            it('should parse simple state rule with =', function () {
                var rule = parser.parse('member state = "quebec" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '=', value: 'quebec'},
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
            });

            it('should parse simple state rule with !=', function () {
                var rule = parser.parse('member state != "quebec" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '!=', value: 'quebec'},
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
            });

        });

        describe('zip rule', function () {

            it('should parse simple state rule with =', function () {
                var rule = parser.parse('member zip = "h7v2v2" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '=', value: 'h7v2v2'},
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
            });

            it('should parse simple state rule with !=', function () {
                var rule = parser.parse('member zip != "h7v2v2" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '!=', value: 'h7v2v2'},
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
            });

        });

        describe('country rule', function () {

            it('should parse simple state rule with =', function () {
                var rule = parser.parse('member country = "canada" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '=', value: 'canada'},
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
            });

            it('should parse simple state rule with !=', function () {
                var rule = parser.parse('member country != "canada" give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {operator: '!=', value: 'canada'},
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
            });

        });


        describe('is rule', function () {

            it('should parse simple is rule with in zone', function () {
                var rule = parser.parse('member is in zone montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with  multiple in zone ,', function () {
                var rule = parser.parse('member is in zone montreal,laval give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'zone',
                                zoneCodes: ['montreal', 'laval']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with in range of beacon', function () {
                var rule = parser.parse('member is in range of beacon montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with multiple in range of beacon ,', function () {
                var rule = parser.parse('member is in range of beacon montreal,laval,store,shop give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'inRange',
                                beaconCodes: ['montreal', 'laval', 'store', 'shop']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with with RSSI below', function () {
                var rule = parser.parse('member is with RSSI below 3 from beacon montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'RSSI-below',
                                rssiValue: 3,
                                beaconCodes: ['montreal']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with with RSSI over', function () {
                var rule = parser.parse('member is with RSSI over 3 from beacon montreal,laval give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'RSSI-over',
                                rssiValue: 3,
                                beaconCodes: ['montreal', 'laval']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('should parse simple is rule with with RSSI between', function () {
                var rule = parser.parse('member is with RSSI between 3 and 4 from beacon montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            geo_filter: {
                                type: 'RSSI-between',
                                rssiValue: [3, 4],
                                beaconCodes: ['montreal']
                            },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });


        });


        describe('smartlist rule', function () {

            it('should parse simple belongs to smartlist rule', function () {
                var rule = parser.parse('member belongs to smartlist montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {smartlistCodes: ['montreal']},
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });

            it('should parse simple belongs to smartlist rule with multiple code', function () {
                var rule = parser.parse('member belongs to smartlist montreal & quebec & bob give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {smartlistCodes: ['montreal', 'quebec', 'bob']},
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });

            it('should parse complexe belongs to smartlist rule', function () {
                var rule = parser.parse('member belongs to smartlist montreal&bob since 4 hours give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {
                                condition: {duration: 4, durationScope: 'hour', type: 'since'},
                                smartlistCodes: ['montreal', 'bob']
                            },
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });

            it('should parse simple do not belongs to smartlist rule', function () {

                var rule = parser.parse('member do not belongs to smartlist montreal give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {smartlistCodes: ['montreal']},
                            negative: true,
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });

            it('should parse simple do not belongs to smartlist rule with multiple code', function () {
                var rule = parser.parse('member do not belongs to smartlist montreal&quebec&bob give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            negative: true,
                            query: {smartlistCodes: ['montreal', 'quebec', 'bob']},
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });

            it('should parse complexe do not belongs to smartlist rule', function () {
                var rule = parser.parse('member do not belongs to smartlist montreal&bob since 4 hours give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            negative: true,
                            query: {
                                condition: {duration: 4, durationScope: 'hour', type: 'since'},
                                smartlistCodes: ['montreal', 'bob']
                            },
                            scope: 'member',
                            type: 'smartlist'
                        }
                    ]
                });
            });


        });

        describe('with/without rule', function () {

            it('should parse simple rule with tag', function () {
                var rule = parser.parse('member with tag tagcode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {tagCode: {tagClusterCode: null, tagCode: 'tagcode'}},
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });
            });

            it('should parse simple rule with tag and condition', function () {
                var rule = parser.parse('member with tag tagcode > 4 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'tagcode'
                                },
                                operator: ">",
                                value: 4
                            },
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });

            });

            it('should parse simple rule without tag', function () {
                var rule = parser.parse('member without tag tagcode give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {tagCode: {tagClusterCode: null, tagCode: 'tagcode'}},
                            scope: 'member',
                            type: 'with',
                            negative:true
                        }
                    ]
                });
            });

            it('should parse simple rule without tag and condition', function () {
                var rule = parser.parse('member without tag tagcode > 4 give 1 points');
                should(rule).eql({
                    rewards: [{code: 'points', quantity: 1}],
                    rules: [
                        {
                            query: {
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'tagcode'
                                },
                                operator: ">",
                                value: 4
                            },
                            negative:true,
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });
            });

            it('should parse simple rule with points', function () {
                var rule = parser.parse('member with points levelCode >= 3 give 1 points');
                should(rule).eql({
                    rewards: [ { code: 'points', quantity: 1 } ],
                    rules: [
                        {
                            query: { levelCode: 'levelCode', operator: '>=', value: 3 },
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });
            });

            it('should parse simple rule without points', function () {
                var rule = parser.parse('member without points levelCode >= 3 give 1 points');
                should(rule).eql({
                    rewards: [ { code: 'points', quantity: 1 } ],
                    rules: [
                        {
                            query: { levelCode: 'levelCode', operator: '>=', value: 3 },
                            negative: true,
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });
            });

            it('should parse simple rule with prize', function () {
                var rule = parser.parse('member with prize coupon give 1 points');
                should(rule).eql({
                    rewards: [ { code: 'points', quantity: 1 } ],
                    rules: [
                        {
                            query: { prizeCode: 'coupon' },
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                } );
            });

            it('should parse simple rule without prize', function () {
                var rule = parser.parse('member without prize coupon give 1 bananaPopsicle');
                should(rule).eql({
                    rewards: [ { code: 'bananaPopsicle', quantity: 1 } ],
                    rules: [
                        {
                            query: { prizeCode: 'coupon' },
                            negative: true,
                            scope: 'member',
                            type: 'with'
                        }
                    ]
                });
            });

        });
    });
});
