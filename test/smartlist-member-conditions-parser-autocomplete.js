'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('./helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete List Member Conditions:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should get exception for auto-complete : action', function () {
      it('Missing actionCode', function (done) {

        try {
          parser.parse("action");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('actionCode');
        }

        done();
      });

      // FIXME(SG) : Need to verify how to get the the literals when adding spaces, to have an hint to continue
      // Need to be able to have the same test but with onlu one space
      it('Missing "with", "in zone", "and"', function (done) {

        try {
          parser.parse("action CODE w");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(5);
          should(literalChoices).eql(['and', 'in zone', 'with']);
        }

        done();
      });

      it('Missing "with" attributeName', function (done) {

        try {
          parser.parse("action CODE with");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('attributeName');
        }

        done();
      });

      it('Missing "with" operators', function (done) {

        try {
          parser.parse("action CODE with attr.name");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(6);
          should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
        }

        done();
      });

      it('Missing "with" operators value', function (done) {

        try {
          parser.parse("action CODE with attr.name >");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(4);
          should(literalChoices).eql(['\'', '"']);
          should(otherChoices).eql(['number', 'whitespace']);
        }

        done();
      });

      it('Missing "with" operators value starting quote', function (done) {

        try {
          parser.parse("action CODE with attr.name > '");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['\'', '\\']);
          should(otherChoices).eql([]);
        }

        done();
      });

      it('Missing "with" operators value ending quotes', function (done) {

        try {
          parser.parse("action CODE with attr.name > 'TEXT");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['\'', '\\']);
          should(otherChoices).eql([]);
        }

        done();
      });

      // FIXME(SG) : Need to verify how to get the the literals when adding spaces, to have an hint to continue
      // Need to be able to have the same test but with onlu one space, must be same problem as the other issue in this test
      it('After condition', function (done) {

        try {
          parser.parse('action CODE with attr.name > "TEXT" A');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['and', 'in zone']);
          should(otherChoices).eql(['whitespace']);
        }

        done();
      });
    });

    describe('Should get exception for auto-complete : challenge', function () {
      it('Missing challengeCode', function (done) {

        try {
          parser.parse("challenge");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('challengeCode');
        }

        done();
      });
    });

    describe('Should get exception for auto-complete : member', function () {
      it('Missing next criteria', function (done) {

        try {
          parser.parse("member");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(11);
          should(literalChoices).eql(['belongs to smartlist', 'city', 'country', 'created', 'in zone', 'level', 'points', 'state', 'tag', 'zip']);
          should(otherChoices).eql(['whitespace']);
        }

        done();
      });

      it('Missing tagCode', function (done) {

        try {
          parser.parse("member tag");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('tagCode');
        }

        done();
      });

      it('Missing levelCode', function (done) {

        try {
          parser.parse("member level");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('levelCode');
        }

        done();
      });

      it('Missing levelCode', function (done) {

        try {
          parser.parse("member points");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('levelCode');
        }

        done();
      });

      it('Missing smartCode', function (done) {

        try {
          parser.parse("member belongs to smartlist ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('smartlistCode');
        }

        done();
      });

      it('Missing zoneCode', function (done) {

        try {
          parser.parse("member in zone");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[1].description).equal('zoneCode');
        }

        done();
      });

      it('Missing zoneCode after the first', function (done) {

        try {
          parser.parse("member in zone CODE1,");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[1].description).equal('zoneCode');
        }

        done();
      });

      it('Missing zip operators', function (done) {

        try {
          parser.parse("member zip");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['!=', '=']);
          should(otherChoices).eql(['whitespace']);
        }

        done();
      });

      it('Missing zip starting quotes', function (done) {

        try {
          parser.parse("member zip !=");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['\'', '"']);
        }

        done();
      });

      it('Missing zip ending quotes', function (done) {

        try {
          parser.parse('member zip != "TEST');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['"', '\\']);
        }

        done();
      });

      it('Missing created "between" or "last" ', function (done) {

        try {
          parser.parse("member created");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['between', 'last']);
        }

        done();
      });

      it('Missing created last number', function (done) {

        try {
          parser.parse("member created last");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing created last time frame', function (done) {

        try {
          parser.parse("member created last 3");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(13);
          should(literalChoices).eql(['day', 'days', 'hour', 'hours', 'minute', 'minutes', 'month', 'months', 'week', 'weeks', 'year', 'years']);
        }

        done();
      });

      it('Missing created between datetime', function (done) {

        try {
          parser.parse("member created between");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('datetime');
        }

        done();
      });

      it('Missing created between date2', function (done) {

        try {
          parser.parse('member created between 2014-01-01');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('datetime');
        }

        done();
      });
    });
  });
});
