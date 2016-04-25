'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('./helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete List Limit:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/smartlist-limit-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should get exception for auto-complete : only top', function () {
      it('Empty string', function (done) {

        try {
          parser.parse("");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(1);
          should(literalChoices).eql(['only top']);
        }

        done();
      });

      it('Missing number for only top', function (done) {

        try {
          parser.parse("only top");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing only top "by member"', function (done) {

        try {
          parser.parse("only top 3");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].value).equal('by member');
        }

        done();
      });

      it('Missing only top "tag" or "points"', function (done) {

        try {
          parser.parse("only top 3 by member");
        }
        catch (err) {
          var literalChoices = helper.extractLiterals(err);
          should(err.expected.length).equal(3);
          should(literalChoices).eql(['points', 'tag']);
        }

        done();
      });
    });
  });
});
