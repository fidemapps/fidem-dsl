'use strict';

var should = require('should'),
	fs = require('fs'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', () => {
	describe('Member challenge Condition Rules with/without attribute:', () => {

		before((done) => {
			fs.readFile(__dirname + '/../../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
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
					let condition = parser.parse('member with attribute address give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute address give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address street give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address zip give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address city give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address state give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address country give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address city equal to Laval give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address state equal to Qc give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute address country equal to Canada give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute age give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute age give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute age >= 6 give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute alias give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute alias give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute email give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute email give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute email with type main give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute external id give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute external id give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute first name give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute first name give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute gender give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute gender give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute gender equal to male give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute integration id give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute integration id give 2 apples');
					should(condition.rules).eql([
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

					let condition = parser.parse('member with attribute integration id with type thisType give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute language give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute language give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute language equal to ca give 2 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute last name give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute last name give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute phone give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute phone give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute phone with type main give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member with attribute picture give 3 apples');
					should(condition.rules).eql([
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
					let condition = parser.parse('member without attribute picture give 3 apples');
					should(condition.rules).eql([
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
