'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Rules: Member condition', function () {

		before(function (done) {
			return helper.challengeParser().then(function(newParser){
				parser = newParser;
				done()
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
						occurrence_filter: null,
						period_filter: null,
						moment_filter: null
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
							occurrence_filter: null,
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null,
							moment_filter: null
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
							occurrence_filter: null,
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
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
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: null
						}],
						rewards: [
							{quantity: 1, code: 'points'}
						]
					});
					done();
				});

				it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40 after 5:00 give 1 points', function (done) {

					var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40  after 5:00 give 1 points');
					should(rule).eql({
						rules: [{
							scope: 'member',
							type: 'has',
							condition: {
								type: 'not',
								sub_type: 'completed',
								code: 'TEST'
							},
							occurrence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: {
								type: 'before',
								dates: [
									'2016-03-03T04:40:40'
								]
							},
							moment_filter: {
								type: 'after',
								times: ['05:00']
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

					it('member has gained tag bob:bob give 1 points', function (done) {
						var rule = parser.parse('member has gained tag bob:bob give 1 points');
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
											tagClusterCode: 'bob',
											tagCode: 'bob'
										}
									}

								},
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null
							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has lost 3 tag bob:bob give 1 points', function (done) {
						var rule = parser.parse('member has lost 3 tag bob:bob give 1 points');
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
											tagClusterCode: 'bob',
											tagCode: 'bob'
										}
									}
								},
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null
							}],
							rewards: [
								{quantity: 1, code: 'points'}
							]
						});
						done();
					});

					it('member has not gained 3 tag bob:bob give 1 points', function (done) {
						var rule = parser.parse('member has not gained 3 tag bob:bob give 1 points');
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
													tagClusterCode: 'bob',
													tagCode: 'bob'
												}
											}
										},
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null
									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has not lost tag bob:bob give 1 points', function (done) {
						var rule = parser.parse('member has not lost tag bob:bob give 1 points');
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
													tagClusterCode: 'bob',
													tagCode: 'bob'
												}
											}
										},
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained tag bob:bob in last 3 days give 1 points', function (done) {
						var rule = parser.parse('member has gained tag bob:bob in last 3 days give 1 points');
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
													tagClusterCode: 'bob',
													tagCode: 'bob'
												}
											}
										},
										occurrence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										},
										moment_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained tag bob:bob in last 3 days before 2:00 pm give 1 points', function (done) {
						var rule = parser.parse('member has gained tag bob:bob in last 3 days before 2:00 pm give 1 points');
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
													tagClusterCode: 'bob',
													tagCode: 'bob'
												}
											}
										},
										occurrence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										},
										moment_filter: {
											type: 'before',
											times: ['14:00']
										}

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							});
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
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null

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
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null

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
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null

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
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null

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
										occurrence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										},
										moment_filter: null

									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained points bob in last 3 days during the night give 1 points', function (done) {
						var rule = parser.parse('member has gained points bob in last 3 days during the night give 1 points');
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
										occurrence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										},
										moment_filter: {
											type: 'during',
											moment: 'night'
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
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null

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
								occurrence_filter: null,
								period_filter: null,
								moment_filter: null

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
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null
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
										occurrence_filter: null,
										period_filter: null,
										moment_filter: null
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
										occurrence_filter: null,
										period_filter: {
											type: 'last',
											duration: 3,
											durationScope: 'day'
										},
										moment_filter: null
									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							}
						);
						done();
					});

					it('member has gained points bob between 1:00 and 1:00 pm give 1 points', function (done) {
						var rule = parser.parse('member has gained points bob between 1:00 and 1:00 pm give 1 points');
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
										occurrence_filter: null,
										period_filter: null,
										moment_filter: {
											type: 'between',
											times: ['01:00','13:00']
										}
									}],
								rewards: [
									{quantity: 1, code: 'points'}
								]
							});
						done();
					});
				})

			})
		});

	});

});
