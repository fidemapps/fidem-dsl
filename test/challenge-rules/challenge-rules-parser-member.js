'use strict';

var should = require('should'),
	fs = require('fs'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
	describe('Rules: Member condition', function () {

		beforeEach(function (done) {
			fs.readFile(__dirname + '/../../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
				if ( err ) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('did', function () {

			it('member did nothing give 1 points', function (done) {

				var rule = parser.parse('member did nothing give 1 points');
				should(rule).eql({
					rules: [{
						scope: 'member',
						type: 'did',
						condition: {
							type: 'nothing'
						},
						occurence_filter: null,
						period_filter: null

					}],
					rewards: [
						{quantity: 1, code: 'points'}
					]
				});
				done();
			});

			describe('action', function () {
				it('member did not action TEST with jean < 2 & bob = 3 give 1 points', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 & bob = 3 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'TEST',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									},
									{
										operator: '=',
										attribute: 'bob',
										value: 3
									}
								]
							},
							occurence_filter: null,
							period_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 less than 3 times give 1 points', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 less than 3 times give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'TEST',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									}
								]
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not action TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'TEST',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									}
								]
							},
							occurence_filter: null,
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'TEST',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: "thomas"
									}
								]
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});
			});
			
			describe('check-in',function(){

				it('member did not check-in TEST with jean < 2 & bob = 3 give 1 points', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 & bob = 3 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'check-in',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									},
									{
										operator: '=',
										attribute: 'bob',
										value: 3
									},
									{
										name: 'checkin_code',
										operator: '=',
										value: 'TEST'
									}
								]
							},
							occurence_filter: null,
							period_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 less than 3 times give 1 points', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 less than 3 times give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'check-in',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									},
									{
										name: 'checkin_code',
										operator: '=',
										value: 'TEST'
									}
								]
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'check-in',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: 2
									},
									{
										name: 'checkin_code',
										operator: '=',
										value: 'TEST'
									}
								]
							},
							occurence_filter: null,
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'did',
							condition: {
								type: 'not',
								code: 'check-in',
								conditions: [
									{
										operator: '<',
										attribute: 'jean',
										value: "thomas"
									},
									{
										name: 'checkin_code',
										operator: '=',
										value: 'TEST'
									}
								]
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

			});

		});

		describe('has', function () {

			describe('completed', function () {

				it('member has completed TEST give 1 points', function (done) {

					var rule = parser.parse('member has completed TEST give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: null,
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: null,
							period_filter: null

						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member has not completed TEST give 1 points', function (done) {

					var rule = parser.parse('member has not completed TEST give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: 'not',
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: null,
							period_filter: null

						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member has not completed TEST less than 3 times give 1 points', function (done) {

					var rule = parser.parse('member has not completed TEST less than 3 times give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: 'not',
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member has not completed TEST before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: 'not',
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: null,
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40 give 1 points', function (done) {

					var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: 'not',
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								date: [
									'2016-03-03T04:40:40'
								]
							}
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

			});

			describe('gained/lost', function () {

				describe('tag', function () {

					it('member has gained tag bob give 1 points', function (done) {
						var rule = parser.parse('member has gained tag bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: null,
									type: null,
									sub_type: 'gained',
									object: {
										type: 'tag',
										tagCode: {
											tagClusterCode: null,
											tagCode: 'bob'
										}
									}

								},
								occurence_filter: null,
								period_filter: null

							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has lost 3 tag bob give 1 points', function (done) {
						var rule = parser.parse('member has lost 3 tag bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: 3,
									type: null,
									sub_type: 'lost',
									object: {
										type: 'tag',
										tagCode: {
											tagClusterCode: null,
											tagCode: 'bob'
										}
									}
								},
								occurence_filter: null,
								period_filter: null
							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has not gained 3 tag bob give 1 points', function (done) {
						var rule = parser.parse('member has not gained 3 tag bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: 3,
											type: 'not',
											sub_type: 'gained',
											object: {
												type: 'tag',
												tagCode: {
													tagClusterCode: null,
													tagCode: 'bob'
												}
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has not lost tag bob give 1 points', function (done) {
						var rule = parser.parse('member has not lost tag bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: 'not',
											sub_type: 'lost',
											object: {
												type: 'tag',
												tagCode: {
													tagClusterCode: null,
													tagCode: 'bob'
												}
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained tag bob in last 3 days give 1 points', function (done) {
						var rule = parser.parse('member has gained tag bob in last 3 days give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: null,
											sub_type: 'gained',
											object: {
												type: 'tag',
												tagCode: {
													tagClusterCode: null,
													tagCode: 'bob'
												}
											}
										},
										occurence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										}

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

				});

				describe('points', function () {
					it('member has gained points bob give 1 points', function (done) {
						var rule = parser.parse('member has gained points bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: null,
									type: null,
									sub_type: 'gained',
									object: {
										type: 'points',
										levelCode: 'bob'
									}

								},
								occurence_filter: null,
								period_filter: null

							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has lost 3 points bob give 1 points', function (done) {
						var rule = parser.parse('member has lost 3 points bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: 3,
									type: null,
									sub_type: 'lost',
									object: {
										type: 'points',
										levelCode: 'bob'
									}
								},
								occurence_filter: null,
								period_filter: null
							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has not gained 3 points bob give 1 points', function (done) {
						var rule = parser.parse('member has not gained 3 points bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: 3,
											type: 'not',
											sub_type: 'gained',
											object: {
												type: 'points',
												levelCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has not lost points bob give 1 points', function (done) {
						var rule = parser.parse('member has not lost points bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: 'not',
											sub_type: 'lost',
											object: {
												type: 'points',
												levelCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained points bob in last 3 days give 1 points', function (done) {
						var rule = parser.parse('member has gained points bob in last 3 days give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: null,
											sub_type: 'gained',
											object: {
												type: 'points',
												levelCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										}

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});
				});

				describe('prize', function () {
					it('member has gained prize bob give 1 points', function (done) {
						var rule = parser.parse('member has gained prize bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: null,
									type: null,
									sub_type: 'gained',
									object: {
										type: 'prize',
										prizeCode: 'bob'
									}

								},
								occurence_filter: null,
								period_filter: null

							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has lost 3 prize bob give 1 points', function (done) {
						var rule = parser.parse('member has lost 3 prize bob give 1 points');
						should(rule).eql({
							rules: [{
								scope: 'member',
								type: 'has',
								condition: {
									number: 3,
									type: null,
									sub_type: 'lost',
									object: {
										type: 'prize',
										prizeCode: 'bob'
									}
								},
								occurence_filter: null,
								period_filter: null
							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has not gained 3 prize bob give 1 points', function (done) {
						var rule = parser.parse('member has not gained 3 prize bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: 3,
											type: 'not',
											sub_type: 'gained',
											object: {
												type: 'prize',
												prizeCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has not lost points bob give 1 points', function (done) {
						var rule = parser.parse('member has not lost prize bob give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: 'not',
											sub_type: 'lost',
											object: {
												type: 'prize',
												prizeCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained points bob in last 3 days give 1 points', function (done) {
						var rule = parser.parse('member has gained prize bob in last 3 days give 1 points');
						should(rule).eql({
								rules: [
									{
										scope: 'member',
										type: 'has',
										condition: {
											number: null,
											type: null,
											sub_type: 'gained',
											object: {
												type: 'prize',
												prizeCode: 'bob'
											}
										},
										occurence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										}

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});
				})

			})
		});

	});

});
