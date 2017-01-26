'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Challenge rules parser period filter:', function () {

	    before(function (done) {
		    return helper.challengeParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('Should parse member period filter Limit case', function () {

            it('member did action ouvrir-app before 2016-12-12 and member did action ouvrir-app after 2016-12-11',function(){
                var condition = parser.parse("member did action ouvrir-app before 2016-12-12 and member did action ouvrir-app after 2016-12-11 give 1 points");
                should(condition.rules).eql([
	                {
		                "condition": {
			                "code": "ouvrir-app",
			                "conditions": null,
			                "type": null
		                },
		                "moment_filter": null,
		                "occurrence_filter": null,
		                "period_filter": {
			                "dates": [
				                "2016-12-12T00:00:00"
			                ],
			                "type": "before"
		                },
		                "scope": "member",
		                "type": "did"
	                },
	                {
		                "condition": {
			                "code": "ouvrir-app",
			                "conditions": null,
			                "type": null
		                },
		                "moment_filter": null,
		                "occurrence_filter": null,
		                "period_filter": {
			                "dates": [
				                "2016-12-11T00:00:00"
			                ],
			                "type": "after"
		                },
		                "scope": "member",
		                "type": "did"
	                }
                ]);
            });

	        it('member did action ouvrir-app before 2016-12-31 and member did action ouvrir-app after 2016-12-30',function(){
		        var condition = parser.parse("member did action ouvrir-app before 2016-12-31 and member did action ouvrir-app after 2016-12-30 give 1 points");
		        should(condition.rules).eql([
			        {
				        "condition": {
					        "code": "ouvrir-app",
					        "conditions": null,
					        "type": null
				        },
				        "moment_filter": null,
				        "occurrence_filter": null,
				        "period_filter": {
					        "dates": [
						        "2016-12-31T00:00:00"
					        ],
					        "type": "before"
				        },
				        "scope": "member",
				        "type": "did"
			        },
			        {
				        "condition": {
					        "code": "ouvrir-app",
					        "conditions": null,
					        "type": null
				        },
				        "moment_filter": null,
				        "occurrence_filter": null,
				        "period_filter": {
					        "dates": [
						        "2016-12-30T00:00:00"
					        ],
					        "type": "after"
				        },
				        "scope": "member",
				        "type": "did"
			        }
		        ]);
	        });

	        it('member did action ouvrir-app before 2016-02-28 and member did action ouvrir-app after 2016-12-30',function(){
		        var condition = parser.parse("member did action ouvrir-app before 2016-02-28 and member did action ouvrir-app after 2016-12-30 give 1 points");
		        should(condition.rules).eql([
			        {
				        "condition": {
					        "code": "ouvrir-app",
					        "conditions": null,
					        "type": null
				        },
				        "moment_filter": null,
				        "occurrence_filter": null,
				        "period_filter": {
					        "dates": [
						        "2016-02-28T00:00:00"
					        ],
					        "type": "before"
				        },
				        "scope": "member",
				        "type": "did"
			        },
			        {
				        "condition": {
					        "code": "ouvrir-app",
					        "conditions": null,
					        "type": null
				        },
				        "moment_filter": null,
				        "occurrence_filter": null,
				        "period_filter": {
					        "dates": [
						        "2016-12-30T00:00:00"
					        ],
					        "type": "after"
				        },
				        "scope": "member",
				        "type": "did"
			        }
		        ]);
	        });

	        it('member did action ouvrir-app between 2016-12-11 and 2016-12-12', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-11 and 2016-12-12 give 1 points");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-11T00:00:00', '2016-12-13T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
            });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-12-31', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-12-31 give 1 points");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-30T00:00:00', '2017-01-01T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-04-30', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-04-30 give 1 points");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-30T00:00:00', '2016-05-01T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-02-28', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-02-28 give 1 point");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-30T00:00:00', '2016-02-29T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2016-02-29', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2016-02-29 give 1 point");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-30T00:00:00', '2016-03-01T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
	        });

	        it('member did action ouvrir-app between 2016-12-30 and 2017-02-28', function(){
		        var condition = parser.parse("member did action ouvrir-app between 2016-12-30 and 2017-02-28 give 1 point");
		        should(condition.rules).eql([
			        {
				        condition: { code: 'ouvrir-app', conditions: null, type: null },
				        moment_filter: null,
				        occurrence_filter: null,
				        period_filter: {
					        dates: [ '2016-12-30T00:00:00', '2017-03-01T00:00:00' ],
					        type: 'between'
				        },
				        scope: 'member',
				        type: 'did'
			        }
		        ]);
	        });


        });

    });
});
