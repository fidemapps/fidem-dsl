'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions city/state/country/zip:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });


        describe('Should parse member city/state/country/zip conditions', function () {

            it('member lives in city test', function (done) {
                var condition = parser.parse('member lives in city "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: {type:'city', cityName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in state test', function (done) {
                var condition = parser.parse('member lives in state "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type:'state', stateName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in country test', function (done) {
                var condition = parser.parse('member lives in country "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'country', countryName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in zip test', function (done) {
                var condition = parser.parse('member lives in zip "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'zip', zipCode: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in city test', function (done) {
                var condition = parser.parse('member lives not in city "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'city', cityName: 'test' },
                            negative:true,
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in state test', function (done) {
                var condition = parser.parse('member lives not in state "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'state', stateName: 'test' },
                            negative:true,
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in country  "test"', function (done) {
                var condition = parser.parse('member lives not in country "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'country', countryName: 'test' },
                            scope: 'member',
                            negative:true,
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member live not in zip test', function (done) {
                var condition = parser.parse('member lives not in zip "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'zip', zipCode: 'test' },
                            scope: 'member',
                            negative:true,
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

        });

    });
});
