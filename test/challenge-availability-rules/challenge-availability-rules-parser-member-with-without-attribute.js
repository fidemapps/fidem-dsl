'use strict';

var should = require('should'),
	fs = require('fs'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', () => {
	describe('Availability Member Condition Rules with/without attribute:', () => {

		before((done) => {
			fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
				if (err) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('Should parse member with/without attribute conditions', () => {

			describe('address', () => {

				it('member with attribute address', () => {
					let condition = parser.parse('member with attribute address');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {type: 'attribute', attribute: 'address'}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute address', () => {
					let condition = parser.parse('member without attribute address');
					should(condition).eql([
							{
								scope: 'member',
								type: 'with',
								condition: {
									type: 'not',
									query: {type: 'attribute', attribute: 'address'}
								}
							}
						]
					)
				});

				it('member with attribute address street', () => {
					let condition = parser.parse('member with attribute address street');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'address', name: 'street'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address zip', () => {
					let condition = parser.parse('member with attribute address zip');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'address', name: 'zip'},
									type: null,
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address city', () => {
					let condition = parser.parse('member with attribute address city');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'address', name: 'city'},
									type: null,
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address state', () => {
					let condition = parser.parse('member with attribute address state');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {type: 'attribute', attribute: 'address', name: 'state'}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address country', () => {
					let condition = parser.parse('member with attribute address country');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {type: 'attribute', attribute: 'address', name: 'country'}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address city equal to Laval', () => {
					let condition = parser.parse('member with attribute address city equal to Laval');
					should(condition).eql([
							{
								condition: {
									query: {
										type: 'attribute',
										attribute: 'address',
										name: 'city',
										operator: '=',
										value: 'Laval'
									},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address state equal to Qc', () => {
					let condition = parser.parse('member with attribute address state equal to Qc');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {
										type: 'attribute',
										attribute: 'address',
										name: 'state',
										operator: '=',
										value: 'Qc'
									}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

				it('member with attribute address country equal to Canada', () => {
					let condition = parser.parse('member with attribute address country equal to Canada');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {
										type: 'attribute',
										attribute: 'address',
										name: 'country',
										operator: '=',
										value: 'Canada'
									}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)

				});

			});

			describe('age', () => {

				it('member with attribute age', () => {
					let condition = parser.parse('member with attribute age');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'age'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute age', () => {
					let condition = parser.parse('member without attribute age');
					should(condition).eql([
							{
								condition: {
									type: 'not',
									query: {type: 'attribute', attribute: 'age'}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute age >= 6', () => {
					let condition = parser.parse('member with attribute age >= 6');
					should(condition).eql([
							{
								condition: {
									query: {
										type: 'attribute',
										attribute: 'age',
										operator: '>=',
										value: 6
									},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('alias', () => {

				it('member with attribute alias', () => {
					let condition = parser.parse('member with attribute alias');
					should(condition).eql([
							{
								condition: {
									type: null,
									query: {type: 'attribute', attribute: 'alias'}
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute alias', () => {
					let condition = parser.parse('member without attribute alias');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'alias'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

			});

			describe('email', () => {

				it('member with attribute email', () => {
					let condition = parser.parse('member with attribute email');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'email'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute email', () => {
					let condition = parser.parse('member without attribute email');
					should(condition).eql([
						{
							condition:{
								query: {type: 'attribute', attribute: 'email'},
								type: 'not'
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

				it('member with attribute email with type main', () => {
					let condition = parser.parse('member with attribute email with type main');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'email', typeValue: 'main'},
									type:null,
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('external id', () => {

				it('member with attribute external id', () => {
					let condition = parser.parse('member with attribute external id');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'external_id'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute external id', () => {
					let condition = parser.parse('member without attribute external id');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'external_id'},
									type: 'not',
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

			});

			describe('first name', () => {

				it('member with attribute first name', () => {
					let condition = parser.parse('member with attribute first name');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'first_name'},
									type:null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute first name', () => {
					let condition = parser.parse('member without attribute first name');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'first_name'},
									type:'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

			});

			describe('gender', () => {

				it('member with attribute gender', () => {
					let condition = parser.parse('member with attribute gender');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'gender'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute gender', () => {
					let condition = parser.parse('member without attribute gender');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'gender'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute gender equal to male', () => {
					let condition = parser.parse('member with attribute gender equal to male');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'gender', operator: '=', value: 'male'},
									type: null,

								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

			});

			describe('integration id', () => {

				it('member with attribute integration id', () => {
					let condition = parser.parse('member with attribute integration id');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'integration_id'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute integration id', () => {
					let condition = parser.parse('member without attribute integration id');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'integration_id'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute integration id with type thisType', () => {

					let condition = parser.parse('member with attribute integration id with type thisType');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'integration_id', typeValue: 'thisType'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('language', () => {

				it('member with attribute language', () => {
					let condition = parser.parse('member with attribute language');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'language'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute language', () => {
					let condition = parser.parse('member without attribute language');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'language'},
									type: 'not',
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute language equal to ca', () => {
					let condition = parser.parse('member with attribute language equal to ca');
					should(condition).eql([
							{
								condition:{
									query: {type: 'attribute', attribute: 'language', operator: '=', value: 'ca'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('last name', () => {

				it('member with attribute last name', () => {
					let condition = parser.parse('member with attribute last name');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'last_name'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute last name', () => {
					let condition = parser.parse('member without attribute last name');
					should(condition).eql([
						{
							condition: {
								query: {type: 'attribute', attribute: 'last_name'},
								type: 'not',
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

			});

			describe('phone', () => {

				it('member with attribute phone', () => {
					let condition = parser.parse('member with attribute phone');
					should(condition).eql([
						{
							condition: {
								query: {type: 'attribute', attribute: 'phone'},
								type: null,
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

				it('member without attribute phone', () => {
					let condition = parser.parse('member without attribute phone');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'phone'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute phone with type main', () => {
					let condition = parser.parse('member with attribute phone with type main');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'phone', typeValue: 'main'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('picture', () => {

				it('member with attribute picture', () => {
					let condition = parser.parse('member with attribute picture');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'picture'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute picture', () => {
					let condition = parser.parse('member without attribute picture');
					should(condition).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'picture'},
									type: 'not',
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

		});

	});
});
