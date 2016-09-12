'use strict';

var should = require('should'),
	fs = require('fs'),
	PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
	describe('Availability Member conditions Rules:', function () {
		beforeEach(function (done) {
			fs.readFile(__dirname + '/../../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
				if ( err ) {
					return done(err);
				}
				parser = PEG.buildParser(data);
				done();
			});
		});

		describe('did', function () {

			it('member did nothing', function (done) {

				var rule = parser.parse('member did nothing');
				should(rule).eql([
					{
						scope: 'member',
						type: 'did',
						condition: {
							type: 'nothing'
						},
						occurence_filter: null,
						period_filter: null

					}
				]);
				done();
			});

			it('member did something', function (done) {

				var rule = parser.parse('member did something');
				should(rule).eql([
					{
						scope: 'member',
						type: 'did',
						condition: {
							type: 'something'
						},
						occurence_filter: null,
						period_filter: null

					}
				]);
				done();
			});

			describe('action', function () {

				it('member did action TEST', function (done) {

					var rule = parser.parse('member did action TEST');
					should(rule).eql([
						{
							scope: 'member',
							type: 'did',
							condition: {
								type: null,
								code: 'TEST',
								conditions: null
							},
							occurence_filter: null,
							period_filter: null
						}
					]);
					done();
				});

				it('member did not action TEST with jean < 2 & bob = 3', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 & bob = 3');
					should(rule).eql([
						{
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
						}
					]);
					done();
				});

				it('member did not action TEST with jean < 2 less than 3 times', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 less than 3 times');
					should(rule).eql([
						{
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
						}
					]);
					done();
				});

				it('member did not action TEST with jean < 2 before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member did not action TEST with jean < 2 before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
						}
					]);
					done();
				});

				it('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member did not action TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
						}
					]);
					done();
				});
			});

			describe('check-in', function () {

				it('member did check-in TEST', function (done) {

					var rule = parser.parse('member did check-in TEST');
					should(rule).eql([
						{
							scope: 'member',
							type: 'did',
							condition: {
								type: null,
								code: 'check-in',
								conditions: [
									{
										"operator": "=",
										"name": "data.checkin_code",
										"value": "TEST"
									}
								]
							},
							occurence_filter: null,
							period_filter: null
						}
					]);
					done();
				});

				it('member did not check-in TEST with jean < 2 & bob = 3', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 & bob = 3');
					should(rule).eql([
						{
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
										name: 'data.checkin_code',
										operator: '=',
										value: 'TEST'
									}
								]
							},
							occurence_filter: null,
							period_filter: null
						}
					]);
					done();
				});

				it('member did not check-in TEST with jean < 2 less than 3 times', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 less than 3 times');
					should(rule).eql([
						{
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
										name: 'data.checkin_code',
										operator: '=',
										value: 'TEST'}
								]
							},
							occurence_filter: {
								type: 'less',
								number: 3
							},
							period_filter: null
						}
					]);
					done();
				});

				it('member did not check-in TEST with jean < 2 before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < 2 before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
										name: 'data.checkin_code',
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
						}
					]);
					done();
				});

				it('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member did not check-in TEST with jean < "thomas" less than 3 times before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
										name: 'data.checkin_code',
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
						}
					]);
					done();
				});
			});

		});

		describe('has', function () {
			describe('complete', function () {

				it('member has completed TEST ', function (done) {

					var rule = parser.parse('member has completed TEST ');
					should(rule).eql([
						{
							scope: 'member',
							type: 'has',
							condition: {
								type: null,
								sub_type: 'completed',
								code: 'TEST'
							},
							occurence_filter: null,
							period_filter: null

						}]
					);
					done();
				});

				it('member has not completed TEST', function (done) {

					var rule = parser.parse('member has not completed TEST');
					should(rule).eql([{
						scope: 'member',
						type: 'has',
						condition: {
							type: 'not',
							sub_type: 'completed',
							code: 'TEST'
						},
						occurence_filter: null,
						period_filter: null

					}]);
					done();
				});

				it('member has not completed TEST less than 3 times', function (done) {

					var rule = parser.parse('member has not completed TEST less than 3 times');
					should(rule).eql([{
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
					}]);
					done();
				});

				it('member has not completed TEST before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member has not completed TEST before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
						}]);
					done();
				});

				it('member has not completed TEST less than 3 times before 2016-03-03T04:40:40', function (done) {

					var rule = parser.parse('member has not completed TEST less than 3 times before 2016-03-03T04:40:40');
					should(rule).eql([
						{
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
						}]);
					done();
				});

			});

			describe('gained/lost', function () {
				describe('tag', function () {

					it('member has gained tag bob', function (done) {
						var rule = parser.parse('member has gained tag bob');
						should(rule).eql([
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
								period_filter: null

							}]
						);
						done();
					});

					it('member has lost 3 tag bob', function (done) {
						var rule = parser.parse('member has lost 3 tag bob');
						should(rule).eql([
							{
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

							}]
						);
						done();
					});

					it('member has not gained 3 tag bob', function (done) {
						var rule = parser.parse('member has not gained 3 tag bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has not lost tag bob', function (done) {
						var rule = parser.parse('member has not lost tag bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has gained tag bob in last 3 days', function (done) {
						var rule = parser.parse('member has gained tag bob in last 3 days');
						should(rule).eql([
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

							}]
						);
						done();
					});

				});

				describe('points', function () {

					it('member has gained points bob', function (done) {
						var rule = parser.parse('member has gained points bob');
						should(rule).eql([
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
								period_filter: null

							}]
						);
						done();
					});

					it('member has lost 3 points bob', function (done) {
						var rule = parser.parse('member has lost 3 points bob');
						should(rule).eql([
							{
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

							}]
						);
						done();
					});

					it('member has not gained 3 points bob', function (done) {
						var rule = parser.parse('member has not gained 3 points bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has not lost points bob', function (done) {
						var rule = parser.parse('member has not lost points bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has gained points bob in last 3 days', function (done) {
						var rule = parser.parse('member has gained points bob in last 3 days');
						should(rule).eql([
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

							}]
						);
						done();
					});
				});

				describe('prize', function () {
					it('member has gained prize bob', function (done) {
						var rule = parser.parse('member has gained prize bob');
						should(rule).eql([
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
								period_filter: null

							}]
						);
						done();
					});

					it('member has lost 3 prize bob', function (done) {
						var rule = parser.parse('member has lost 3 prize bob');
						should(rule).eql([
							{
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

							}]
						);
						done();
					});

					it('member has not gained 3 prize bob', function (done) {
						var rule = parser.parse('member has not gained 3 prize bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has not lost prize bob', function (done) {
						var rule = parser.parse('member has not lost prize bob');
						should(rule).eql([
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

							}]
						);
						done();
					});

					it('member has gained prize bob in last 3 days', function (done) {
						var rule = parser.parse('member has gained prize bob in last 3 days');
						should(rule).eql([
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

							}]
						);
						done();
					});
				});

			});

		});

	});
});