'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions has complted:', function () {
        var literalChoices;
        var otherChoices;
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        describe('completed', function () {

            it('member has', function () {
                try {
                    parser.parse('member has');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(6);
                    should(literalChoices).eql(['been', 'completed', 'gained', 'lost', 'not']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has completed', function () {
                try {
                    parser.parse('member has completed');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['challengeCode', 'whitespace']);
                }
            });

            it('member has completed challengeCode', function () {
                try {
                    parser.parse('member has completed bob 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql(['after', 'and', 'at', 'before', 'between', 'exactly', 'in', 'less', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not', function () {
                try {
                    parser.parse('member has not');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['been', 'completed', 'gained', 'lost']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not completed', function () {
                try {
                    parser.parse('member has not completed');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['challengeCode', 'whitespace']);
                }
            });

            it('member has not completed challengeCode', function () {
                try {
                    parser.parse('member has not completed bob 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(11);
                    should(literalChoices).eql(['after', 'and', 'at', 'before', 'between', 'exactly', 'in', 'less', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });
        });


    });
});