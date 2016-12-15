'use strict';

var should = require('should'),
	fs = require('fs'),
	helper = require('../helper'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
	describe('Member challenge Rules moment filter:', function () {
		before(function (done) {
			fs.readFile(__dirname + '/../../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
				if ( err ) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('before', function () {

			it('member did something before 11:00 pm give 1 point', function () {
				var rule = parser.parse('member did something before 11:00 pm give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['23:00'], type: 'before'});

			});

			it('member did something before 11:00 am give 1 point', function () {
				var rule = parser.parse('member did something before 11:00 am give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['11:00'], type: 'before'});

			});

			it('member did something before 11:00 give 1 point', function () {

				var rule = parser.parse('member did something before 11:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['11:00'], type: 'before'});

			});

			it('member did something before 22:00 give 1 point', function () {

				var rule = parser.parse('member did something before 23:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['23:00'], type: 'before'});

			});

		});

		describe('after', function () {

			it('member did something after 11:00 pm give 1 point', function () {
				var rule = parser.parse('member did something after 11:00 pm give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['23:00'], type: 'after'});

			});

			it('member did something after 11:00 am give 1 point', function () {
				var rule = parser.parse('member did something after 11:00 am give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['11:00'], type: 'after'});

			});

			it('member did something after 11:00 give 1 point', function () {

				var rule = parser.parse('member did something after 11:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['11:00'], type: 'after'});

			});

			it('member did something after 22:00 give 1 point', function () {

				var rule = parser.parse('member did something after 23:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['23:00'], type: 'after'});

			});

		});

		describe('between', function () {

			it('member did something between 11:00 and 12:00 give 1 point', function () {
				var rule = parser.parse('member did something between 11:00 and 12:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['11:00', '12:00'], type: 'between'});
			});

			it('member did something between 11:00 pm and 12:00 give 1 point', function () {
				var rule = parser.parse('member did something between 11:00 pm and 12:00 give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['23:00', '12:00'], type: 'between'});
			});

			it('member did something between 13:00 and 12:00 am give 1 point', function () {
				var rule = parser.parse('member did something between 13:00 and 12:00 am give 1 point');
				should(rule.rules[0].moment_filter).eql({times: ['13:00', '12:00'], type: 'between'});
			});

		});

		describe('during', function () {

			it('member did something during the night give 1 point', function () {

				var rule = parser.parse('member did something during the night give 1 point');
				should(rule.rules[0].moment_filter).eql({moment: 'night', type: 'during'});

			});

			it('member did something during the morning give 1 point', function () {

				var rule = parser.parse('member did something during the morning give 1 point');
				should(rule.rules[0].moment_filter).eql({moment: 'morning', type: 'during'});

			});

			it('member did something during the afternoon give 1 point', function () {

				var rule = parser.parse('member did something during the afternoon give 1 point');
				should(rule.rules[0].moment_filter).eql({moment: 'afternoon', type: 'during'});

			});

			it('member did something during the evening give 1 point', function () {

				var rule = parser.parse('member did something during the evening give 1 point');
				should(rule.rules[0].moment_filter).eql({moment: 'evening', type: 'during'});

			});

		});

		describe('complex combination', function () {

			it('member did eat before 2012-10-10 12:00 pm before 12:00 pm give 1 point', function () {

				var rule = parser.parse('member did action eat before 2012-10-10 12:00 pm before 12:00 pm give 1 point');
				should(rule.rules[0].period_filter).eql({ dates: [ '2012-10-10T24:00:00' ], type: 'before' });
				should(rule.rules[0].moment_filter).eql({times: ['24:00'], type: 'before'});


			});

			it('member did eat before 2012-10-10 before 12:00 pm give 1 point', function () {

				var rule = parser.parse('member did action eat before 2012-10-10 before 12:00 pm give 1 point');
				should(rule.rules[0].period_filter).eql({ dates: [ '2012-10-10T00:00:00' ], type: 'before' });
				should(rule.rules[0].moment_filter).eql({times: ['24:00'], type: 'before'});


			});
		});

	});
});