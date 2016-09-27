'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions "is":', function () {
        before(function (done) {
            fs.readFile(__dirname + '/../../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member is conditions', function () {

            it('member is in geofence CODE1', function (done) {
                var condition = parser.parse("member is in geofence CODE1");
                should(condition).eql({
                    conditions: [
                        {
                            geoFilter: { type: 'geofence', geofenceCodes: [ 'CODE1' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

            it('member is in geofence CODE1,CODE2', function (done) {
                var condition = parser.parse("member is in geofence CODE1,CODE2");
                should(condition).eql({
                    conditions: [
                        {
                            geoFilter: { type: 'geofence', geofenceCodes: [ 'CODE1','CODE2' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

        });


    });
});
