'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;
var otherChoices;
var literalChoices;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Rules smartlist:', function () {
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

        describe('smartlist rule', function () {

            it('member belongs to smartlist ', function () {
                try {
                    parser.parse('member belongs to smartlist');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member belongs to smartlist vip', function () {
                try {
                    parser.parse('member belongs to smartlist vip s');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql(['&','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist vip &', function () {
                try {
                    parser.parse('member belongs to smartlist vip &');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member belongs to smartlist vip & new', function () {
                try {
                    parser.parse('member belongs to smartlist vip & new 3');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql(['&','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist vip & new since', function () {
                try {
                    parser.parse('member belongs to smartlist vip & new since');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member belongs to smartlist vip & new since 3', function () {
                try {
                    parser.parse('member belongs to smartlist vip & new since 3');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(13);
                    should(literalChoices).eql(['day', 'days' , 'hour', 'hours', 'minute', 'minutes', 'month', 'months', 'week', 'weeks','year','years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist vip & new since 3 minute', function () {
                try {
                    parser.parse('member belongs to smartlist vip & new since 3 minute 3');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member do not belongs to smartlist', function () {
                try {
                    parser.parse('member do not belongs to smartlist');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member do not belongs to smartlist vip', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip s');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql(['&','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member do not belongs to smartlist vip &', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip &');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member do not belongs to smartlist vip & new', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip & new 3');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql(['&','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member do not belongs to smartlist vip & new since', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip & new since');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member do not belongs to smartlist vip & new since 3', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip & new since 3');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(13);
                    should(literalChoices).eql(['day', 'days' , 'hour', 'hours', 'minute', 'minutes', 'month', 'months', 'week', 'weeks','year','years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member do not belongs to smartlist vip & new since 3 minute', function () {
                try {
                    parser.parse('member do not belongs to smartlist vip & new since 3 minute 3');
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
