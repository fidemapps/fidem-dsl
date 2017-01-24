'use strict';

var fs = require('fs'),
	Promise = require('bluebird'),
	PEG = require('pegjs');

var smartlistParser;
var challengeAvailabilityParser;
var challengeParser;
var contentParser;


module.exports.extractLiterals = function (err) {
	return err.expected.filter(function (choice) {
		return choice.type === 'literal';
	}).map(function (choice) {
		return choice.value;
	});
};

module.exports.extractOthers = function (err) {
	return err.expected.filter(function (choice) {
		return choice.type === 'other';
	}).map(function (choice) {
		return choice.description;
	});
};

module.exports.smartlistParser = function () {

	return new Promise(function (resolve, reject) {

		if (smartlistParser) {
			return resolve(smartlistParser);
		}

		fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
			if (err) {
				return reject(err);
			}
			smartlistParser = PEG.buildParser(data);
			return resolve(smartlistParser)

		});
	})

};

module.exports.challengeAvailabilityParser = function () {

	return new Promise(function (resolve, reject) {

		if (challengeAvailabilityParser) {
			return resolve(challengeAvailabilityParser);
		}

		fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
			if (err) {
				return reject(err);
			}
			challengeAvailabilityParser = PEG.buildParser(data);
			return resolve(challengeAvailabilityParser)

		});
	})

};

module.exports.challengeParser = function () {

	return new Promise(function (resolve, reject) {

		if (challengeParser) {
			return resolve(challengeParser);
		}

		fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
			if (err) {
				return reject(err);
			}
			challengeParser = PEG.buildParser(data);
			return resolve(challengeParser)

		});
	})

};

module.exports.contentParser = function () {

	return new Promise(function (resolve, reject) {

		if (contentParser) {
			return resolve(contentParser);
		}

		fs.readFile(__dirname + '/../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
			if (err) {
				return reject(err);
			}
			contentParser = PEG.buildParser(data);
			return resolve(contentParser)

		});
	})

};