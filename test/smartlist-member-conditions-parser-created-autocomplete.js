'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member Conditions created:', function () {
        var literalChoices;
        var otherChoices;
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('created rule',function(){

            it('member created before', function () {
                try {
                    parser.parse('member created before');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['datetime', 'whitespace']);
                }
            });

            it('member created after', function () {
                try {
                    parser.parse('member created after');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['datetime', 'whitespace']);
                }
            });

            it('member created after/before datetime', function () {
                try {
                    parser.parse('member created after 2016-03-04T23:20:20 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created between', function () {
                try {
                    parser.parse('member created between');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['datetime', 'whitespace']);
                }
            });

            it('member created between datetime', function () {
                try {
                    parser.parse('member created between 2016-03-04T23:20:20');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created between datetime and', function () {
                try {
                    parser.parse('member created between 2016-03-04T23:20:20 and');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['datetime', 'whitespace']);
                }
            });

            it('member created between datetime and datetime', function () {
                try {
                    parser.parse('member created between 2016-03-04T23:20:20 and 2016-03-04T23:20:21 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created in', function () {
                try {
                    parser.parse('member created in');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['last']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created in last', function () {
                try {
                    parser.parse('member created in last');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member created in last number', function () {
                try {
                    parser.parse('member created in last 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(13);
                    should(literalChoices).eql(['day', 'days', 'hour', 'hours', 'minute', 'minutes', 'month', 'months', 'week', 'weeks', 'year', 'years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created in last number timeframe', function () {
                try {
                    parser.parse('member created in last 3 weeks 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since',function(){
                try {
                    parser.parse('member created since');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['did','received']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since did',function(){
                try {
                    parser.parse('member created since did');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['first','last']);
                    should(otherChoices).eql(['actionCode','whitespace']);
                }
            });

            it('member created since did eat',function(){
                try {
                    parser.parse('member created since did eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since did first',function(){
                try {
                    parser.parse('member created since did first ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['actionCode','whitespace']);
                }
            });

            it('member created since did last',function(){
                try {
                    parser.parse('member created since did last ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['actionCode','whitespace']);
                }
            });

            it('member created since did first eat',function(){
                try {
                    parser.parse('member created since did first eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since did last eat',function(){
                try {
                    parser.parse('member created since did last eat s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since received',function(){
                try {
                    parser.parse('member created since received');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['prize']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member created since received prize',function(){
                try {
                    parser.parse('member created since received prize');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['prizeCode','whitespace']);
                }
            });

            it('member created since received prize prizeCode',function(){
                try {
                    parser.parse('member created since received prize prizeCode s');
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