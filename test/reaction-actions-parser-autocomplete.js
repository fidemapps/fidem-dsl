'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('./helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Reaction Actions Parser:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/reaction-actions-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should get exception for auto-complete of give reward', function () {
      it('Empty string', function (done) {

        try {
          parser.parse("");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['give reward', 'send message template', 'send message text']);
        }

        done();
      });

      it('Missing reward quantity', function (done) {

        try {
          parser.parse("give reward ");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing reward code', function (done) {

        try {
          parser.parse("give reward 1");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('rewardCode');
        }

        done();
      });

      it('Missing reward "from program"', function (done) {

        try {
          parser.parse("give reward 1 CODE");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('from program');
        }

        done();
      });

      it('Missing reward program code', function (done) {

        try {
          parser.parse("give reward 1 CODE from program");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('programCode');
        }

        done();
      });

      it('Missing reward "to"', function (done) {

        try {
          parser.parse("give reward 1 CODE from program CODE");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('to list');
        }

        done();
      });

      it('Missing reward listCode', function (done) {

        try {
          parser.parse("give reward 1 CODE from program CODE to list");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('listCode');
        }

        done();
      });
    });

    describe('Should get exception for auto-complete of send message', function () {
      it('Missing starting quotes/double quotes', function (done) {

        try {
          parser.parse("send message text");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['\'', '"']);
        }

        done();
      });

      it('Missing text or quotes', function (done) {

        try {
          parser.parse("send message text '");
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

      it('Missing ending quotes/double quotes after text', function (done) {

        try {
          parser.parse("send message text 'TEST");
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

      it('Missing "with subject"', function (done) {

        try {
          parser.parse('send message text "TEXT" ');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('with subject');
        }

        done();
      });

      it('Missing starting quotes of subject', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['\'', '"']);
        }

        done();
      });

      it('Missing text of subject', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['"', '\\']);
          should(otherChoices).eql([]);
        }

        done();
      });

      it('Missing ending quotes of subject', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "TEST');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          var otherChoices = helper.extractOthers(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['"', '\\']);
          should(otherChoices).eql([]);
        }

        done();
      });

      it('Missing "to list" or "to emails"', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "TEST"');
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['to emails', 'to list']);
        }

        done();
      });

      it('Missing "to list" list code', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "TEST" to list');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('listCode');
        }

        done();
      });

      it('Missing "to emails" email', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "TEST" to emails');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('email');
        }

        done();
      });

      it('Missing "to emails" email in the list of email', function (done) {

        try {
          parser.parse('send message text "TEXT" with subject "TEST" to emails test@test.com,');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('email');
        }

        done();
      });

      it('Missing template code', function (done) {

        try {
          parser.parse('send message template');
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('templateMessageCode');
        }

        done();
      });
    });
  });
});
