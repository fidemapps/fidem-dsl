'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Availability System Conditions Rules:', function () {

	    before(function (done) {
		    return helper.challengeAvailabilityParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('Should parse "every" rules', function () {

            it('every day', function (done) {
                var rule = parser.parse('every day ');
                should(rule).eql([{
                    scope: 'every',
                    days: {type: 'day', list: ['day']},
                    months: null,
                    years: null,
                    time: null
                }]);
                done();
            });

            it('every monday of march', function (done) {
                var rule = parser.parse('every monday of march');
                should(rule).eql([{
                    scope: 'every',
                    days: {type: 'days', list: ['monday']},
                    months: {type: 'of', list: ['march']},
                    years: null,
                    time: null
                }]);
                done();
            });

            it('every sunday,monday', function (done) {
                var rule = parser.parse('every sunday,monday');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'days', list: ['sunday', 'monday']},
                        months: null,
                        years: null,
                        time: null
                    }
                ]);
                done();
            });

            it('every sunday,monday of march', function (done) {
                var rule = parser.parse('every sunday,monday of march');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'days', list: ['sunday', 'monday']},
                        months: {type: 'of', list: ['march']},
                        years: null,
                        time: null
                    }
                ]);
                done();
            });

            it('every sunday of march,january in 1959', function (done) {
                var rule = parser.parse('every sunday of march,january in 1959');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'days', list: ['sunday']},
                        months: {type: 'of', list: ['march', 'january']},
                        years: {type: 'in', list: ['1959']},
                        time: null
                    }
                ]);
                done();
            });

            it('every day of march,january from 1959-12-10 to 1960-03-10', function (done) {
                var rule = parser.parse('every day of march,january from 1959-12-10 to 1960-03-10');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'day', list: ['day']},
                        months: {type: 'of', list: ['march', 'january']},
                        years: {type: 'from', list: ['1959-12-10', '1960-03-10']},
                        time: null

                    }
                ]);
                done();
            });

            it('every day of march,january from 1959-12-10 to 1960-03-10 before 04:00 am', function (done) {
                var rule = parser.parse('every day of march,january until 1960-03-10 before 04:00 am');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'day', list: ['day']},
                        months: {type: 'of', list: ['march', 'january']},
                        years: {type: 'until', list: ['1960-03-10']},
                        time: {type: 'before', list: ['04:00']}
                    }
                ]);
                done();
            });

            it('every day of march,january starting at 1959-12-10 after 04:00 am', function (done) {
                var rule = parser.parse('every day of march,january starting at 1959-12-10 after 04:00 am');
                should(rule).eql([
                    {
                        scope: 'every',
                        days: {type: 'day', list: ['day']},
                        months: {type: 'of', list: ['march', 'january']},
                        years: {type: 'starting', list: ['1959-12-10']},
                        time: {type: 'after', list: ['04:00']}
                    }
                ]);
                done();
            });
        });
        
        describe('Should parse "on" rules', function () {

            it('on 1990-04-06', function (done) {
                var rule = parser.parse('on 1990-04-06');
                should(rule).eql([{
                    scope: 'on',
                    date: ['1990-04-06'],
                    time: null
                }]);
                done();
            });

            it('on 1990-04-06,2016-06-14', function (done) {
                var rule = parser.parse('on 1990-04-06,2016-06-14');
                should(rule).eql([{
                    scope: 'on',
                    date: ['1990-04-06', '2016-06-14'],
                    time: null
                }]);
                done();
            });

            it('on 2016-04-04,2015-03-03 between 05:30 am and 06:30 pm', function (done) {

                var rule = parser.parse('on 2016-04-04,2015-03-03 between 05:30 am and 06:30 pm');
                should(rule).eql([
                    {
                        scope: 'on',
                        date: ['2016-04-04', '2015-03-03'],
                        time: {type: 'between', list: ['05:30', '18:30']}
                    }
                ]);
                done();
            });

        });
        
        describe('Should parse "on the" rules',function(){
            
            it('on the 1st day of month',function(done){
                var rule = parser.parse('on the 1st day of month');
                should(rule).eql([
                    {
                        scope: 'onThe',
                        days: {type:'position', list:['1st']},
                        months: {type: 'month', list: ['month']},
                        years:null,
                        time:null
                    }
                ]);
                done();
            });

            it('on the 1st,4th day of march,may starting at 2016-04-05',function(done){
                var rule = parser.parse('on the 1st,4th day of march,may starting at 2016-04-05');
                should(rule).eql([
                    {
                        scope: 'onThe',
                        days: {type:'position', list:['1st','4th']},
                        months: {type: 'of', list: ['march','may']},
                        years:{type:'starting',list:['2016-04-05']},
                        time:null
                    }
                ]);
                done();
            });

            it('on the 1st,4th day of march,may starting at 2016-04-05 before 2:00 pm',function(done){
                var rule = parser.parse('on the 1st,4th day of march,may starting at 2016-04-05 before 2:00 pm');
                should(rule).eql([
                    {
                        scope: 'onThe',
                        days: {type:'position', list:['1st','4th']},
                        months: {type: 'of', list: ['march','may']},
                        years:{type:'starting',list:['2016-04-05']},
                        time:{type:'before',list:['14:00']}
                    }
                ]);
                done();
            });
            
        });
        
    });

});