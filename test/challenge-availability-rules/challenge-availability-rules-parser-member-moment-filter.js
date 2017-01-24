'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Availability Member Condition Rules moment filter:', function () {
		before(function (done) {
			return helper.challengeAvailabilityParser().then(function(newParser){
				parser = newParser;
				done()
			});
		});

		describe('before', function () {

			it('member did something before 11:00 pm', function () {
				var rule = parser.parse('member did something before 11:00 pm');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['23:00'], type: 'before'},
				}])

			});

			it('member did something before 11:00 am', function () {
				var rule = parser.parse('member did something before 11:00 am');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['11:00'], type: 'before'},
				}])

			});

			it('member did something before 11:00', function () {

				var rule = parser.parse('member did something before 11:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['11:00'], type: 'before'},
				}])

			});

			it('member did something before 22:00', function () {

				var rule = parser.parse('member did something before 23:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ["23:00"], type: 'before'},
				}])

			});

		});

		describe('after', function () {

			it('member did something after 11:00 pm', function () {
				var rule = parser.parse('member did something after 11:00 pm');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['23:00'], type: 'after'},
				}])

			});

			it('member did something after 11:00 am', function () {
				var rule = parser.parse('member did something after 11:00 am');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['11:00'], type: 'after'},
				}])

			});

			it('member did something after 11:00', function () {

				var rule = parser.parse('member did something after 11:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['11:00'], type: 'after'},
				}])

			});

			it('member did something after 22:00', function () {

				var rule = parser.parse('member did something after 23:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['23:00'], type: 'after'},
				}])

			});

		});

		describe('between', function () {

			it('member did something between 11:00 and 12:00', function () {
				var rule = parser.parse('member did something between 11:00 and 12:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['11:00', '12:00'], type: 'between'},
				}])
			});

			it('member did something between 11:00 pm and 12:00', function () {
				var rule = parser.parse('member did something between 11:00 pm and 12:00');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['23:00', '12:00'], type: 'between'},
				}])
			});

			it('member did something between 13:00 and 12:00 pm', function () {
				var rule = parser.parse('member did something between 13:00 and 12:00 pm');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {times: ['13:00', '12:00'], type: 'between'},
				}])
			});

		});

		describe('during', function () {

			it('member did something during the night', function () {

				var rule = parser.parse('member did something during the night');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {moment: 'night', type: 'during'},
				}])

			});

			it('member did something during the morning', function () {

				var rule = parser.parse('member did something during the morning');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {moment: 'morning', type: 'during'},
				}])

			});

			it('member did something during the afternoon', function () {

				var rule = parser.parse('member did something during the afternoon');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {moment: 'afternoon', type: 'during'},
				}])

			});

			it('member did something during the evening', function () {

				var rule = parser.parse('member did something during the evening');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: {type: 'something'},
					occurrence_filter: null,
					period_filter: null,
					moment_filter: {moment: 'evening', type: 'during'},
				}])

			});

		});

		describe('complex combination', function () {

			it('member did eat before 2012-10-10 12:00 pm before 12:00 am', function () {

				var rule = parser.parse('member did action eat before 2012-10-10 12:00 pm before 12:00 am');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: { code: 'eat', conditions: null, type: null },
					occurrence_filter: null,
					period_filter:  { dates: [ '2012-10-10T12:00:00' ], type: 'before' },
					moment_filter: {times: ['00:00'], type: 'before'},
				}]);

			});

			it('member did eat before 2012-10-10 before 12:00 am', function () {

				var rule = parser.parse('member did action eat before 2012-10-10 before 12:00 am');
				should(rule).eql([{
					scope: 'member',
					type: 'did',
					condition: { code: 'eat', conditions: null, type: null },
					occurrence_filter: null,
					period_filter:  { dates: [ '2012-10-10T00:00:00' ], type: 'before' },
					moment_filter: {times: ['00:00'], type: 'before'},
				}]);

			});
		});

	});
});