"use strict";

var _ = require('lodash');

var separationCharacter = [',', ' ', '&'];

module.exports = {

  options: function (parser, string, position) {
    var positions = this.findBreakPositions(string, position);
    var word = string.substring(positions[0], positions[1]);
    var strings = this.setBreaksInString(string, positions);
    return this.parseStrings(parser, strings, word);
  },

  findBreakPositions: function (string, currentPosition) {

    var afterLastWordCurrentPosition = currentPosition;

    var beforeLastWordCurrentPosition = _.reduce(separationCharacter, function (beforeLastWordCurrentPosition, character) {
      return _.max([string.substring(0, currentPosition).lastIndexOf(character) + 1, beforeLastWordCurrentPosition])
    }, 0);

    return [beforeLastWordCurrentPosition, afterLastWordCurrentPosition];
  },

  setBreaksInString: function (string, positions) {

    var breaks = [];

    _.forEach(positions, function (position) {
      breaks.push(string.substring(0, position) + '#' + string.substring(position));
    });

    return breaks;
  },

  parseStrings: function (parser, strings, word) {
    var result = null;
    try {
      result = parser.parse(strings[[0]]);
    }
    catch (e) {
      var failuresExpected = this.buildSuggestionsList(e.expected, word)
      if (failuresExpected.literal.indexOf(word) === -1) {
        return failuresExpected;
      }

      return failuresExpected;
    }

    return result;
  },

  buildSuggestionsList: function (expecteds, word) {
    var _this = this;
    var suggestions = { literal: [], codeToLoad: [] };

    _.forEach(expecteds, function (expected) {
      switch (expected.type) {
        case 'literal':
          suggestions.literal.push(_this.buildSuggestion(expected.value, word));
          break;
        case 'other':
          if (expected.description.lastIndexOf('Code') !== -1) {
            suggestions.codeToLoad.push(expected.description);
            break;
          }
      }
    });

    suggestions.literal = _.compact(suggestions.literal);
    suggestions.codeToLoad = _.compact(suggestions.codeToLoad);

    return suggestions
  },

  buildSuggestion: function (suggestion, startWith) {
    if (!startWith) {
      return suggestion;
    }
    
    if (suggestion.match(_.escapeRegExp(startWith))) {
      return suggestion;
    }
    
    return null;
  }

};

