'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions period filter:', function () {

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('Should parse member period filter Limit case', function () {

            it('member did action ouvrir-app before 2016-12-12 and member did action ouvrir-app after 2016-12-11',function(){
                var condition = parser.parse("member did action ouvrir-app before 2016-12-12 and member did action ouvrir-app after 2016-12-11");
                should(condition).eql({
	                conditions: [
		                {
			                periodFilter: {
				                date: "2016-12-12 00:00",
				                type: "before"
			                },
			                query: {
				                "actionCode": "ouvrir-app",
				                "type": "action"
			                },
			                scope: "member",
			                type: "did"
		                },
		                {
			                periodFilter: {
				                date: "2016-12-11 00:00",
				                type: "after"
			                },
			                query: {
				                actionCode: "ouvrir-app",
				                type: "action"
			                },
			                scope: "member",
			                type: "did"
		                }
	                ]
                });
            });

	        it('member did action ouvrir-app before 2016-12-31 and member did action ouvrir-app after 2016-12-30',function(){
		        var condition = parser.parse("member did action ouvrir-app before 2016-12-31 and member did action ouvrir-app after 2016-12-30");
		        should(condition).eql({
			        conditions: [
				        {
					        periodFilter: {
						        date: "2016-12-31 00:00",
						        type: "before"
					        },
					        query: {
						        "actionCode": "ouvrir-app",
						        "type": "action"
					        },
					        scope: "member",
					        type: "did"
				        },
				        {
					        periodFilter: {
						        date: "2016-12-30 00:00",
						        type: "after"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app before 2016-02-28 and member did action ouvrir-app after 2016-12-30',function(){
		        var condition = parser.parse("member did action ouvrir-app before 2016-02-28 and member did action ouvrir-app after 2016-12-30");
		        should(condition).eql({
			        conditions: [
				        {
					        periodFilter: {
						        date: "2016-02-28 00:00",
						        type: "before"
					        },
					        query: {
						        "actionCode": "ouvrir-app",
						        "type": "action"
					        },
					        scope: "member",
					        type: "did"
				        },
				        {
					        periodFilter: {
						        date: "2016-12-30 00:00",
						        type: "after"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app between 2016-12-11 and 2016-12-12', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-11 and 2016-12-12");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-11 00:00",
							        "2016-12-13 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
            });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-12-31', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-12-31");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-30 00:00",
							        "2017-01-01 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-04-30', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-04-30");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-30 00:00",
							        "2016-05-01 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-02-28', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-02-28");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-30 00:00",
							        "2016-02-29 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-02-29', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-02-29");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-30 00:00",
							        "2016-03-01 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2017-02-28', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2017-02-28");
		        should(condition).eql({
			        "conditions": [
				        {
					        periodFilter: {
						        dates: [
							        "2016-12-30 00:00",
							        "2017-03-01 00:00"
						        ],
						        type: "between"
					        },
					        query: {
						        actionCode: "ouvrir-app",
						        type: "action"
					        },
					        scope: "member",
					        type: "did"
				        }
			        ]
		        });
	        });

        });

    });
});
