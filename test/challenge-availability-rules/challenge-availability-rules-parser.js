'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Availability Rules:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
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
          tagClusterCode: null,
          code: 'PATATE',
          operator: '>',
          value: 5
        }]);

        done();
      });

      it('tag CLUSTER:PATATE > 5', function (done) {

        var rule = parser.parse("tag CLUSTER:PATATE > 5");
        should(rule).eql([{
          scope: 'tag',
          tagClusterCode: 'CLUSTER',
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

    describe('Should parse zone rules', function () {
      it('in zone CODE1', function (done) {

        var rule = parser.parse("in zone CODE1");
        should(rule).eql([{
          scope: 'zone',
          codes: ['CODE1'],
          duration: null,
          timeframe: null
        }]);

        done();
      });

      it('in zone CODE1,CODE2', function (done) {

        var rule = parser.parse("in zone CODE1,CODE2");
        should(rule).eql([{
          scope: 'zone',
          codes: ['CODE1', 'CODE2'],
          duration: null,
          timeframe: null
        }]);

        done();
      });

      it('in zone CODE1 for 3 hours', function (done) {

        var rule = parser.parse("in zone CODE1 for 3 hours");
        should(rule).eql([{
          scope: 'zone',
          codes: ['CODE1'],
          duration: 3,
          timeframe: 'hour'
        }]);

        done();
      });

      it('in zone CODE1,CODE2 for 5 minutes', function (done) {

        var rule = parser.parse("in zone CODE1,CODE2 for 5 minutes");
        should(rule).eql([{
          scope: 'zone',
          codes: ['CODE1', 'CODE2'],
          duration: 5,
          timeframe: 'minute'
        }]);

        done();
      });

    });

    describe('Should parse complex rules', function () {
      it('challenge CODE1 and tag PATATE > 5 and level LEVELCODE >= 10', function (done) {
        var rule = parser.parse("challenge CODE1 and tag PATATE > 5 and level LEVELCODE >= 10");
        should(rule).eql([
          {scope: 'challenge', code: 'CODE1'},
          {scope: 'tag', tagClusterCode: null, code: 'PATATE', operator: '>', value: 5},
          {scope: 'level', code: 'LEVELCODE', operator: '>=', value: 10}
        ]);

        done();
      });
    });

    describe('Should parse belongs to smartlist rules', function(){
      it('Single smartlist: belongs to smartlist X', function(done){
        var rule = parser.parse("belongs to smartlist 123");
        should(rule).eql([{
          scope: 'smartlist',
          codes: ['123']
        }]);

        done();
      });

      it('Multiple smartlists: belongs to smartlist X,Y,Z', function(done){
        var rule = parser.parse("belongs to smartlist 123,456,789");
        should(rule).eql([{
          scope: 'smartlist',
          codes: ['123','456','789']
        }]);

        done();
      });
    });
  });
});
