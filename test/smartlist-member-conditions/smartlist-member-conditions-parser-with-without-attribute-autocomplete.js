'use strict';

const should = require('should'),
	fs = require('fs'),
	helper = require('../helper'),
	PEG = require('pegjs');
let literalChoices,
	otherChoices;

let parser;

describe('<Unit Test>', () => {
	describe('Auto-Complete List Member Conditions "with attribute":', () => {

		before((done) => {
			fs.readFile(__dirname + '/../../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', (err, data) => {
				if (err) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('with/without attribute rule', () => {

			it('member with attribute', () => {
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

			it('member without attribute', () => {
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

			describe('gender', () => {

				it('member with atttribute gender', () => {

					try {
						parser.parse('member with attribute gender s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}

				});

				it('member with atttribute gender equal to', () => {

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

				it('member with atttribute gender equal to male d', () => {

					try {
						parser.parse('member with attribute gender equal to male d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}

				});

			});

			describe('age', () => {

				it('member with attribute age s', () => {
					try {
						parser.parse('member with attribute age d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(8);
						should(literalChoices).eql(['<', '<=', '=', '>', '>=', 'and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute age =', () => {
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

				it('member with attribute age = 4', () => {
					try {
						parser.parse('member with attribute age = 4 s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('language', () => {

				it('member with attribute language', () => {

					try {
						parser.parse('member without attribute language s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}

				});

				it('member with attribute language equal to', () => {

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

				it('member with attribute language equal to Ca', () => {

					try {
						parser.parse('member without attribute language equal to Ca d');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}

				});

			});

			describe('address', () => {

				it('member with attribute address', () => {
					try {
						parser.parse('member without attribute address s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(8);
						should(literalChoices).eql(['and', 'city', 'country', 'state', 'street', 'zip']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address city', () => {
					try {
						parser.parse('member without attribute address city s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address city equal to', () => {
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

				it('member with attribute address city equal to laval', () => {
					try {
						parser.parse('member without attribute address city equal to laval s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address state', () => {
					try {
						parser.parse('member without attribute address state s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address state equal to', () => {
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

				it('member with attribute address state equal to qc', () => {
					try {
						parser.parse('member without attribute address state equal to qc s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address country', () => {
					try {
						parser.parse('member without attribute address country s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'equal to']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address country equal to', () => {
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

				it('member with attribute address country equal to Canada', () => {
					try {
						parser.parse('member without attribute address country equal to Canada s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address street', () => {
					try {
						parser.parse('member without attribute address street s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute address zip', () => {
					try {
						parser.parse('member without attribute address zip s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('first name', () => {

				it('member with attribute first name ', () => {
					try {
						parser.parse('member without attribute first name s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('last name', () => {

				it('member with attribute last name ', () => {
					try {
						parser.parse('member without attribute last name s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('alias', () => {

				it('member with attribute alias ', () => {
					try {
						parser.parse('member without attribute alias s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('picture', () => {

				it('member with attribute picture ', () => {
					try {
						parser.parse('member without attribute picture s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('external id', () => {

				it('member with attribute external id ', () => {
					try {
						parser.parse('member without attribute external id s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('email', () => {

				it('member with attribute email', () => {
					try {
						parser.parse('member without attribute email s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute email with type', () => {
					try {
						parser.parse('member without attribute email with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name','whitespace']);
					}
				});

				it('member without attribute email with type main', () => {
					try {
						parser.parse('member without attribute email with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('phone', () => {

				it('member with attribute phone', () => {
					try {
						parser.parse('member without attribute phone s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute phone with type', () => {
					try {
						parser.parse('member without attribute phone with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name','whitespace']);
					}
				});

				it('member without attribute phone with type main', () => {
					try {
						parser.parse('member without attribute phone with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

			describe('integration id', () => {

				it('member with attribute integration id', () => {
					try {
						parser.parse('member without attribute integration id s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(4);
						should(literalChoices).eql(['and', 'with type']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member with attribute integration id with type', () => {
					try {
						parser.parse('member without attribute integration id with type ');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(2);
						should(literalChoices).eql([]);
						should(otherChoices).eql(['name','whitespace']);
					}
				});

				it('member without attribute integration id with type main', () => {
					try {
						parser.parse('member without attribute integration id with type main s');
					} catch (err) {
						literalChoices = helper.extractLiterals(err);
						otherChoices = helper.extractOthers(err);
						should(err.expected.length).equal(3);
						should(literalChoices).eql(['and']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

		});

	});
});