'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('../helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete List Member Conditions Member: OccurenceFilter', function () {
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

    describe('should auto-complete the occurrence filter', function () {


      it('member did something at least ', function () {
        try {
          parser.parse('member did something at least ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);

          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(3);
          should(literalChoices).eql(['once']);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did something at least number ', function () {
        try {
          parser.parse('member did something at least 2 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['times']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something at least number times ', function () {
        try {
          parser.parse('member did something at least 2 times 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between','during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something at least once', function () {
        try {
          parser.parse('member did something at least once');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });


      it('member did something less than ', function () {
        try {
          parser.parse('member did something less than ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);

          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(3);
          should(literalChoices).eql(['once']);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did something less than number ', function () {
        try {
          parser.parse('member did something less than 2 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['times']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something less than number times ', function () {
        try {
          parser.parse('member did something less than 2 times 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something less than once ', function () {
        try {
          parser.parse('member did something less than once 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something exactly ', function () {
        try {
          parser.parse('member did something exactly ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(3);
          should(literalChoices).eql(['once']);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did something exactly number ', function () {
        try {
          parser.parse('member did something exactly 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['times']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something exactly number times', function () {
        try {
          parser.parse('member did something exactly 2 times 3');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something exactly once time', function () {
        try {
          parser.parse('member did something exactly once 3');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(12);
          should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'in geofence', 'in last', 'in range of', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

    });

  });
});