'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Availability Rules is:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('is rule',function(){

      it('should parse simple is rule with in zone',function(){
        var rule = parser.parse('member is in zone ZONECODE');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'zone',
            zoneCodes:['ZONECODE']
          }
        }]);
      });

      it('should parse simple is rule with multiple in zone ,',function(){
        var rule = parser.parse('member is in zone ZONECODE,zone2');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'zone',
            zoneCodes:[
              'ZONECODE',
              'zone2'
            ]
          }
        }]);
      });

      it('should parse simple is rule with in range of beacon',function(){
        var rule = parser.parse('member is in range of beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type: 'inRange',
            beaconCodes: ['bob']
          }
        }]);
      });
      
      it('should parse simple is rule with multiple in range of beacon ,',function(){
        var rule = parser.parse('member is in range of beacon bob,max,matt');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'inRange',
            beaconCodes:['bob','max','matt']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI below',function(){
        var rule = parser.parse('member is with RSSI below  3 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-below',
            rssiValue:3,
            beaconCodes:['bob']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI over',function(){
        var rule = parser.parse('member is with RSSI over  3 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-over',
            rssiValue:3,
            beaconCodes:['bob']
          }
        }]);
      });

      it('should parse simple is rule with with RSSI between',function(){
        var rule = parser.parse('member is with RSSI between  3 and 4 from beacon bob');
        should(rule).eql([{
          scope:'member',
          type:'is',
          geo_filter: {
            type:'RSSI-between',
            rssiValue:[3,4],
            beaconCodes:['bob']
          }
        }]);
      });


    });

  });
});
