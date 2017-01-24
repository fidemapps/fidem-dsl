'use strict';

var should = require('should'),
    helper = require('../helper');


var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member:', function () {
        var literalChoices;
        var otherChoices;
	    before(function (done) {
		    return helper.smartlistParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        it('member', function () {

	        try {
		        parser.parse('member ');
	        } catch (error) {
		        literalChoices = helper.extractLiterals(error);
		        otherChoices = helper.extractOthers(error);

		        should(error.expected.length).equal(8);
		        should(literalChoices).eql(['created', 'did', 'has', 'is', 'lives', 'with', 'without']);
		        should(otherChoices).eql([ 'whitespace']);
	        }
        })

    });
});