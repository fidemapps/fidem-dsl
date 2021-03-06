'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions "belongs to smartlist":', function () {

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('belongs to smartlist rule',function(){


            it('member belongs to smartlist ',function(){
                try {
                    parser.parse("member belongs to smartlist ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member belongs to smartlist bob',function(){
                try {
                    parser.parse("member belongs to smartlist bob d");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql([',','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist bob,',function(){
                try {
                    parser.parse("member belongs to smartlist bob ,");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member belongs to smartlist bob,dan',function(){
                try {
                    parser.parse("member belongs to smartlist bob,dan dd");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql([',','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist bob,dan since ',function(){
                try {
                    parser.parse("member belongs to smartlist bob,dan since ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(8);
                    should(literalChoices).eql([ 'one day',  'one hour',  'one minute', 'one month', 'one week',  'one year']);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member belongs to smartlist bob,dan since 3 ',function(){
                try {
                    parser.parse("member belongs to smartlist bob,dan since 3 ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(7);
                    should(literalChoices).eql([  'days',  'hours',  'minutes',  'months',  'weeks',  'years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member belongs to smartlist bob,dan since 3 day',function(){
                try {
                    parser.parse("member belongs to smartlist bob,dan since 3 days d");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });


        });

        describe('does not belong to smartlist rule',function(){
            var literalChoices;
            var otherChoices;

            it('member does not belong to smartlist ',function(){
                try {
                    parser.parse("member does not belong to smartlist ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member does not belong to smartlist bob',function(){
                try {
                    parser.parse("member does not belong to smartlist bob d");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql([',','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member does not belong to smartlist bob,',function(){
                try {
                    parser.parse("member does not belong to smartlist bob ,");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['smartlistCode','whitespace']);
                }
            });

            it('member does not belong to smartlist bob,dan',function(){
                try {
                    parser.parse("member does not belong to smartlist bob,dan dd");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(5);
                    should(literalChoices).eql([',','and','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member does not belong to smartlist bob,dan since ',function(){
                try {
                    parser.parse("member does not belong to smartlist bob,dan since ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(8);
                    should(literalChoices).eql([ 'one day',  'one hour',  'one minute', 'one month', 'one week',  'one year']);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member does not belong to smartlist bob,dan since 3 ',function(){
                try {
                    parser.parse("member does not belong to smartlist bob,dan since 3 ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(7);
                    should(literalChoices).eql([  'days',  'hours',  'minutes',  'months',  'weeks',  'years']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member does not belong to smartlist bob,dan since 3 day',function(){
                try {
                    parser.parse("member does not belong to smartlist bob,dan since 3 days d");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });


        });


    });
});