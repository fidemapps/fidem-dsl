'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('List Member Conditions:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member tag/level/points conditions', function () {

            it('member tag TAG_CODE >= 10', function (done) {
                var condition = parser.parse("member tag TAG_CODE >= 10");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'tag',
                            code: 'TAG_CODE',
                            operator: '>=',
                            value: 10
                        }
                    ]
                });
                done();
            });

            it('member level LEVEL_CODE > 4', function (done) {
                var condition = parser.parse("member level LEVEL_CODE > 4");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'level',
                            code: 'LEVEL_CODE',
                            operator: '>',
                            value: 4
                        }
                    ]
                });
                done();
            });

            it('member points LEVEL_CODE < 100', function (done) {
                var condition = parser.parse("member points LEVEL_CODE < 100");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'points',
                            code: 'LEVEL_CODE',
                            operator: '<',
                            value: 100
                        }
                    ]
                });
                done();
            });
        });

        describe('Should parse member in zone conditions', function () {

            it('member in zone CODE1', function (done) {
                var condition = parser.parse("member in zone CODE1");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'zone',
                            codes: ['CODE1']
                        }
                    ]
                });
                done();
            });

            it('member in zone CODE1,CODE2', function (done) {
                var condition = parser.parse("member in zone CODE1,CODE2");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'zone',
                            codes: ['CODE1', 'CODE2']
                        }
                    ]
                });
                done();
            });

            /*
             it('member in zone CODE1 for 3 hours', function (done) {
             var condition = parser.parse("member in zone CODE1 for 3 hours");
             should(condition).eql({
             conditions: [
             {
             scope: 'member',
             sub_scope: 'zone',
             codes: ['CODE1'],
             duration: 3,
             timeframe: 'hour'
             }
             ],
             filter: null
             });
             done();
             });

             it('member in zone CODE1,CODE2 for 5 minutes', function (done) {
             var condition = parser.parse("member in zone CODE1,CODE2 for 5 minutes");
             should(condition).eql({
             conditions: [
             {
             scope: 'member',
             sub_scope: 'zone',
             codes: ['CODE1', 'CODE2'],
             duration: 5,
             timeframe: 'minute'
             }
             ],
             filter: null
             });
             done();
             });
             */
        });

        describe('Should parse member created conditions', function () {

            it('member created last 1 week', function (done) {
                var condition = parser.parse("member created last 1 week");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'created',
                            condition: 'last',
                            quantity: 1,
                            timeframe: 'week'
                        }
                    ]
                });
                done();
            });

            it('member created between "2014-01-01" "2015-01-01"', function (done) {
                var condition = parser.parse('member created between 2014-01-01 2015-01-01');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'created',
                            condition: 'between',
                            date1: "2014-01-01",
                            date2: "2015-01-01"
                        }
                    ]
                });
                done();
            });
        });

        describe('Should parse member city/state/country/zip conditions', function () {

            it('member city = "test"', function (done) {
                var condition = parser.parse('member city = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'city',
                            operator: '=',
                            value: 'test'
                        }
                    ]
                });
                done();
            });

            it('member state = "test"', function (done) {
                var condition = parser.parse('member state = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'state',
                            operator: '=',
                            value: 'test'
                        }
                    ]
                });
                done();
            });

            it('member country = "test"', function (done) {
                var condition = parser.parse('member country = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'country',
                            operator: '=',
                            value: 'test'
                        }
                    ]
                });
                done();
            });

            it('member zip = "test"', function (done) {
                var condition = parser.parse('member zip = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'member',
                            sub_scope: 'zip',
                            operator: '=',
                            value: 'test'
                        }
                    ]
                });
                done();
            });
        });

        describe('Should parse member belongs to smartlist conditions', function () {
            it('Single smartlist: member belongs to smartlist X', function (done) {
                var rule = parser.parse("member belongs to smartlist 123");
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'smartlist',
                            codes: ['123']
                        }
                    ]
                });

                done();
            });

            it('Multiple smartlists: member belongs to smartlist X,Y,Z', function (done) {
                var rule = parser.parse("member belongs to smartlist 123,456,789");
                should(rule).eql({
                    conditions: [
                        {
                            scope: 'smartlist',
                            codes: ['123', '456', '789']
                        }
                    ]
                });

                done();
            });
        });

        describe('Should parse action code conditions', function () {

            it('action ACTION_CODE', function (done) {
                var condition = parser.parse("action ACTION_CODE");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'action',
                            code: 'ACTION_CODE',
                            conditions: [],
                            filters: []
                        }
                    ]
                });
                done();
            });

            it('action ACTION_CODE in zone CODE1', function (done) {
                var condition = parser.parse("action ACTION_CODE in zone CODE1");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'action',
                            code: 'ACTION_CODE',
                            conditions: [],
                            filters: [{
                                "type": "zone",
                                "zones": ["CODE1"]
                            }]
                        }
                    ]
                });
                done();
            });

            it('action ACTION_CODE in zone CODE1,CODE2', function (done) {
                var condition = parser.parse("action ACTION_CODE in zone CODE1,CODE2");
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'action',
                            code: 'ACTION_CODE',
                            conditions: [],
                            filters: [{
                                "type": "zone",
                                "zones": ["CODE1", "CODE2"]
                            }]
                        }
                    ]
                });
                done();
            });

            it('action ACTION_CODE with test = "value"', function (done) {
                var condition = parser.parse('action ACTION_CODE with test = "value"');
                should(condition).eql({
                    conditions: [{
                        scope: 'action',
                        code: 'ACTION_CODE',
                        conditions: [
                            {
                                name: 'test',
                                operator: '=',
                                value: 'value'
                            }
                        ],
                        filters: []
                    }
                    ]
                });
                done();
            });

            it("action ACTION_CODE with test = 'value'", function (done) {
                var condition = "";
                try {
                    condition = parser.parse("action ACTION_CODE with test = 'value'");
                }
                catch (err) {
                    console.log(err);
                }

                should(condition).eql({
                    conditions: [{
                        scope: 'action',
                        code: 'ACTION_CODE',
                        conditions: [
                            {
                                name: 'test',
                                operator: '=',
                                value: 'value'
                            }
                        ],
                        filters: []
                    }
                    ]
                });
                done();
            });

            it('action ACTION_CODE with test = "value" and test2 < 3', function (done) {
                var condition = parser.parse('action ACTION_CODE with test = "value" and test2 < 3');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'action',
                            code: 'ACTION_CODE',
                            conditions: [
                                {
                                    name: 'test',
                                    operator: '=',
                                    value: 'value'
                                },
                                {
                                    name: 'test2',
                                    operator: '<',
                                    value: 3
                                }
                            ],
                            filters: []
                        }
                    ]
                });
                done();
            });
        });
    });
});
