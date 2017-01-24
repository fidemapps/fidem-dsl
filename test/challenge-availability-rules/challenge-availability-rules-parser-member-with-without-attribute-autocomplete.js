'use strict';

var should = require('should'),
	helper = require('../helper');

var literalChoices,
	otherChoices;

var parser;

describe('<Unit Test>', function () {
	describe('Auto-Complete Challenge Availability Member Condition Rules "with attribute":', function () {

		before(function (done) {
			return helper.challengeAvailabilityParser().then(function(newParser){
				parser = newParser;
				done()
			});
		});

		describe('with/without attribute rule', function () {

			it('member with attribute', function () {
				try {
					parser.parse('member with attribute ');
				} catch (err) {
					literalChoices = helper.extractLiterals(err);
					otherChoices = helper.extractOthers(err);
					should(err.expected.length).equal(13);
					should(literalChoices).eql(['address', 'age', 'alias', 'email', 'external id', 'first name', 'gender', 'integration id', 'language', 'last name', 'phone', 'picture']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member without attribute', function () {
				try {
					parser.parse('member without attribute ');
				} catch (err) {
					literalChoices = helper.extractLiterals(err);
					otherChoices = helper.extractOthers(err);
					should(err.expected.length).equal(13);
					should(literalChoices).eql(['address', 'age', 'alias', 'email', 'external id', 'first name', 'gender', 'integration id', 'language', 'last name', 'phone', 'picture']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			describe('gender', function () {

				it('member with atttribute gender', function () {

					try {
						parser.parse('member with attribute gender s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}

				});

				it('member with atttribute gender equal to', function () {

					try {
						parser.parse('member with attribute gender equal to ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['female', 'male', 'other']);
						should(otherChoices).eql(['whitespace']);
					}

				});

				it('member with atttribute gender equal to male d', function () {

					try {
						parser.parse('member with attribute gender equal to male d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}

				});

			});

			describe('age', function () {

				it('member with attribute age s', function () {
					try {
						parser.parse('member with attribute age d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(7);
						should(literalChoices).eql(['<', '<=', '=', '>', '>=', 'and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute age =', function () {
					try {
						parser.parse('member with attribute age =');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['number', 'whitespace']);
					}
				});

				it('member with attribute age = 4', function () {
					try {
						parser.parse('member with attribute age = 4 s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('language', function () {

				it('member with attribute language', function () {

					try {
						parser.parse('member without attribute language s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}

				});

				it('member with attribute language equal to', function () {

					try {
						parser.parse('member without attribute language equal to ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['languageCode', 'whitespace']);
					}

				});

				it('member with attribute language equal to ca', function () {

					try {
						parser.parse('member without attribute language equal to ca d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}

				});

			});

			describe('address', function () {

				it('member with attribute address', function () {
					try {
						parser.parse('member without attribute address s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(7);
						should(literalChoices).eql(['and', 'city', 'country', 'state', 'street', 'zip']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address city', function () {
					try {
						parser.parse('member without attribute address city s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address city equal to', function () {
					try {
						parser.parse('member without attribute address city equal to ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member with attribute address city equal to laval', function () {
					try {
						parser.parse('member without attribute address city equal to laval s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address state', function () {
					try {
						parser.parse('member without attribute address state s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address state equal to', function () {
					try {
						parser.parse('member without attribute address state equal to ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member with attribute address state equal to qc', function () {
					try {
						parser.parse('member without attribute address state equal to qc s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address country', function () {
					try {
						parser.parse('member without attribute address country s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address country equal to', function () {
					try {
						parser.parse('member without attribute address country equal to ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member with attribute address country equal to Canada', function () {
					try {
						parser.parse('member without attribute address country equal to Canada s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address street', function () {
					try {
						parser.parse('member without attribute address street s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address zip', function () {
					try {
						parser.parse('member without attribute address zip s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('first name', function () {

				it('member with attribute first name ', function () {
					try {
						parser.parse('member without attribute first name s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('last name', function () {

				it('member with attribute last name ', function () {
					try {
						parser.parse('member without attribute last name s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('alias', function () {

				it('member with attribute alias ', function () {
					try {
						parser.parse('member without attribute alias s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('picture', function () {

				it('member with attribute picture ', function () {
					try {
						parser.parse('member without attribute picture s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('external id', function () {

				it('member with attribute external id ', function () {
					try {
						parser.parse('member without attribute external id s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('email', function () {

				it('member with attribute email', function () {
					try {
						parser.parse('member without attribute email s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute email with type', function () {
					try {
						parser.parse('member without attribute email with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member without attribute email with type main', function () {
					try {
						parser.parse('member without attribute email with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('phone', function () {

				it('member with attribute phone', function () {
					try {
						parser.parse('member without attribute phone s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute phone with type', function () {
					try {
						parser.parse('member without attribute phone with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member without attribute phone with type main', function () {
					try {
						parser.parse('member without attribute phone with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('integration id', function () {

				it('member with attribute integration id', function () {
					try {
						parser.parse('member without attribute integration id s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute integration id with type', function () {
					try {
						parser.parse('member without attribute integration id with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name', 'whitespace']);
					}
				});

				it('member without attribute integration id with type main', function () {
					try {
						parser.parse('member without attribute integration id with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

		});

	});
});