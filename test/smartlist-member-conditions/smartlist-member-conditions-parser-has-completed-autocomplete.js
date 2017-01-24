'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member Conditions has complted:', function () {
        var literalChoices;
        var otherChoices;
	    before(function (done) {
		    return helper.smartlistParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });
        describe('completed', function () {

            it('member has ', function () {
                try {
                    parser.parse('member has ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(6);
                    should(literalChoices).eql(['been', 'completed', 'gained', 'lost', 'not']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has completed ', function () {
                try {
                    parser.parse('member has completed ');
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

                    should(error.expected.length).equal(12);
                    should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in last', 'less than', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not ', function () {
                try {
                    parser.parse('member has not ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['been', 'completed', 'gained', 'lost']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member has not completed ', function () {
                try {
                    parser.parse('member has not completed ');
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

                    should(error.expected.length).equal(12);
                    should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in last', 'less than', 'since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });
        });


    });
});