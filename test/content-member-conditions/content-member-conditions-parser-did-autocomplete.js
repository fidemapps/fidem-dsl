'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions did:', function () {
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

        it('should auto-complete when nothing',function(){
            try {
                parser.parse('');
            } catch (error) {
                literalChoices = helper.extractLiterals(error);
                otherChoices = helper.extractOthers(error);

                should(error.expected.length).equal(1);
                should(literalChoices).eql(['member']);
                should(otherChoices).eql([]);
            }
        });

        it('should auto-complete when member',function(){
            try {
                parser.parse('member');
            } catch (error) {
                literalChoices = helper.extractLiterals(error);
                otherChoices = helper.extractOthers(error);

                should(error.expected.length).equal(10);
                should(literalChoices).eql(['belongs to smartlist', 'created', 'did', 'does not belong to smartlist', 'has', 'is', 'lives', 'with', 'without']);
                should(otherChoices).eql(['whitespace']);
            }
        });

        describe('did', function () {


            it('member did', function () {
                try {
                    parser.parse('member did');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['not', 'nothing', 'something']);
                    should(otherChoices).eql(['actionCode', 'whitespace']);
                }
            });

            it('member did not', function () {
                //This happen because the parser don't know yet that the word 'not' is a token and not an actionCode
                try {
                    parser.parse('member did not');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(12);
                    should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'exactly', 'give', 'in last', 'less than', 'with']);
                    should(otherChoices).eql(['actionCode', 'whitespace']);
                }
            });

            it('member did actionCode', function () {
                try {
                    parser.parse('member did eat d');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(15);
                    should(literalChoices).eql([
                        'after',
                        'and',
                        'at least',
                        'before',
                        'between',
                        'exactly',
                        'in last',
                        'in range of',
                        'in zone',
                        'less than',
                        'since',
                        'with RSSI',
                        'with']);

                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did actionCode with', function () {
                try {
                    parser.parse('member did eat with');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['attributeName', 'whitespace']);
                }
            });

            it('member did actionCode with attributeName', function () {
                try {
                    parser.parse('member did eat with bob');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(6);
                    should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did actionCode with attributeName =', function () {
                try {
                    parser.parse('member did eat with bob =');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);
                    literalChoices = helper.extractLiterals(error);


                    should(error.expected.length).equal(3);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'string', 'whitespace']);
                }
            });

            it('member did actionCode with attributeName = \"', function () {
                try {
                    parser.parse('member did eat with bob = \"');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);
                    literalChoices = helper.extractLiterals(error);


                    should(error.expected.length).equal(3);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'string', 'whitespace']);
                }
            });

            it('member did actionCode with attributeName = \"attributeValue\"', function () {
                try {
                    parser.parse('member did eat with bob = \"bob\" 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(15);
                    should(literalChoices).eql(['&', 'after', 'and', 'at least', 'before', 'between', 'exactly', 'in last','in range of', 'in zone',  'less than', 'since', 'with RSSI']);

                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did actionCode with attributeName = \"attributeValue\",', function () {
                try {
                    parser.parse('member did eat with bob = \"bob\"&');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['attributeName', 'whitespace']);
                }
            });

            it('member did nothing', function () {
                try {
                    parser.parse('member did nothing 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(14);
                    should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'exactly',  'in last','in range of', 'in zone', 'less than', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something', function () {
                try {
                    parser.parse('member did something 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(14);
                    should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'exactly',  'in last','in range of', 'in zone', 'less than', 'since', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });


        });
    });
});