'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;
var otherChoices;
var literalChoices;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Rules with/without:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        it('Empty string', function (done) {

            try {
                parser.parse("");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                should(err.expected.length).equal(3);
                should(literalChoices).eql(['every', 'member', 'on']);
            }

            done();
        });
        
        it('member', function () {
            try {
                parser.parse("member");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                should(err.expected.length).equal(13);
                should(literalChoices).eql([
                    'belongs to smartlist',
                    'city',
                    'country',
                    'created',
                    'did',
                    'do not belongs to smartlist',
                    'has',
                    'is',
                    'state',
                    'with',
                    'without',
                    'zip'
                ]);
            }
        });

        describe('with/without rule', function () {

            it('member with ', function () {
                try {
                    parser.parse('member with');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql(['points', 'prize', 'tag']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member without', function () {
                try {
                    parser.parse('member without');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql(['points', 'prize', 'tag']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            describe('tag', function () {
                it('member with tag', function () {
                    try {
                        parser.parse('member with tag');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['tagCode', 'whitespace']);
                    }
                });

                it('member with tag bob', function () {
                    try {
                        parser.parse('member with tag bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(8);
                        should(literalChoices).eql(['<', '<=', '=', '>', '>=', 'and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('member with tag bob >=', function () {
                    try {
                        parser.parse('member with tag bob >=');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['number', 'whitespace']);
                    }
                });

                it('member with tag bob >= 4', function () {
                    try {
                        parser.parse('member with tag bob >= 4');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
            });

            describe('points', function () {
                it('member with points', function () {
                    try {
                        parser.parse('member with points');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['levelCode', 'whitespace']);
                    }
                });

                it('member with points bob', function () {
                    try {
                        parser.parse('member with points bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(6);
                        should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('member with points bob >=', function () {
                    try {
                        parser.parse('member with points bob >=');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['number', 'whitespace']);
                    }
                });

                it('member with points bob >= 4', function () {
                    try {
                        parser.parse('member with points bob >= 4');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
            });

            describe('prize', function () {

                it('member with prize', function () {
                    try {
                        parser.parse('member with prize');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['prizeCode', 'whitespace']);
                    }
                });

                it('member with prize bob', function () {
                    try {
                        parser.parse('member with prize bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
            });

        });

    });
});
