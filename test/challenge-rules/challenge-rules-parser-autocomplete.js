'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Challenge Rules:', function () {
	  before(function (done) {
		  return helper.challengeParser().then(function(newParser){
			  parser = newParser;
			  done()
		  });
	  });

    describe('Should get exception for auto-complete', function () {
      it('Empty string', function (done) {

        try {
          parser.parse("");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['action', 'challenge', 'member']);
        }

        done();
      });

      it('Missing challenge code', function (done) {

        try {
          parser.parse("challenge ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('challengeCode');
        }

        done();
      });

      it('Missing action code', function (done) {

        try {
          parser.parse("action ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('actionCode');
        }

        done();
      });

      it('member Missing level code', function (done) {

        try {
          parser.parse("member level ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('levelCode');
        }

        done();
      });

      it('member Missing tag code', function (done) {

        try {
          parser.parse("member tag ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('tagCode');
        }

        done();
      });

      it('geofence Missing geofence code', function (done) {

        try {
          parser.parse("action TEST in geofence ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('geofenceCode');
        }

        done();
      });

      it('geofence Missing geofence code after first one', function (done) {

        try {
          parser.parse("action TEST in geofence CODE1,");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('geofenceCode');
        }

        done();
      });

      it('Missing "times"', function (done) {

        try {
          parser.parse("challenge CODE x");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);

          should(err.expected.length).equal(8);
          should(literalChoices).eql(['and', 'give', 'in geofence', 'near', 'with data', 'with tag']);
          should(otherChoices).eql(['number', 'whitespace']);
        }

        done();
      });

      it('Missing time number', function (done) {

        try {
          parser.parse("challenge CODE 3 times within ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing time period ', function (done) {

        try {
          parser.parse("challenge CODE 3 times within 3 ");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(13);
          should(literalChoices).eql([
            'day',
            'days',
            'hour',
            'hours',
            'minute',
            'minutes',
            'month',
            'months',
            'week',
            'weeks',
            'year',
            'years'
          ]);
        }

        done();
      });

      it('Missing tag code', function (done) {

        try {
          parser.parse("challenge CODE with tag ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('tagCode');
        }

        done();
      });

      it('Missing attribute name', function (done) {

        try {
          parser.parse("action CODE with data ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('attributeName');
        }

        done();
      });

      it('Missing reward quantity ', function (done) {

        try {
          parser.parse("challenge CODE give ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing reward code' , function (done) {

        try {
          parser.parse("challenge CODE give 3 ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('rewardCode');
        }

        done();
      });

      it('At the end with one more space - expected "give" or "and"', function (done) {

        try {
          parser.parse("challenge TEST ");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.found).equal(null);
          should(err.expected.length).equal(8);
          should(literalChoices).eql(['and', 'give', 'in geofence', 'near', 'with data', 'with tag']);
        }

        done();
      });

      it('At the end with one more space - expected "give"', function (done) {

        try {
          parser.parse("challenge TEST give 2 TEST ");
        }
        catch (err) {
          should(err.found).equal(null);
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('give');
        }

        done();
      });

      it('geofence Missing geofence code', function (done) {

        try {
          parser.parse("action TEST in geofence ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('geofenceCode');
        }

        done();
      });

      it('member in geofence Missing geofence code', function (done) {

        try {
          parser.parse("member in geofence ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('geofenceCode');
        }

        done();
      });

      it('member in geofence Missing geofence code after first one', function (done) {

        try {
          parser.parse("member in geofence CODE1,");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('geofenceCode');
        }

        done();
      });

      it('member in geofence Missing number after for', function (done) {

        try {
          parser.parse("member in geofence CODE1 for ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('member in geofence Missing time period after for', function (done) {

        try {
          parser.parse("member in geofence CODE1 for 3 ");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(13);
          should(literalChoices).eql([
            'day',
            'days',
            'hour',
            'hours',
            'minute',
            'minutes',
            'month',
            'months',
            'week',
            'weeks',
            'year',
            'years'
          ]);
        }

        done();
      });

      it('beaon Missing distance', function (done) {

        try {
          parser.parse("action TEST near ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('beaon Missing of beacon ', function (done) {

        try {
          parser.parse("action TEST near 1 ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          var literalChoices = helper.extractLiterals(err);
          should(literalChoices).eql(['of beacon']);
        }

        done();
      });

      it('beaon Missing beacon code ', function (done) {

        try {
          parser.parse("action TEST near 1 of beacon ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('beaconCode');
        }

        done();
      });
    });
  });
});
