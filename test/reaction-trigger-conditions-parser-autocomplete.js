'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('./helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Trigger Conditions Parser:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/reaction-trigger-conditions-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should get exception for auto-complete : event date', function () {
      it('Empty string', function (done) {

        try {
          parser.parse("");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['ticket sales', 'tier']);
          should(otherChoices).eql(['number']);
        }

        done();
      });

      it('Missing timeframe', function (done) {

        try {
          parser.parse("1");
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

      it('Missing "after" or "before"', function (done) {

        try {
          parser.parse("1 day");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['after', 'before']);
        }

        done();
      });

      it('Missing "relative time"', function (done) {

        try {
          parser.parse("1 day before");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(5);
          should(literalChoices).eql(['curtain', 'end', 'sales', 'start']);
        }

        done();
      });

      it('Missing "of" or "and"', function (done) {

        try {
          parser.parse("1 day before start");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['and', 'of']);
        }

        done();
      });

      it('Missing event code', function (done) {

        try {
          parser.parse("1 day before start of");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('eventCode');
        }

        done();
      });
    });

    describe('Should get exception for auto-complete : ticket sales', function () {
      it('Missing tier code', function (done) {

        try {
          parser.parse("tier");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('tierCode');
        }

        done();
      });

      it('Missing "ticket sales"', function (done) {

        try {
          parser.parse("tier CODE");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('ticket sales');
        }

        done();
      });

      it('Missing "ticket sales" operator', function (done) {

        try {
          parser.parse("tier CODE ticket sales");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(6);
          should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
        }

        done();
      });

      it('Missing "ticket sales" number', function (done) {

        try {
          parser.parse("tier CODE ticket sales >");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Invalid percent sign og "ticket sales" number', function (done) {

        try {
          parser.parse("tier CODE ticket sales > 50:");
        }
        catch (err) {
          should(err.expected.length).equal(4);
          var literalChoices = helper.extractLiterals(err);
          should(literalChoices).eql(['%', 'and', 'of']);
        }

        done();
      });
    });
  });
});
