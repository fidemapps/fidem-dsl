'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('../helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {

  describe.only('Auto-Complete List Member Conditions Member: MomentFilter:', function () {
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


    describe('should auto-complete the moment filter', function () {

      it('member has completed bob s', function(){
	      try {
		      parser.parse('member has completed bob s');
	      } catch (error) {
		      literalChoices = helper.extractLiterals(error);
		      otherChoices = helper.extractOthers(error);

		      should(error.expected.length).equal(12);
		      should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in last', 'less than', 'since']);
		      should(otherChoices).eql(['whitespace']);
	      }
      });

	    it('member has completed bob before', function(){
		    try {
			    parser.parse('member has completed bob before ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(4);
			    should(literalChoices).eql([]);
			    should(otherChoices).eql([ '12h time (hh:mm am/pm)', '24h time (hh:mm)', 'date (YYYY-MM-DD)', 'whitespace']);
		    }
	    });

	    it('member has completed bob after', function(){
		    try {
			    parser.parse('member has completed bob after ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(4);
			    should(literalChoices).eql([]);
			    should(otherChoices).eql([ '12h time (hh:mm am/pm)', '24h time (hh:mm)', 'date (YYYY-MM-DD)', 'whitespace']);
		    }
	    });

	    it('member has completed bob between', function(){
		    try {
			    parser.parse('member has completed bob between ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(4);
			    should(literalChoices).eql([]);
			    should(otherChoices).eql([ '12h time (hh:mm am/pm)', '24h time (hh:mm)', 'date (YYYY-MM-DD)', 'whitespace']);
		    }
	    });

	    it('member has completed bob between TIME ', function(){
		    try {
			    parser.parse('member has completed bob between 10:00 pm ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(2);
			    should(literalChoices).eql(['and']);
			    should(otherChoices).eql([ 'whitespace']);
		    }
	    });

	    it('member has completed bob between TIME and ', function(){
		    try {
			    parser.parse('member has completed bob between 10:00 pm and ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(3);
			    should(literalChoices).eql([]);
			    should(otherChoices).eql([ '12h time (hh:mm am/pm)', '24h time (hh:mm)', 'whitespace']);
		    }
	    });


	    it('member did something during the', function(){
		    try {
			    parser.parse('member did something during the ');
		    } catch (error) {
			    literalChoices = helper.extractLiterals(error);
			    otherChoices = helper.extractOthers(error);

			    should(error.expected.length).equal(5);
			    should(literalChoices).eql(['afternoon', 'evening', 'morning', 'night']);
			    should(otherChoices).eql(['whitespace']);
		    }
	    });

      it('member did something during the morning', function(){
          try {
              parser.parse('member did something during the morning s');
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