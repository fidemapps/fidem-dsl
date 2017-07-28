'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions city/state/country/zip:', function () {

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });


        describe('Should parse member city/state/country/zip conditions', function () {

            it('member lives in city test', function (done) {
                var condition = parser.parse('member lives in city "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: {type:'city', cityName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in state test', function (done) {
                var condition = parser.parse('member lives in state "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type:'state', stateName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in country test', function (done) {
                var condition = parser.parse('member lives in country "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'country', countryName: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives in zip test', function (done) {
                var condition = parser.parse('member lives in zip "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'zip', zipCode: 'test' },
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in city test', function (done) {
                var condition = parser.parse('member lives not in city "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'city', cityName: 'test' },
                            negative:true,
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in state test', function (done) {
                var condition = parser.parse('member lives not in state "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'state', stateName: 'test' },
                            negative:true,
                            scope: 'member',
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member lives not in country  "test"', function (done) {
                var condition = parser.parse('member lives not in country "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'country', countryName: 'test' },
                            scope: 'member',
                            negative:true,
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

            it('member live not in zip test', function (done) {
                var condition = parser.parse('member lives not in zip "test"');
                should(condition).eql({
                    conditions: [
                        {
                            query: { type: 'zip', zipCode: 'test' },
                            scope: 'member',
                            negative:true,
                            type: 'lives'
                        }
                    ]
                });
                done();
            });

        });

    });
});
