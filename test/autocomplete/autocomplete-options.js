'use strict';

var should = require('should'),
	fs = require('fs'),
	helper = require('../helper'),
	PEG = require('pegjs');
var Promise = require('bluebird');

var parser;
var autocompleteOption = require('./../../lib/autocomplete/autocomplete-suggestion');

describe('<Unit Test>', function () {
	let test = function (parser, string, cursorPosition, expected) {
		return autocompleteOption.options(parser, string, cursorPosition).then((result)=> {
			result.should.eql(expected);
		})
	};

	describe.only('Autocomplete options', function () {

		describe('findBreak', function () {

			it('should find [0,0] if passed the empty string', function () {
				return autocompleteOption.findBreakPositions('', 0)
					.then((positions)=> {
						positions.should.eql([0, 0])
					});
			});

			it('should find [0,10] if only one word of length 10', function () {
				return autocompleteOption.findBreakPositions('abcdqeushe', 10)
					.then((positions)=> {
						positions.should.eql([0, 10])
					});
			});

			it('should find [2,10] if two word separated by a whitespace', function () {
				return autocompleteOption.findBreakPositions('a slkjhfsd', 10)
					.then((positions)=> {
						positions.should.eql([2, 10])
					});
			});

			it('should find [5,10] if three word separated by a whitespace', function () {
				return autocompleteOption.findBreakPositions('a ds slkjhfsd', 10)
					.then((positions)=> {
						positions.should.eql([5, 10])
					});
			});

			it('should find the last space before the current position', function () {
				return autocompleteOption.findBreakPositions('a ds slkjhfsd askdjfh asdkfjh  aalskdjfh asdkfjhas dflaksjdfh asdfk', 10)
					.then((positions)=> {
						positions.should.eql([5, 10])
					});
			});

		});

		describe('setBreak', function () {

			it('should handle empty position', function () {

				return autocompleteOption.setBreaksInString("asdlkfjhaskdjfh askdjfha lsjdfh askjfhalks ", [])
					.then((parsingString) => {
						parsingString.should.eql([]);
					})
			});

			it('should put the "#" at the end if the position is way over the string length', function () {
				return autocompleteOption.setBreaksInString('this is a random string', [300]).then((parsingString)=> {
					parsingString[0].should.equal('this is a random string#');
				});
			});

			it('should put the "#" at the start if the position is negative', function () {
				return autocompleteOption.setBreaksInString('this is a random string', [-2]).then((parsingString)=> {
					parsingString[0].should.equal('#this is a random string');
				});
			});

			it('should set the break exactly where I say so without loosing nothing of the original string', function () {
				return autocompleteOption.setBreaksInString('this is a random string', [3]).then((parsingString)=> {
					parsingString[0].should.equal('thi#s is a random string');
				});
			});

			it('should support multiple position and produce multiple string with "#" at the corresponding position', function () {

				return autocompleteOption.setBreaksInString("member did action ea,askdjfh", [2, 5, 11])
					.then((parsingStrings) => {
						parsingStrings[0].should.equal("me#mber did action ea,askdjfh");
						parsingStrings[1].should.equal("membe#r did action ea,askdjfh");
						parsingStrings[2].should.equal("member did #action ea,askdjfh");
					})
			});

		});

		describe('parseStrings - challenge-availability-rules-parser', function () {

			before(function (done) {
				fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
					if ( err ) {
						return done(err);
					}
					parser = PEG.buildParser(data);
					done();
				});
			});

			it('should return that it need to load the action code for the autocomplete action', function () {

				return autocompleteOption.parseStrings(parser, ["member did action #eat", "member did action eat#"], 'eat').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: ['actionCode'], literal: []});
				})
			});

			it('should return the current word if the word is completed', function () {

				return autocompleteOption.parseStrings(parser, ["member did action eat #and", "member did action eat and#"], 'and').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: [], literal: ['and']});
				})
			});

			it('should only return the word being completed when the full word is entered', function () {

				return autocompleteOption.parseStrings(parser, ["every monday,#firday", "every monday,friday#"], 'friday').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: [], literal: ['friday']});
				})
			});

			it('should return the the word being completed if not finish', function () {

				return autocompleteOption.parseStrings(parser, ["every #monday,#firday", "every mond#"], 'monday').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: [], literal: ['monday']});
				})
			});

			it('will return the composed word even if half way thought', function () {

				return autocompleteOption.parseStrings(parser, ["member did something at #l", "member did something at l#"], 'l').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: [], literal: ['at least', 'exactly', 'less than']});
				})
			});

			it('will return the composed word even if almost at the end', function () {

				return autocompleteOption.parseStrings(parser, ["member did something at #lea", "member did something at lea#"], 'lea').then((suggestion)=> {
					suggestion.should.eql({codeToLoad: [], literal: ['at least']});
				})
			});

		});

		describe('options', function () {

			before(function (done) {
				fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
					if ( err ) {
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

});
