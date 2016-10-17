"use strict";
var Promise = require('bluebird');
var _ = require('lodash');

var separationCharacter = [',', ' ', '&'];

module.exports = {

	options: function (parser, string, position) {
		var _this = this;

		return this.findBreakPositions(string, position)
			.then(function (positions) {

				var word = string.substring(positions[0], positions[1]);
				return _this.setBreaksInString(string, positions)
					.then(function(strings){return _this.parseStrings(parser, strings, word)});
			})

	},

	findBreakPositions: function (string, currentPosition) {

		var afterLastWordCurrentPosition = currentPosition;

		var beforeLastWordCurrentPosition = _.reduce(separationCharacter, function(beforeLastWordCurrentPosition, character) {
			return _.max([string.substring(0, currentPosition).lastIndexOf(character) + 1, beforeLastWordCurrentPosition])
		}, 0);

		return Promise.resolve([beforeLastWordCurrentPosition, afterLastWordCurrentPosition]);
	},

	setBreaksInString: function (string, positions) {

		return Promise.map(positions, function(position){return string.substring(0, position) + '#' + string.substring(position)});

	},

	parseStrings: function (parser, strings, word) {
		var _this = this;

		return new Promise(function(resolve, reject) {
			resolve(parser.parse(strings[[0]]))
		}).then(function(){return null})
			.catch(function(e) {
				return _this.buildSuggestionsList(e.expected, word)
					.then(function (failuresExpected) {
						if ( failuresExpected.literal.indexOf(word) === -1 ) {
							return failuresExpected;
						}
						return failuresExpected;
					})
			});

	},

	buildSuggestionsList: function (expecteds, word) {
		var suggestions = {literal: [], codeToLoad: []};
		var _this = this;

		return Promise.map(expecteds, function (expected)  {
			switch (expected.type) {
				case 'literal':
					suggestions.literal.push(_this.buildSuggestion(expected.value, word));
					break;
				case 'other':
					if ( expected.description.lastIndexOf('Code') !== -1 ) {
						suggestions.codeToLoad.push(expected.description);

						break;
					}
			}
		})
			.then(function () {
				suggestions.literal = _.compact(suggestions.literal);
				suggestions.codeToLoad = _.compact(suggestions.codeToLoad);
				return suggestions
			})
	},

	buildSuggestion: function (suggestion, startWith) {
		if ( !startWith ) {
			return suggestion;
		}

		if ( suggestion.match(startWith) ) {
			return suggestion;
		}

		return null;
	},

};

