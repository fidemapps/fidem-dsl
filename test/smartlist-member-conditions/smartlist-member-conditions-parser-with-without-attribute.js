'use strict';

var should = require('should'),
	fs = require('fs'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', function() {
	describe('SmartList Member Conditions with/without attribute:', function() {

		before((done) => {
			fs.readFile(__dirname + '/../../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
				if (err) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('Should parse member with/without attribute conditions', function() {

			describe('address', function() {

				it('member with attribute address', function() {
					let condition = parser.parse('member with attribute address');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute address', function() {
					let condition = parser.parse('member without attribute address');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute address street', function() {
					let condition = parser.parse('member with attribute address street');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'street'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address zip', function() {
					let condition = parser.parse('member with attribute address zip');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'zip'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address city', function() {
					let condition = parser.parse('member with attribute address city');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'city'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address state', function() {
					let condition = parser.parse('member with attribute address state');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'state'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address country', function() {
					let condition = parser.parse('member with attribute address country');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'country'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address city equal to Laval', function() {
					let condition = parser.parse('member with attribute address city equal to Laval');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'city', operator:'=', value:'Laval'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address state equal to Qc', function() {
					let condition = parser.parse('member with attribute address state equal to Qc');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'state', operator:'=', value:'Qc'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

				it('member with attribute address country equal to Canada', function() {
					let condition = parser.parse('member with attribute address country equal to Canada');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'address', name:'country', operator:'=', value:'Canada'},
								scope: 'member',
								type: 'with'
							}
						]
					})

				});

			});

			describe('age', function() {

				it('member with attribute age', function() {
					let condition = parser.parse('member with attribute age');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'age'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute age', function() {
					let condition = parser.parse('member without attribute age');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'age'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute age >= 6', function() {
					let condition = parser.parse('member with attribute age >= 6');
					should(condition).eql({
						conditions: [
							{
								query: {
									type: 'attribute',
									attribute: 'age',
									operator: '>=',
									value: 6
								},
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

			describe('alias', function() {

				it('member with attribute alias', function() {
					let condition = parser.parse('member with attribute alias');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'alias'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute alias', function() {
					let condition = parser.parse('member without attribute alias');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'alias'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

			});

			describe('email', function() {

				it('member with attribute email', function() {
					let condition = parser.parse('member with attribute email');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'email'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute email', function() {
					let condition = parser.parse('member without attribute email');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'email'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});


				it('member with attribute email with type main', function() {
					let condition = parser.parse('member with attribute email with type main');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'email', typeValue: 'main'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

			describe('external id', function() {

				it('member with attribute external id', function() {
					let condition = parser.parse('member with attribute external id');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'external_id'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute external id', function() {
					let condition = parser.parse('member without attribute external id');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'external_id'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

			});

			describe('first name', function() {

				it('member with attribute first name', function() {
					let condition = parser.parse('member with attribute first name');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'first_name'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute first name', function() {
					let condition = parser.parse('member without attribute first name');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'first_name'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

			});

			describe('gender', function() {

				it('member with attribute gender', function() {
					let condition = parser.parse('member with attribute gender');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'gender'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute gender', function() {
					let condition = parser.parse('member without attribute gender');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'gender'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute gender equal to male', function() {
					let condition = parser.parse('member with attribute gender equal to male');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'gender', operator: '=', value: 'male'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

			});

			describe('integration id', function() {

				it('member with attribute integration id', function() {
					let condition = parser.parse('member with attribute integration id');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'integration_id'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute integration id', function() {
					let condition = parser.parse('member without attribute integration id');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'integration_id'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute integration id with type thisType', function() {

					let condition = parser.parse('member with attribute integration id with type thisType');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'integration_id', typeValue: 'thisType'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

			describe('language', function() {

				it('member with attribute language', function() {
					let condition = parser.parse('member with attribute language');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'language'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute language', function() {
					let condition = parser.parse('member without attribute language');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'language'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute language equal to ca', function() {
					let condition = parser.parse('member with attribute language equal to ca');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'language', operator:'=', value:'ca'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

			describe('last name', function() {

				it('member with attribute last name', function() {
					let condition = parser.parse('member with attribute last name');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'last_name'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute last name', function() {
					let condition = parser.parse('member without attribute last name');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'last_name'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

			});

			describe('phone', function() {

				it('member with attribute phone', function() {
					let condition = parser.parse('member with attribute phone');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'phone'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute phone', function() {
					let condition = parser.parse('member without attribute phone');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'phone'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member with attribute phone with type main', function() {
					let condition = parser.parse('member with attribute phone with type main');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'phone', typeValue: 'main'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

			describe('picture', function() {

				it('member with attribute picture', function() {
					let condition = parser.parse('member with attribute picture');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'picture'},
								scope: 'member',
								type: 'with'
							}
						]
					})
				});

				it('member without attribute picture', function() {
					let condition = parser.parse('member without attribute picture');
					should(condition).eql({
						conditions: [
							{
								query: {type: 'attribute', attribute: 'picture'},
								negative: true,
								scope: 'member',
								type: 'with'
							}
						]
					})
				})

			});

		});

	});
});
