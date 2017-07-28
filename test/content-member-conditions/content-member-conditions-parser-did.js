'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Content Member Conditions did:', function () {

		before(function (done) {
			return helper.contentParser().then(function(newParser){
				parser = newParser;
				done()
			});
		});

		describe('should parse did condition', function () {

			it('member did nothing', function (done) {

				var rule = parser.parse('member did nothing');
				should(rule).eql({
					conditions: [
						{
							scope: 'member',
							type: 'did',
							query: {
								type: 'nothing'
							}
						}
					]
				});
				done();
			});

			it('member did something', function (done) {

				var rule = parser.parse('member did something');
				should(rule).eql({
					conditions: [
						{
							scope: 'member',
							type: 'did',
							query: {
								type: 'something'
							}
						}
					]
				});
				done();
			});

			describe('action', function () {

				it('member did action TEST with jean < 2 & bob = 3', function (done) {

					var rule = parser.parse('member did action TEST with jean < 2& bob = 3');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											operator: '=',
											name: 'bob',
											value: 3
										}
									]
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 less than 3 times', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 less than 3 times');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 at least once', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 at least once');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										}
									]
								},
								occurrenceFilter: {
									type: 'least',
									frequency: 1
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 at least 3 times', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 at least 3 times');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										}
									]
								},
								occurrenceFilter: {
									type: 'least',
									frequency: 3
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 before 2016-03-03 04:40', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 before 2016-03-03  04:40');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										}
									]
								},
								periodFilter: {
									type: 'before',
									date: '2016-03-03 04:40'
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03 04:40 pm', function (done) {

					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03 04:40 pm');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'before',
									date: '2016-03-03 16:40'
								}
							}
						]
					});
					done();
				});

				it('member did not action TEST with jean < "thomas" less than 3 times in geofence montreal,laval after 2016-03-03 4:40', function () {
					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times in geofence montreal,laval after 2016-03-03 4:40');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'after',
									date: '2016-03-03 04:40'
								},
								geoFilter: {
									type: 'geofence',
									geofenceCodes: ['montreal', 'laval']
								}
							}
						]
					});
				});

				it('member did not action TEST with jean < "thomas" less than 3 times in range of beacon BEACON1,BEACON2 since did action eat', function () {

					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times in range of beacon BEACON1,BEACON2 since did action eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									scope: 'action',
									actionCode: 'eat'
								},
								geoFilter: {
									type: 'in_range',
									beaconCodes: ['BEACON1', 'BEACON2']
								}
							}
						]
					});
				});

				it('member did not action TEST with jean < "thomas" less than 3 times with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last check-in eat', function () {
					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last check-in eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									position: 'last',
									scope: 'check-in',
									checkinCode: 'eat'
								},
								geoFilter: {
									type: 'rssi_below',
									rssiValue: 3,
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

				it('member did not action TEST with jean < "thomas" less than 3 times with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first action eat', function () {
					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first action eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									position: 'first',
									scope: 'action',
									actionCode: 'eat'
								},
								geoFilter: {
									type: 'rssi_over',
									rssiValue: 3,
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

				it('member did not action TEST with jean < "thomas" less than 3 times with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since recieved prize bob', function () {
					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since received prize bob');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'TEST',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_received',
									scope: 'prize',
									prizeCode: 'bob'
								},
								geoFilter: {
									type: 'rssi_between',
									rssiValues: [3, 4],
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

			});

			describe('check-in', function () {

				it('member did check-in TEST with jean < 2 & bob = 3', function (done) {

					var rule = parser.parse('member did check-in TEST with jean < 2& bob = 3');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											operator: '=',
											name: 'bob',
											value: 3
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 less than 3 times', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 less than 3 times');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 at least once', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 at least once');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'least',
									frequency: 1
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 at least 3 times', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 at least 3 times');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'least',
									frequency: 3
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 before 2016-03-03 04:40', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 before 2016-03-03  04:40');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: 2
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								periodFilter: {
									type: 'before',
									date: '2016-03-03 04:40'
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03 04:40 pm', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03 04:40 pm');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'before',
									date: '2016-03-03 16:40'
								}
							}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times in geofence montreal,laval after 2016-03-03 4:40', function () {
					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times in geofence montreal,laval after 2016-03-03 4:40');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'after',
									date: '2016-03-03 04:40'
								},
								geoFilter: {
									type: 'geofence',
									geofenceCodes: ['montreal', 'laval']
								}
							}
						]
					});
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times in range of beacon BEACON1,BEACON2 since did action eat', function () {

					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times in range of beacon BEACON1,BEACON2 since did action eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									scope: 'action',
									actionCode: 'eat'
								},
								geoFilter: {
									type: 'in_range',
									beaconCodes: ['BEACON1', 'BEACON2']
								}
							}
						]
					});
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last action eat', function () {
					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI below 3 from beacon BEACON1,BEACON2,BEACON3 since did last action eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									position: 'last',
									scope: 'action',
									actionCode: 'eat'
								},
								geoFilter: {
									type: 'rssi_below',
									rssiValue: 3,
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first check-in eat', function () {
					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI over 3 from beacon BEACON1,BEACON2,BEACON3 since did first check-in eat');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_did',
									position: 'first',
									scope: 'check-in',
									checkinCode: 'eat'
								},
								geoFilter: {
									type: 'rssi_over',
									rssiValue: 3,
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since recieved prize bob', function () {
					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times with RSSI between 3  and 4 from beacon BEACON1,BEACON2,BEACON3 since received prize bob');
					should(rule).eql({
						conditions: [
							{
								scope: 'member',
								type: 'did',
								negative: true,
								query: {
									type: 'action',
									actionCode: 'check-in',
									conditions: [
										{
											operator: '<',
											name: 'jean',
											value: "thomas"
										},
										{
											name: 'checkin_code',
											operator: '=',
											value: 'TEST'
										}
									]
								},
								occurrenceFilter: {
									type: 'less',
									frequency: 3
								},
								periodFilter: {
									type: 'since_received',
									scope: 'prize',
									prizeCode: 'bob'
								},
								geoFilter: {
									type: 'rssi_between',
									rssiValues: [3, 4],
									beaconCodes: ['BEACON1', 'BEACON2', 'BEACON3']
								}
							}
						]
					});
				});

			});

		});

	});
});