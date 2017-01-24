'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Member challenge Condition Rules with/without attribute:', function () {

		before(function (done) {
			return helper.challengeParser().then(function(newParser){
				parser = newParser;
				done()
			});
		});

		describe('Should parse member with/without attribute conditions', function () {

			describe('address', function () {

				it('member with attribute address', function () {
					var condition = parser.parse('member with attribute address give 2 apples');
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

				it('member without attribute address', function () {
					var condition = parser.parse('member without attribute address give 2 apples');
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

				it('member with attribute address street', function () {
					var condition = parser.parse('member with attribute address street give 2 apples');
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

				it('member with attribute address zip', function () {
					var condition = parser.parse('member with attribute address zip give 2 apples');
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

				it('member with attribute address city', function () {
					var condition = parser.parse('member with attribute address city give 2 apples');
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

				it('member with attribute address state', function () {
					var condition = parser.parse('member with attribute address state give 2 apples');
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

				it('member with attribute address country', function () {
					var condition = parser.parse('member with attribute address country give 2 apples');
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

				it('member with attribute address city equal to Laval', function () {
					var condition = parser.parse('member with attribute address city equal to Laval give 2 apples');
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

				it('member with attribute address state equal to Qc', function () {
					var condition = parser.parse('member with attribute address state equal to Qc give 2 apples');
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

				it('member with attribute address country equal to Canada', function () {
					var condition = parser.parse('member with attribute address country equal to Canada give 2 apples');
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

			describe('age', function () {

				it('member with attribute age', function () {
					var condition = parser.parse('member with attribute age give 2 apples');
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

				it('member without attribute age', function () {
					var condition = parser.parse('member without attribute age give 2 apples');
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

				it('member with attribute age >= 6', function () {
					var condition = parser.parse('member with attribute age >= 6 give 2 apples');
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

			describe('alias', function () {

				it('member with attribute alias', function () {
					var condition = parser.parse('member with attribute alias give 2 apples');
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

				it('member without attribute alias', function () {
					var condition = parser.parse('member without attribute alias give 2 apples');
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

			describe('birthday', function () {

				it('member with attribute birthday', function () {
					var condition = parser.parse('member with attribute birthday give 2 apples');
					should(condition.rules).eql([
						{
							condition: {
								type: null,
								query: {type: 'attribute', attribute: 'birthday'}
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

				it('member without attribute birthday', function () {
					var condition = parser.parse('member without attribute birthday give 2 apples');
					should(condition.rules).eql([
						{
							condition: {
								type: 'not',
								query: {type: 'attribute', attribute: 'birthday'}
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

				it('member with attribute birthday is today', function () {
					var condition = parser.parse('member with attribute birthday is today give 2 apples');
					should(condition.rules).eql([
						{
							condition: {
								type: null,
								query: {
									type: 'attribute',
									attribute: 'birthday',
									operator: '=',
									value: 'today'
								}
							},
							scope: 'member',
							type: 'with'
						}
					]);
				})

			});

			describe('email', function () {

				it('member with attribute email', function () {
					var condition = parser.parse('member with attribute email give 2 apples');
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

				it('member without attribute email', function () {
					var condition = parser.parse('member without attribute email give 2 apples');
					should(condition.rules).eql([
						{
							condition: {
								query: {type: 'attribute', attribute: 'email'},
								type: 'not'
							},
							scope: 'member',
							type: 'with'
						}
					])
				});

				it('member with attribute email with type main', function () {
					var condition = parser.parse('member with attribute email with type main give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'email', typeValue: 'main'},
									type: null,
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				})

			});

			describe('external id', function () {

				it('member with attribute external id', function () {
					var condition = parser.parse('member with attribute external id give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'external_id'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute external id', function () {
					var condition = parser.parse('member without attribute external id give 2 apples');
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

			describe('first name', function () {

				it('member with attribute first name', function () {
					var condition = parser.parse('member with attribute first name give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'first_name'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute first name', function () {
					var condition = parser.parse('member without attribute first name give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'first_name'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

			});

			describe('gender', function () {

				it('member with attribute gender', function () {
					var condition = parser.parse('member with attribute gender give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'gender'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute gender', function () {
					var condition = parser.parse('member without attribute gender give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'gender'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute gender equal to male', function () {
					var condition = parser.parse('member with attribute gender equal to male give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
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

			describe('integration id', function () {

				it('member with attribute integration id', function () {
					var condition = parser.parse('member with attribute integration id give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'integration_id'},
									type: null
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member without attribute integration id', function () {
					var condition = parser.parse('member without attribute integration id give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
									query: {type: 'attribute', attribute: 'integration_id'},
									type: 'not'
								},
								scope: 'member',
								type: 'with'
							}
						]
					)
				});

				it('member with attribute integration id with type thisType', function () {

					var condition = parser.parse('member with attribute integration id with type thisType give 2 apples');
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

			describe('language', function () {

				it('member with attribute language', function () {
					var condition = parser.parse('member with attribute language give 2 apples');
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

				it('member without attribute language', function () {
					var condition = parser.parse('member without attribute language give 2 apples');
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

				it('member with attribute language equal to ca', function () {
					var condition = parser.parse('member with attribute language equal to ca give 2 apples');
					should(condition.rules).eql([
							{
								condition: {
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

			describe('last name', function () {

				it('member with attribute last name', function () {
					var condition = parser.parse('member with attribute last name give 3 apples');
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

				it('member without attribute last name', function () {
					var condition = parser.parse('member without attribute last name give 3 apples');
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

			describe('phone', function () {

				it('member with attribute phone', function () {
					var condition = parser.parse('member with attribute phone give 3 apples');
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

				it('member without attribute phone', function () {
					var condition = parser.parse('member without attribute phone give 3 apples');
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

				it('member with attribute phone with type main', function () {
					var condition = parser.parse('member with attribute phone with type main give 3 apples');
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

			describe('picture', function () {

				it('member with attribute picture', function () {
					var condition = parser.parse('member with attribute picture give 3 apples');
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

				it('member without attribute picture', function () {
					var condition = parser.parse('member without attribute picture give 3 apples');
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
