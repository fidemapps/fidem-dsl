'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('../helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete List Member Conditions "is":', function () {
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

    describe('is rule', function () {
      var literalChoices;
      var otherChoices;

      it('member is', function () {
        try {
          parser.parse("member is");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(2);
          should(literalChoices).eql(['in geofence']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member is in geofence', function () {
        try {
          parser.parse("member is in geofence");
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