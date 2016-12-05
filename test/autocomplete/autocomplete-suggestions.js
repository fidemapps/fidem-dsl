'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('../helper'),
  PEG = require('pegjs');
var Promise = require('bluebird');

var parser;
var autocompleteOption = require('./../../lib/autocomplete/autocomplete-suggestions');

describe('<Unit Test>', function () {
  var test = function (parser, string, cursorPosition, expected) {
    var result = autocompleteOption.options(parser, string, cursorPosition);
    result.should.eql(expected);
  };

  describe('Autocomplete options', function () {

    describe('findBreak', function () {

      it('should find [0,0] if passed the empty string', function () {
        var positions = autocompleteOption.findBreakPositions('', 0);
        positions.should.eql([0, 0])
      });

      it('should find [0,10] if only one word of length 10', function () {
        var positions = autocompleteOption.findBreakPositions('abcdqeushe', 10);
        positions.should.eql([0, 10])
      });

      it('should find [2,10] if two word separated by a whitespace', function () {
        var positions = autocompleteOption.findBreakPositions('a slkjhfsd', 10);
        positions.should.eql([2, 10])
      });

      it('should find [5,10] if three word separated by a whitespace', function () {
        var positions = autocompleteOption.findBreakPositions('a ds slkjhfsd', 10);
        positions.should.eql([5, 10])
      });

      it('should find the last space before the current position', function () {
        var positions = autocompleteOption.findBreakPositions('a ds slkjhfsd askdjfh asdkfjh  aalskdjfh asdkfjhas dflaksjdfh asdfk', 10);
        positions.should.eql([5, 10])
      });

    });

    describe('setBreak', function () {

      it('should handle empty position', function () {
        var parsingString = autocompleteOption.setBreaksInString("asdlkfjhaskdjfh askdjfha lsjdfh askjfhalks ", []);
        parsingString.should.eql([]);
      });

      it('should put the "#" at the end if the position is way over the string length', function () {
        var parsingString = autocompleteOption.setBreaksInString('this is a random string', [300]);
        parsingString[0].should.equal('this is a random string#');
      });

      it('should put the "#" at the start if the position is negative', function () {
        var parsingString = autocompleteOption.setBreaksInString('this is a random string', [-2]);
        parsingString[0].should.equal('#this is a random string');
      });

      it('should set the break exactly where I say so without loosing nothing of the original string', function () {
        var parsingString = autocompleteOption.setBreaksInString('this is a random string', [3]);
        parsingString[0].should.equal('thi#s is a random string');
      });

      it('should support multiple position and produce multiple string with "#" at the corresponding position', function () {
        var parsingStrings = autocompleteOption.setBreaksInString("member did action ea,askdjfh", [2, 5, 11]);
        parsingStrings[0].should.equal("me#mber did action ea,askdjfh");
        parsingStrings[1].should.equal("membe#r did action ea,askdjfh");
        parsingStrings[2].should.equal("member did #action ea,askdjfh");
      });

    });

    describe('parseStrings - challenge-availability-rules-parser', function () {

      before(function (done) {
        fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
          if (err) {
            return done(err);
          }
          parser = PEG.buildParser(data);
          done();
        });
      });
   
      it('should not throw error when current word contains regex special characters', function () {
        should(function () {
          autocompleteOption.parseStrings(parser, ["#", "#"], ' .*+?^$}{)(|][');
        }).not.throw()
      });

      it('should return that it need to load the action code for the autocomplete action', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["member did action #eat", "member did action eat#"], 'eat');
        suggestion.should.eql({ codeToLoad: ['actionCode'], literal: [] });
      });

      it('should return the current word if the word is completed', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["member did action eat #and", "member did action eat and#"], 'and');
        suggestion.should.eql({ codeToLoad: [], literal: ['and'] });
      });

      it('should only return the word being completed when the full word is entered', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["every monday,#firday", "every monday,friday#"], 'friday');
        suggestion.should.eql({ codeToLoad: [], literal: ['friday'] });
      });

      it('should return the the word being completed if not finish', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["every #monday,#firday", "every mond#"], 'monday');
        suggestion.should.eql({ codeToLoad: [], literal: ['monday'] });
      });

      it('will return the composed word even if half way thought', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["member did something at #l", "member did something at l#"], 'l');
        suggestion.should.eql({ codeToLoad: [], literal: ['at least', 'exactly', 'less than'] });
      });

      it('will return the composed word even if almost at the end', function () {
        var suggestion = autocompleteOption.parseStrings(parser, ["member did something at #lea", "member did something at lea#"], 'lea');
        suggestion.should.eql({ codeToLoad: [], literal: ['at least'] });
      });

    });

    describe('options', function () {

      before(function (done) {
        fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
          if (err) {
            return done(err);
          }
          parser = PEG.buildParser(data);
          done();
        });
      });

      it('should and have only an action code if ', function () {
        return test(parser, 'member did action e', 'member did action e'.length, {
          codeToLoad: ['actionCode'],
          literal: []
        });
      });

      it('should return the current word if in a literal', function () {
        return test(parser, "member did action eat and", "member did action eat and".length, {
          codeToLoad: [],
          literal: ['and']
        });
      });

      it('should return the next word if separated by a space', function () {
        return test(parser, "member did action eat and ", "member did action eat and ".length, {
          codeToLoad: [],
          literal: [
            'belongs to smartlist',
            'challenge',
            'every',
            'in geofence',
            'level',
            'member',
            'on',
            'tag'
          ]
        });
      });

      it('will return all the possible word if there is a literal', function () {
        return test(parser, 'member did action eat at ', 'member did action eat at '.length, {
          codeToLoad: [],
          literal: [
            'after',
            'and',
            'at least',
            'before',
            'between',
            'exactly',
            'in',
            'less than',
            'with'
          ]
        });
      })

    });

  });

})
;
