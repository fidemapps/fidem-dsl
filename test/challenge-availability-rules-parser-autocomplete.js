'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Rules:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should get exception for auto-complete', function () {
            it('Empty string', function (done) {

                try {
                    parser.parse("");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    should(err.expected.length).equal(8);
                    should(literalChoices).eql(['belongs to smartlist', 'challenge', 'every', 'in zone', 'level', 'member', 'on', 'tag']);
                }

                done();
            });

            it('Missing level code', function (done) {

                try {
                    parser.parse("level ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('levelCode');
                }

                done();
            });

            it('Missing challenge code', function (done) {

                try {
                    parser.parse("challenge ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('challengeCode');
                }

                done();
            });

            it('Missing tag code', function (done) {

                try {
                    parser.parse("tag ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('tagCode');
                }

                done();
            });

            it('Missing zone code', function (done) {

                try {
                    parser.parse("in zone ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[1].description).equal('zoneCode');
                }

                done();
            });

            it('Missing zone code, after first code', function (done) {

                try {
                    parser.parse("in zone CODE1,");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[1].description).equal('zoneCode');
                }

                done();
            });

            it('Missing smartlist code', function (done) {

                try {
                    parser.parse("belongs to smartlist ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('smartlistCode');
                }

                done();
            });

            it('Missing number after in zone X for', function (done) {

                try {
                    parser.parse("in zone CODE1 for ");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('number');
                }

                done();
            });

            it('Invalid number after in zone X for', function (done) {

                try {
                    parser.parse("in zone CODE1 for X");
                }
                catch (err) {
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('number');
                }

                done();
            });

            it('Missing timeframe after in zone X for', function (done) {

                try {
                    parser.parse("in zone CODE1 for 3 ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    should(err.expected.length).equal(13);
                    should(literalChoices).eql([
                        'day',
                        'days',
                        'hour',
                        'hours',
                        'minute',
                        'minutes',
                        'month',
                        'months',
                        'week',
                        'weeks',
                        'year',
                        'years'
                    ]);
                }

                done();
            });

            it('Missing operators literals', function (done) {

                try {
                    parser.parse("level TEST ");
                }
                catch (err) {
                    should(err.expected.length).equal(6);
                    var literalChoices = helper.extractLiterals(err);
                    should(literalChoices).eql(['<', '<=', '=', '>', '>=']);
                }

                done();
            });

            it('Missing number', function (done) {

                try {
                    parser.parse("level TEST >");
                }
                catch (err) {
                    should(err.found).equal(null);
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('number');
                }

                done();
            });

            it('Not a number', function (done) {

                try {
                    parser.parse("level TEST > A");
                }
                catch (err) {
                    should(err.found).equal('A');
                    should(err.expected.length).equal(2);
                    should(err.expected[0].description).equal('number');
                }

                done();
            });

            it('At the end with one more space - expected "and"', function (done) {

                try {
                    parser.parse("challenge TEST ");
                }
                catch (err) {
                    should(err.found).equal(null);
                    should(err.expected.length).equal(2);
                    should(err.expected[0].value).equal('and');
                }

                done();
            });
        });
    });
});
