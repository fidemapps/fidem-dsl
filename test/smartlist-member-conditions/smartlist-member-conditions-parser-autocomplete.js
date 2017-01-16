'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member:', function () {
        var literalChoices;
        var otherChoices;
        before(function (done) {
            fs.readFile(__dirname + '/../../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        it('member', () => {

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