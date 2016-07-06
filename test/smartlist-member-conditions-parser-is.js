'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions "is":', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member is conditions', function () {

            it('member is in zone CODE1', function (done) {
                var condition = parser.parse("member is in zone CODE1");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'zone', zones: [ 'CODE1' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

            it('member is in zone CODE1,CODE2', function (done) {
                var condition = parser.parse("member is in zone CODE1,CODE2");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'zone', zones: [ 'CODE1','CODE2' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

            it('member is in range of beacon bob',function(){
                var condition = parser.parse("member is in range of beacon bob");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'inRange', beacons: [ 'bob' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is in range of beacon bob,tom',function(){
                var condition = parser.parse("member is in range of beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {

                            geo_filter: { type: 'inRange', beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI over 4 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI over 4 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {

                            geo_filter: { type: 'RSSI-over', rssiValue:4, beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI below 4 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI below 4 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'RSSI-below',rssiValue :4 , beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI between 4  and 5 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI between 4  and 5 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'RSSI-between', rssiValue:[4,5], beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

        });

 
    });
});
