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

            it('member city = "test"', function (done) {
                var condition = parser.parse('member city = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
                done();
            });

            it('member state = "test"', function (done) {
                var condition = parser.parse('member state = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
                done();
            });

            it('member country = "test"', function (done) {
                var condition = parser.parse('member country = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
                done();
            });

            it('member zip = "test"', function (done) {
                var condition = parser.parse('member zip = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
                done();
            });

            it('member city != "test"', function (done) {
                var condition = parser.parse('member city != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
                done();
            });

            it('member state != "test"', function (done) {
                var condition = parser.parse('member state != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
                done();
            });

            it('member country != "test"', function (done) {
                var condition = parser.parse('member country != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
                done();
            });

            it('member zip != "test"', function (done) {
                var condition = parser.parse('member zip != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
                done();
            });

        });

    });
});
