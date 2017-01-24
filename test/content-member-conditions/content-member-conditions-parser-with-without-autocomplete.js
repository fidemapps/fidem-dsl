'use strict';

var should = require('should'),
    helper = require('../helper');


var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions "with":', function () {

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('with/without rule',function(){

            it('member with ',function(){
                try {
                    parser.parse('member with ');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(6);
                    should(literalChoices).eql(['level','points','prize','tag cluster','tag']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member without ',function(){
                try {
                    parser.parse('member without ');
                } catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(6);
                    should(literalChoices).eql(['level','points','prize','tag cluster','tag']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            describe('tag',function(){
                it('member with tag ',function(){
                    try {
                        parser.parse('member with tag ');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['tagCode','whitespace']);
                    }
                });

                it('member with tag bob:bob',function(){
                    try {
                        parser.parse('member with tag bob:bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(8);
                        should(literalChoices).eql(['<', '<=', '=', '>', '>=', 'and' ]);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('member with tag bob:bob >=',function(){
                    try {
                        parser.parse('member with tag bob:bob >=');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['number','percentage','whitespace']);
                    }
                });

                it('member with tag bob:bob >= 4',function(){
                    try {
                        parser.parse('member with tag bob:bob >= 4 s');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('member with tag bob:bob >= 4%',function(){
                    try {
                        parser.parse('member with tag bob:bob = 4% s');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

            });

            describe('points',function(){
                it('member with points ',function(){
                    try {
                        parser.parse('member with points ');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['levelCode','whitespace']);
                    }
                });

                it('member with points bob',function(){
                    try {
                        parser.parse('member with points bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(8);
                        should(literalChoices).eql(['<', '<=', '=', '>', '>=','and' ]);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('member with points bob >=',function(){
                    try {
                        parser.parse('member with points bob >=');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['number','whitespace']);
                    }
                });

                it('member with points bob >= 4',function(){
                    try {
                        parser.parse('member with points bob >= 4');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
            });

            describe('prize',function(){

                it('member with prize ',function(){
                    try {
                        parser.parse('member with prize ');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(2);
                        should(literalChoices).eql([]);
                        should(otherChoices).eql(['prizeCode','whitespace']);
                    }
                });

                it('member with prize bob',function(){
                    try {
                        parser.parse('member with prize bob d');
                    } catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        var otherChoices = helper.extractOthers(err);
                        should(err.expected.length).equal(3);
                        should(literalChoices).eql(['and' ]);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
            });

        });

    });
});