'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Content Member Conditions "is":', function () {

	  before(function (done) {
		  return helper.contentParser().then(function(newParser){
			  parser = newParser;
			  done()
		  });
	  });

    describe('is rule', function () {


      it('member is ', function () {
        try {
          parser.parse("member is ");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(2);
          should(literalChoices).eql(['in geofence']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member is in geofence ', function () {
        try {
          parser.parse("member is in geofence ");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['geofenceCode', 'whitespace']);
        }
      });

      it('member is in geofence montreal', function () {
        try {
          parser.parse("member is in geofence montreal s");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(4);
          should(literalChoices).eql([',', 'and']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member is in geofence montreal,', function () {
        try {
          parser.parse("member is in geofence montreal,");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['geofenceCode', 'whitespace']);
        }
      });

      it('member is in geofence montreal,laval', function () {
        try {
          parser.parse("member is in geofence montreal,laval s");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(4);
          should(literalChoices).eql([',', 'and']);
          should(otherChoices).eql(['whitespace']);
        }
      });


    });

  });
});