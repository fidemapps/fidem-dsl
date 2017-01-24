'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
	describe('Auto-Complete Moment Filter Challenge Rules:', function () {
		var literalChoices;
		var otherChoices;

		before(function (done) {
			return helper.challengeParser().then(function(newParser){
				parser = newParser;
				done()
			});
		});

		describe('"did" has access to the moment filter', function () {

			describe('should auto-complete', function () {

				it('member did action eat ', function () {
					try {
						parser.parse('member did action eat s');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(12);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than', 'with']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did not action eat', function () {
					try {
						parser.parse('member did not action eat s');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(12);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than', 'with']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did action actionCode with attributeName = \"attributeValue\"', function () {
					try {
						parser.parse('member did action eat with bob = \"bob\" 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(12);
						should(literalChoices).eql(['&', 'after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);

						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did check-in checkinCode', function () {
					try {
						parser.parse('member did check-in eat d');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(12);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than', 'with']);

						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did check-in checkinCode with attributeName = \"attributeValue\"', function () {
					try {
						parser.parse('member did check-in eat with bob = \"bob\" 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(12);
						should(literalChoices).eql(['&', 'after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);

						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did nothing', function () {
					try {
						parser.parse('member did nothing 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(11);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member did something', function () {
					try {
						parser.parse('member did something 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(11);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

		});

		describe('"has completed" has access to the moment filter', function () {

			describe('should auto-complete', function () {

				it('member has not completed challengeCode', function () {
					try {
						parser.parse('member has not completed bob 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(11);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);
						should(otherChoices).eql(['whitespace']);
					}
				});

				it('member has completed challengeCode', function () {
					try {
						parser.parse('member has completed bob 3');
					} catch (error) {
						literalChoices = helper.extractLiterals(error);
						otherChoices = helper.extractOthers(error);

						should(error.expected.length).equal(11);
						should(literalChoices).eql(['after', 'and', 'at least', 'before', 'between', 'during the', 'exactly', 'give', 'in', 'less than']);
						should(otherChoices).eql(['whitespace']);
					}
				});

			});

		});

		describe('should be available after the occurrence filter', function () {

			it('member did something at least number times', function () {
				try {
					parser.parse('member did something at least 2 times 3');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(8);
					should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'give', 'in']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something at least number time', function () {
				try {
					parser.parse('member did something at least 1 time 3');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(8);
					should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'give', 'in']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something exactly number times', function () {
				try {
					parser.parse('member did something exactly 2 times 3');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(8);
					should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'give', 'in']);
					should(otherChoices).eql(['whitespace']);
				}
			});



			it('member did something less than number times', function () {
				try {
					parser.parse('member did something less than 2 times 3');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(8);
					should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'give', 'in']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something less than number time', function () {
				try {
					parser.parse('member did something less than 1 time 3');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(8);
					should(literalChoices).eql(['after', 'and', 'before', 'between', 'during the', 'give', 'in']);
					should(otherChoices).eql(['whitespace']);
				}
			});

		});

		describe('should be available after the period filter', function () {

			it('member did something after/before datetime', function () {
				try {
					parser.parse('member did something after 2016-03-04T23:20:20 2');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(7);
					should(literalChoices).eql(['after','and', 'before', 'between', 'during the', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something between datetime and datetime', function () {
				try {
					parser.parse('member did something between 2016-03-04 23:20 and 2016-03-04 23:20 4');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(7);
					should(literalChoices).eql(['after','and', 'before', 'between', 'during the', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something in last number timeframe', function () {
				try {
					parser.parse('member did something in last 3 weeks 4');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(7);
					should(literalChoices).eql(['after','and', 'before', 'between', 'during the', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

		});

		describe('moment filter should auto-complete properly',function () {

			it('member did something before 10:00 s',function () {
				try {
					parser.parse('member did something before 10:00 s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(5);
					should(literalChoices).eql(['am', 'and', 'give', 'pm' ]);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something after 10:00 s',function () {
				try {
					parser.parse('member did something after 10:00 s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(5);
					should(literalChoices).eql(['am', 'and', 'give', 'pm']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something between 10:00 s',function () {
				try {
					parser.parse('member did something between 10:00 s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(4);
					should(literalChoices).eql(['am', 'and', 'pm']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something between 10:00 and ',function () {
				try {
					parser.parse('member did something between 10:00 and ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);

					should(error.expected.length).equal(3);
					should(literalChoices).eql([]);
					should(otherChoices).eql(['12h time (hh:mm am/pm)', '24h time (hh:mm)', 'whitespace' ]);
				}
			});

			it('member did something between 10:00 and 9:00',function () {
				try {
					parser.parse('member did something between 10:00 and 9:00 s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(5);

					should(literalChoices).eql(['am', 'and', 'give', 'pm']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something between 10:00 and 09:00',function () {
				try {
					parser.parse('member did something between 10:00 and 09:00 s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(5);

					should(literalChoices).eql(['am', 'and', 'give', 'pm']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something between 10:00 and 9:00 pm',function () {
				try {
					parser.parse('member did something between 10:00 and 9:00 pm s');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(3);

					should(literalChoices).eql([ 'and', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something during the ', function () {
				try {
					parser.parse('member did something during the ');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(5);

					should(literalChoices).eql([ 'afternoon', 'evening', 'morning', 'night' ]);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something during the evening', function () {
				try {
					parser.parse('member did something during the evening f');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(3);

					should(literalChoices).eql([ 'and', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something during the afternoon', function () {
				try {
					parser.parse('member did something during the afternoon f');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(3);

					should(literalChoices).eql([ 'and', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something during the night', function () {
				try {
					parser.parse('member did something during the night f');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(3);

					should(literalChoices).eql([ 'and', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

			it('member did something during the morning', function () {
				try {
					parser.parse('member did something during the morning f');
				} catch (error) {
					literalChoices = helper.extractLiterals(error);
					otherChoices = helper.extractOthers(error);
					should(error.expected.length).equal(3);

					should(literalChoices).eql([ 'and', 'give']);
					should(otherChoices).eql(['whitespace']);
				}
			});

		})

	});
});