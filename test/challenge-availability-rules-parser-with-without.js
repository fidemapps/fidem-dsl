'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Rules with/without:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('with/without rule', function () {

            describe('tag', function () {

                it('should parse simple rule with tag', function () {
                    var rule = parser.parse('member with tag tagcode');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        query: {
                            tagCode: {tagClusterCode: null, tagCode: 'tagcode'}
                        }
                    }]);
                });

                it('should parse simple rule with tag and condition', function () {
                    var rule = parser.parse('member with tag tagcode > 4');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        query: {
                            tagCode: {
                                tagClusterCode: null,
                                tagCode: 'tagcode'
                            },
                            operator: ">",
                            value: 4
                        }
                    }]);
                });

                it('should parse simple rule without tag', function () {
                    var rule = parser.parse('member without tag tagcode');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        negative: true,
                        query: {
                            tagCode: {
                                tagClusterCode: null,
                                tagCode: 'tagcode'
                            }
                        }
                    }]);
                });

                it('should parse simple rule without tag and condition', function () {
                    var rule = parser.parse('member without tag tagcode > 4');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        negative: true,
                        query: {
                            tagCode: {
                                tagClusterCode: null,
                                tagCode: 'tagcode'
                            },
                            operator: ">",
                            value: 4
                        }
                    }]);
                });

            });

            describe('point', function () {

                it('should parse simple rule with points', function () {
                    var rule = parser.parse('member with points levelCode >= 3');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        query: {
                            levelCode: "levelCode",
                            operator: '>=',
                            value: 3
                        }
                    }]);
                });

                it('should parse simple rule without points', function () {
                    var rule = parser.parse('member without points levelCode >= 3');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        negative: true,
                        query: {
                            levelCode: "levelCode",
                            operator: '>=',
                            value: 3
                        }
                    }]);
                });

            });

            describe('prize', function () {

                it('should parse simple rule with prize', function () {
                    var rule = parser.parse('member with prize coupon');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        query: {
                            prizeCode: 'coupon'

                        }
                    }]);
                });

                it('should parse simple rule without prize', function () {
                    var rule = parser.parse('member without prize coupon');
                    should(rule).eql([{
                        scope: 'member',
                        type: 'with',
                        negative: true,
                        query: {
                            prizeCode: 'coupon'

                        }
                    }]);
                });

            });

        });

    });
});
