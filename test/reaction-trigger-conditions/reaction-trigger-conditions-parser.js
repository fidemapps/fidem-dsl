'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Trigger Conditions Parser:', function () {
    before(function (done) {
      fs.readFile(__dirname + '/../../dsl/reaction-trigger-conditions-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should parse trigger conditions', function () {
      it('3 days before sales of EVENT1', function (done) {

        var rule = parser.parse("3 days before sales of EVENT1");
        should(rule).eql({
          eventCode: 'EVENT1',
          conditions: [
            {
              type: 'time',
              duration: 3,
              durationScope: 'day',
              qualifier: 'before',
              eventQualifier: 'sales'
            }
          ]
        });
        done();
      });

      it('10 minutes after curtain of EVENT2', function (done) {

        var rule = parser.parse("10 minutes after curtain of EVENT2");
        should(rule).eql({
          eventCode: 'EVENT2',
          conditions: [
            {
              type: 'time',
              duration: 10,
              durationScope: 'minute',
              qualifier: 'after',
              eventQualifier: 'curtain'
            }
          ]
        });
        done();
      });

      it('tier TIER1 ticket sales < 50 of EVENT1', function (done) {

        var rule = parser.parse("tier TIER1 ticket sales < 50 of EVENT1");
        should(rule).eql({
          eventCode: 'EVENT1',
          conditions: [
            {
              type: 'tierSales',
              tierCode: 'TIER1',
              operator: '<',
              value: 50,
              percent: false
            }
          ]
        });
        done();
      });

      it('tier TIER1 ticket sales > 50% of EVENT1', function (done) {

        var rule = parser.parse("tier TIER1 ticket sales > 50% of EVENT1");
        should(rule).eql({
          eventCode: 'EVENT1',
          conditions: [
            {
              type: 'tierSales',
              tierCode: 'TIER1',
              operator: '>',
              value: 50,
              percent: true
            }
          ]
        });
        done();
      });

      it('ticket sales < 100 of EVENT2', function (done) {

        var rule = parser.parse("ticket sales < 100 of EVENT2");
        should(rule).eql({
          eventCode: 'EVENT2',
          conditions: [
            {
              type: 'eventSales',
              operator: '<',
              value: 100,
              percent: false
            }
          ]
        });
        done();
      });


      it('ticket sales <= 30% of EVENT2', function (done) {

        var rule = parser.parse("ticket sales <= 30% of EVENT2");
        should(rule).eql({
          eventCode: 'EVENT2',
          conditions: [
            {
              type: 'eventSales',
              operator: '<=',
              value: 30,
              percent: true
            }
          ]
        });
        done();
      });


      it('1 hour before curtain and tier TIER1 ticket sales < 75% of EVENT2', function (done) {

        var rule = parser.parse("1 hour before curtain and tier TIER1 ticket sales < 75% of EVENT2");
        should(rule).eql({
          eventCode: 'EVENT2',
          conditions: [
            {
              type: 'time',
              duration: 1,
              durationScope: 'hour',
              qualifier: 'before',
              eventQualifier: 'curtain'
            },
            {
              type: 'tierSales',
              tierCode: 'TIER1',
              operator: '<',
              value: 75,
              percent: true
            }
          ]
        });
        done();
      });
    });
  });
});
