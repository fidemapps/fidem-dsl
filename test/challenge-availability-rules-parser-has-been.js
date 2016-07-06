'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Member conditions Rules has been:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        
        describe('has been', function () {

            it('member has been in zone', function () {

                var rule = parser.parse('member has been in zone bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'zone',
                            zoneCodes: ['bob']
                        }
                    }]);

            });

            it('member has not been in zone', function () {

                var rule = parser.parse('member has not been in zone bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'zone',
                            zoneCodes: ['bob']
                        }
                    }]);

            });

            it('member has been in range', function () {

                var rule = parser.parse('member has been in range of beacon bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beaconCodes: ['bob']
                        }
                    }]);

            });

            it('member has not been in range', function () {

                var rule = parser.parse('member has not been in range of beacon bob,tom');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'inRange',
                            beaconCodes: ['bob', 'tom']
                        }
                    }]);

            });

            it('member has been with RSSI over', function () {

                var rule = parser.parse('member has been with RSSI over 310 from beacon bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-over',
                            rssiValue: 310,
                            beaconCodes: ['bob']
                        }
                    }]);

            });

            it('member has not been with RSSI over', function () {

                var rule = parser.parse('member has not been  with RSSI over 310 from beacon bob,tom,carl');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-over',
                            rssiValue: 310,
                            beaconCodes: ['bob', 'tom', 'carl']
                        }
                    }]);

            });

            it('member has been with RSSI below', function () {

                var rule = parser.parse('member has been with RSSI below 4 from beacon bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-below',
                            rssiValue: 4,
                            beaconCodes: ['bob']
                        }
                    }]);

            });

            it('member has not been with RSSI below', function () {

                var rule = parser.parse('member has not been with RSSI below 4 from beacon bob,eric,jean');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-below',
                            rssiValue: 4,
                            beaconCodes: ['bob', 'eric', 'jean']
                        }
                    }]);

            });

            it('member has been with RSSI between', function () {

                var rule = parser.parse('member has been with RSSI between 4 and 6 from beacon bob');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-between',
                            rssiValue: [4, 6],
                            beaconCodes: ['bob']
                        }
                    }]);
            });

            it('member has not been with RSSI between', function () {

                var rule = parser.parse('member has not been with RSSI between 6 and 4 from beacon bob,norbert');
                should(rule).eql([
                    {
                        scope: 'member',
                        type: 'has',
                        negative: true,
                        query: {
                            type: 'been'
                        },
                        geo_filter: {
                            type: 'RSSI-between',
                            rssiValue: [6, 4],
                            beaconCodes: ['bob', 'norbert']
                        }
                    }]);

            });

        });
        
    });

});