'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Availability Rules:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should parse level rules', function () {
      it('level LEVELCODE >= 10', function (done) {

        var rule = parser.parse("level LEVELCODE >= 10");
        should(rule).eql([{
          scope: 'level',
          code: 'LEVELCODE',
          operator: '>=',
          value: 10
        }]);
        done();
      });
    });

    describe('Should parse tag rules', function () {
      it('tag PATATE > 5', function (done) {

        var rule = parser.parse("tag PATATE > 5");
        should(rule).eql([{
          scope: 'tag',
          code: 'PATATE',
          operator: '>',
          value: 5
        }]);

        done();
      });
    });

    describe('Should parse challenge rules', function () {
      it('challenge CODE1', function (done) {

        var rule = parser.parse("challenge CODE1");
        should(rule).eql([{
          scope: 'challenge',
          code: 'CODE1'
        }]);

        done();
      });
    });

    describe('Should parse complex rules', function () {
      it('challenge CODE1 and tag PATATE > 5 and level LEVELCODE >= 10', function (done) {
        var rule = parser.parse("challenge CODE1 and tag PATATE > 5 and level LEVELCODE >= 10");
        should(rule).eql([
          {scope: 'challenge', code: 'CODE1'},
          {scope: 'tag', code: 'PATATE', operator: '>', value: 5},
          {scope: 'level', code: 'LEVELCODE', operator: '>=', value: 10}
        ]);

        done();
      });
    });
  });
});
