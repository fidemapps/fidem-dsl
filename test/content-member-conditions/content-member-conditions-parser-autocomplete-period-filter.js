'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions Member:', function () {
        var literalChoices;
        var otherChoices;
        before(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });


        describe('should auto-complete the period filter', function () {

            it('member did something before', function () {
                try {
                    parser.parse('member did something before');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member did something after', function () {
                try {
                    parser.parse('member did something after');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member did something after/before datetime', function () {
                try {
                    parser.parse('member did something after 2016-03-04 23:20 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something between', function () {
                try {
                    parser.parse('member did something between');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member did something between datetime', function () {
                try {
                    parser.parse('member did something between 2016-03-04 23:20');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something between datetime and', function () {
                try {
                    parser.parse('member did something between 2016-03-04 03:20 and');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['date (YYYY-MM-DD)', 'whitespace']);
                }
            });

            it('member did something between datetime and datetime', function () {
                try {
                    parser.parse('member did something between 2016-03-04 3:20 and 2016-03-04 11:20 pm 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });


            it('member did something in last', function () {
                try {
                    parser.parse('member did something in last');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(8);
                    should(literalChoices).eql(['day',  'hour',  'minute',  'month',  'week',  'year']);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member did something in last number', function () {
                try {
                    parser.parse('member did something in last 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(7);
                    should(literalChoices).eql([ 'days',  'hours', 'minutes',  'months',  'weeks', 'years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something in last number timeframe', function () {
                try {
                    parser.parse('member did something in last 3 weeks 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since',function(){
                try {
                    parser.parse('member did something since');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['did','received']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did',function(){
                try {
                    parser.parse('member did something since did');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(5);
                    should(literalChoices).eql(['action','check-in','first','last']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did action',function(){
                try {
                    parser.parse('member did something since did action');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['actionCode','whitespace']);
                }
            });

            it('member did something since did check-in',function(){
                try {
                    parser.parse('member did something since did check-in');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['checkinCode','whitespace']);
                }
            });

            it('member did something since did check-in eat',function(){
                try {
                    parser.parse('member did something since did check-in eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did action eat',function(){
                try {
                    parser.parse('member did something since did action eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did first',function(){
                try {
                    parser.parse('member did something since did first ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['action','check-in']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did last',function(){
                try {
                    parser.parse('member did something since did last ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['action','check-in']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did first action eat',function(){
                try {
                    parser.parse('member did something since did first action eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since did last action eat',function(){
                try {
                    parser.parse('member did something since did last action eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since received',function(){
                try {
                    parser.parse('member did something since received');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['prize']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something since received prize',function(){
                try {
                    parser.parse('member did something since received prize');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['prizeCode','whitespace']);
                }
            });

            it('member did something since received prize prizeCode',function(){
                try {
                    parser.parse('member did something since received prize prizeCode s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

        });

    });
});