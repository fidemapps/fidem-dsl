'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('../helper'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete List Member Conditions did:', function () {
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
    describe('did', function () {

      it('member did ', function () {
        try {
          parser.parse('member did ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(6);
          should(literalChoices).eql(['action', 'check-in', 'not', 'nothing', 'something']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did not ', function () {
        //This happen because the parser don't know yet that the word 'not' is a token and not an actionCode
        try {
          parser.parse('member did not ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(3);
          should(literalChoices).eql(['action', 'check-in']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      describe('action', function () {

        it('member did action ', function () {
          try {
            parser.parse('member did action ');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['actionCode', 'whitespace']);
          }
        });

        it('member did action actionCode', function () {
          try {
            parser.parse('member did action eat d');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(16);
            should(literalChoices).eql([
              'after',
              'and',
              'at least',
              'before',
              'between',
              'during the',
              'exactly',
              'in geofence',
              'in last',
              'in range of',
              'less than',
              'since',
              'with RSSI',
              'with']);

            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did action actionCode with ', function () {
          try {
            parser.parse('member did action eat with ');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['attributeName', 'whitespace']);
          }
        });

        it('member did action actionCode with attributeName', function () {
          try {
            parser.parse('member did action eat with bob');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(6);
            should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did action actionCode with attributeName =', function () {
          try {
            parser.parse('member did action eat with bob =');
          } catch (error) {
            otherChoices = helper.extractOthers(error);
            literalChoices = helper.extractLiterals(error);

            should(error.expected.length).equal(3);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number', 'string', 'whitespace']);
          }
        });

        it('member did action actionCode with attributeName = \"', function () {
          try {
            parser.parse('member did action eat with bob = \"');
          } catch (error) {
            otherChoices = helper.extractOthers(error);
            literalChoices = helper.extractLiterals(error);

            should(error.expected.length).equal(3);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number', 'string', 'whitespace']);
          }
        });

        it('member did action actionCode with attributeName = \"attributeValue\"', function () {
          try {
            parser.parse('member did action eat with bob = \"bob\" 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(16);
            should(literalChoices).eql(['&', 'after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in geofence', 'in last', 'in range of', 'less than', 'since', 'with RSSI']);

            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did action actionCode with attributeName = \"attributeValue\",', function () {
          try {
            parser.parse('member did action eat with bob = \"bob\"&');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['attributeName', 'whitespace']);
          }
        });

      });

      describe('check-in', function () {

        it('member did check-in ', function () {
          try {
            parser.parse('member did check-in ');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['checkinCode', 'whitespace']);
          }
        });

        it('member did check-in checkinCode', function () {
          try {
            parser.parse('member did check-in eat d');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(16);
            should(literalChoices).eql([
              'after',
              'and',
              'at least',
              'before',
              'between',
              'during the',
              'exactly',
              'in geofence',
              'in last',
              'in range of',
              'less than',
              'since',
              'with RSSI',
              'with']);

            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did check-in checkinCode with ', function () {
          try {
            parser.parse('member did check-in eat with ');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['attributeName', 'whitespace']);
          }
        });

        it('member did check-in checkinCode with attributeName', function () {
          try {
            parser.parse('member did check-in eat with bob');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(6);
            should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did check-in checkinCode with attributeName =', function () {
          try {
            parser.parse('member did check-in eat with bob =');
          } catch (error) {
            otherChoices = helper.extractOthers(error);
            literalChoices = helper.extractLiterals(error);

            should(error.expected.length).equal(3);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number', 'string', 'whitespace']);
          }
        });

        it('member did check-in checkinCode with attributeName = \"', function () {
          try {
            parser.parse('member did check-in eat with bob = \"');
          } catch (error) {
            otherChoices = helper.extractOthers(error);
            literalChoices = helper.extractLiterals(error);

            should(error.expected.length).equal(3);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number', 'string', 'whitespace']);
          }
        });

        it('member did check-in checkinCode with attributeName = \"attributeValue\"', function () {
          try {
            parser.parse('member did check-in eat with bob = \"bob\" 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(16);
            should(literalChoices).eql(['&', 'after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in geofence', 'in last', 'in range of', 'less than', 'since', 'with RSSI']);

            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member did check-in checkinCode with attributeName = \"attributeValue\",', function () {
          try {
            parser.parse('member did check-in eat with bob = \"bob\"&');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['attributeName', 'whitespace']);
          }
        });

      });

      it('member did nothing', function () {
        try {
          parser.parse('member did nothing 3');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(15);
          should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in geofence', 'in last', 'in range of', 'less than', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something', function () {
        try {
          parser.parse('member did something 3');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(15);
          should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'in geofence', 'in last', 'in range of', 'less than', 'since', 'with RSSI']);
          should(otherChoices).eql(['whitespace']);
        }
      });

    });
  });
});