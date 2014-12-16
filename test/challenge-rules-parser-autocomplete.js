'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Challenge Rules:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should get exception for auto-complete', function () {
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

      it('Missing "times"', function (done) {

        try {
          parser.parse("challenge CODE x");
        }
        catch (err) {
          var literalChoices = err.expected.filter(function (choice) {
            return choice.type === 'literal';
          }).map(function (choice) {
            return choice.value;
          });
          var otherChoices = err.expected.filter(function (choice) {
            return choice.type === 'other';
          }).map(function (choice) {
            return choice.description;
          });

          should(err.expected.length).equal(5);
          should(literalChoices).eql(['and', 'give', 'with tag']);
          should(otherChoices).eql(['number', 'whitespace']);
        }

        done();
      });

      it('Missing time number', function (done) {

        try {
          parser.parse("challenge CODE 3 times within");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing time period', function (done) {

        try {
          parser.parse("challenge CODE 3 times within 3");
        }
        catch (err) {
          var literalChoices = err.expected.filter(function (choice) {
            return choice.type === 'literal';
          }).map(function (choice) {
            return choice.value;
          });
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

      it('Missing reward quantity', function (done) {

        try {
          parser.parse("challenge CODE give");
        }
        catch (err) {
          should(err.expected.length).equal(2);
          should(err.expected[0].description).equal('number');
        }

        done();
      });

      it('Missing reward code', function (done) {

        try {
          parser.parse("challenge CODE give 3");
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
          var literalChoices = err.expected.filter(function (choice) {
            return choice.type === 'literal';
          }).map(function (choice) {
            return choice.value;
          });
          should(err.found).equal(null);
          should(err.expected.length).equal(5);
          should(literalChoices).eql(['and', 'give', 'with tag']);
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
    });
  });
});
