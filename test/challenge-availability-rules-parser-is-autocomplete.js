'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;
var otherChoices;
var literalChoices;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Rules is:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        
        it('Empty string', function (done) {

            try {
                parser.parse("");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                should(err.expected.length).equal(3);
                should(literalChoices).eql(['every', 'member', 'on']);
            }

            done();
        });
    
        it('member', function () {
            try {
                parser.parse("member");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                should(err.expected.length).equal(13);
                should(literalChoices).eql([
                    'belongs to smartlist',
                    'city',
                    'country',
                    'created',
                    'did',
                    'do not belongs to smartlist',
                    'has',
                    'is',
                    'state',
                    'with',
                    'without',
                    'zip'
                ]);
            }
        });

        describe('is rule', function () {
            var literalChoices;
            var otherChoices;

            it('member is', function () {
                try {
                    parser.parse("member is");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql(['in range of', 'in zone', 'with RSSI']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is in zone', function () {
                try {
                    parser.parse("member is in zone");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['whitespace', 'zoneCode']);
                }
            });

            it('member is in zone montreal', function () {
                try {
                    parser.parse("member is in zone montreal s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is in zone montreal,', function () {
                try {
                    parser.parse("member is in zone montreal,");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['whitespace', 'zoneCode']);
                }
            });

            it('member is in zone montreal,laval', function () {
                try {
                    parser.parse("member is in zone montreal,laval s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is in range of', function () {
                try {
                    parser.parse("member is in range of");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is in range of beacon', function () {
                try {
                    parser.parse("member is in range of beacon");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is in range of beacon montreal', function () {
                try {
                    parser.parse("member is in range of beacon montreal s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is in range of beacon montreal,', function () {
                try {
                    parser.parse("member is in range of beacon montreal,");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is in range of beacon montreal,laval', function () {
                try {
                    parser.parse("member is in range of beacon montreal,laval s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI', function () {
                try {
                    parser.parse('member is with RSSI ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['below', 'between', 'over']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI over', function () {
                try {
                    parser.parse('member is with RSSI over');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member is with RSSI over 3', function () {
                try {
                    parser.parse('member is with RSSI over 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI over 3 from', function () {
                try {
                    parser.parse('member is with RSSI over 3 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI over 3 from beacon', function () {
                try {
                    parser.parse('member is with RSSI over 3 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is with RSSI over 3 from beacon bob', function () {
                try {
                    parser.parse('member is with RSSI over 3 from beacon bob s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI over 3 from beacon bob,', function () {
                try {
                    parser.parse('member is with RSSI over 3 from beacon bob,');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is with RSSI below', function () {
                try {
                    parser.parse('member is with RSSI over');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member is with RSSI below 3', function () {
                try {
                    parser.parse('member is with RSSI below 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI below 3 from', function () {
                try {
                    parser.parse('member is with RSSI below 3 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI below 3 from beacon', function () {
                try {
                    parser.parse('member is with RSSI below 3 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is with RSSI below 3 from beacon bob', function () {
                try {
                    parser.parse('member is with RSSI below 3 from beacon bob s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI below 3 from beacon bob,', function () {
                try {
                    parser.parse('member is with RSSI below 3 from beacon bob,');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is with RSSI between', function () {
                try {
                    parser.parse('member is with RSSI over');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member is with RSSI between 3', function () {
                try {
                    parser.parse('member is with RSSI between 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI between 3 and', function () {
                try {
                    parser.parse('member is with RSSI between 3 and');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member is with RSSI between 3 and 4', function () {
                try {
                    parser.parse('member is with RSSI between 3 and 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI between 3 and 4 from', function () {
                try {
                    parser.parse('member is with RSSI between 3 and 4 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI between 3 and 4 from beacon', function () {
                try {
                    parser.parse('member is with RSSI between 3 and 4 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });

            it('member is with RSSI between 3 and 4 from beacon bob', function () {
                try {
                    parser.parse('member is with RSSI between 3 and 4 from beacon bob s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql([',', 'and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member is with RSSI between 3 and 4 from beacon bob,', function () {
                try {
                    parser.parse('member is with RSSI between 3 and 4 from beacon bob,');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode', 'whitespace']);
                }
            });


        });

    });
});
