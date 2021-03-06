'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Auto-Complete Content Member Conditions has been:', function () {
		var literalChoices;
		var otherChoices;

		before(function (done) {
			return helper.contentParser().then(function (newParser) {
				parser = newParser;
				done()
			});
		});

		describe('has been', function () {

			it('member has been ', function () {
				try {
					parser.parse('member has been ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(4);
					should(literalChoices).eql(['in geofence', 'in range of', 'with RSSI']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has not been ', function () {
				try {
					parser.parse('member has not been ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(4);
					should(literalChoices).eql(['in geofence', 'in range of', 'with RSSI']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been in geofence ', function () {
				try {
					parser.parse('member has been in geofence ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['geofenceCode', 'whitespace']);
				}
			});

			it('member has been in geofence bob', function () {
				try {
					parser.parse('member has been in geofence bob s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been in geofence bob,', function () {
				try {
					parser.parse('member has been in geofence bob,');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['geofenceCode', 'whitespace']);
				}
			});

			it('member has been in geofence bob,pierre', function () {
				try {
					parser.parse('member has been in geofence bob,pierre s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been in range of ', function () {
				try {
					parser.parse('member has been in range of ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['beacon']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been in range of beacon ', function () {
				try {
					parser.parse('member has been in range of beacon ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been in range of beacon bob', function () {
				try {
					parser.parse('member has been in range of beacon bob s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been in range of beacon bob,', function () {
				try {
					parser.parse('member has been in range of beacon bob, ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI', function () {
				try {
					parser.parse('member has been with RSSI ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(4);
					should(literalChoices).eql(['below', 'between', 'over']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI over ', function () {
				try {
					parser.parse('member has been with RSSI over ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['number', 'whitespace']);
				}
			});

			it('member has been with RSSI over 3 ', function () {
				try {
					parser.parse('member has been with RSSI over 3 ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['from']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI over 3 from ', function () {
				try {
					parser.parse('member has been with RSSI over 3 from ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['beacon']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI over 3 from beacon ', function () {
				try {
					parser.parse('member has been with RSSI over 3 from beacon ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI over 3 from beacon bob', function () {
				try {
					parser.parse('member has been with RSSI over 3 from beacon bob s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI over 3 from beacon bob,', function () {
				try {
					parser.parse('member has been with RSSI over 3 from beacon bob,');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI below ', function () {
				try {
					parser.parse('member has been with RSSI below ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['number', 'whitespace']);
				}
			});

			it('member has been with RSSI below 3 ', function () {
				try {
					parser.parse('member has been with RSSI below 3 ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['from']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI below 3 from ', function () {
				try {
					parser.parse('member has been with RSSI below 3 from ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['beacon']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI below 3 from beacon ', function () {
				try {
					parser.parse('member has been with RSSI below 3 from beacon ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI below 3 from beacon bob', function () {
				try {
					parser.parse('member has been with RSSI below 3 from beacon bob s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI below 3 from beacon bob,', function () {
				try {
					parser.parse('member has been with RSSI below 3 from beacon bob,');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI between ', function () {
				try {
					parser.parse('member has been with RSSI between ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['number', 'whitespace']);
				}
			});

			it('member has been with RSSI between 3 ', function () {
				try {
					parser.parse('member has been with RSSI between 3 ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['and']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI between 3 and ', function () {
				try {
					parser.parse('member has been with RSSI between 3 and ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['number', 'whitespace']);
				}
			});

			it('member has been with RSSI between 3 and 4 ', function () {
				try {
					parser.parse('member has been with RSSI between 3 and 4 ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['from']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI between 3 and 4 from ', function () {
				try {
					parser.parse('member has been with RSSI between 3 and 4 from ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql(['beacon']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI between 3 and 4 from beacon ', function () {
				try {
					parser.parse('member has been with RSSI between 3 and 4 from beacon ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(2);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['beaconCode', 'whitespace']);
				}
			});

			it('member has been with RSSI between 3 and 4 from beacon bob', function () {
				try {
					parser.parse('member has been with RSSI between 3 and 4 from beacon bob s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(10);
					should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member has been with RSSI between 3 and 4 from beacon bob,', function () {
				try {
					parser.parse('member has been with RSSI between 3 and 4 from beacon bob,');
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