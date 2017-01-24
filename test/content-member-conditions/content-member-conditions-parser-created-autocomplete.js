'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions created:', function () {
        var literalChoices;
        var otherChoices;

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('created rule',function(){

            it('member created before ', function () {
                try {
                    parser.parse('member created before ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member created after ', function () {
                try {
                    parser.parse('member created after ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member created after/before datetime', function () {
                try {
                    parser.parse('member created after 2016-03-04 23:20:20 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created between ', function () {
                try {
                    parser.parse('member created between ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member created between datetime ', function () {
                try {
                    parser.parse('member created between 2016-03-04 11:20 pm ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created between datetime and ', function () {
                try {
                    parser.parse('member created between 2016-03-04 3:20 and ');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member created between datetime and datetime', function () {
                try {
                    parser.parse('member created between 2016-03-04 03:20 and 2016-03-04 23:20 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created in last ', function () {
                try {
                    parser.parse('member created in last ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(8);
                    should(literalChoices).eql(['day',  'hour', 'minute', 'month', 'week',  'year']);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member created in last number ', function () {
                try {
                    parser.parse('member created in last 3 ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(7);
                    should(literalChoices).eql(['days',  'hours', 'minutes',  'months',  'weeks',  'years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created in last number timeframe', function () {
                try {
                    parser.parse('member created in last 3 weeks 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

        });

    });
});