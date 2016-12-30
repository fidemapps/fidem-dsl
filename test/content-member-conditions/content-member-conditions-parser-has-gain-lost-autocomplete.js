'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions has gain/lost:', function () {
        var literalChoices;
        var otherChoices;
        before(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('gain/lost', function () {

            it('member has not gained ', function () {
                try {
                    parser.parse('member has not gained ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['points', 'prize', 'tag']);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member has not lost ', function () {
                try {
                    parser.parse('member has not lost ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['points', 'prize', 'tag']);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member has not gained 3 ', function () {
                try {
                    parser.parse('member has not gained 3 ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['points', 'prize', 'tag']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not lost tag ', function () {
                try {
                    parser.parse('member has not lost tag ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['tagCode', 'whitespace']);
                }
            });

            it('member has not gained 3 tag ', function () {
                try {
                    parser.parse('member has not gained 3 tag ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['tagCode', 'whitespace']);
                }
            });

            it('member has not lost tag bob:bob', function () {
                try {
                    parser.parse('member has not lost tag bob:bob x');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not lost points ', function () {
                try {
                    parser.parse('member has not lost points ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['levelCode', 'whitespace']);
                }
            });

            it('member has not gained 3 points ', function () {
                try {
                    parser.parse('member has not gained 3 points ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['levelCode', 'whitespace']);
                }
            });

            it('member has not lost points bob', function () {
                try {
                    parser.parse('member has not lost points bob x');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the','in last', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not lost prize ', function () {
                try {
                    parser.parse('member has not lost prize ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['prizeCode', 'whitespace']);
                }
            });

            it('member has not gained 3 prize ', function () {
                try {
                    parser.parse('member has not gained 3 prize ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['prizeCode', 'whitespace']);
                }
            });

            it('member has not lost prize bob', function () {
                try {
                    parser.parse('member has not lost prize bob x');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });


        });

    });
});