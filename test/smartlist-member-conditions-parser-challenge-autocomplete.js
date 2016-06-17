'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member Conditions Challenge:', function () {
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
        
        describe('should auto-complete',function(){
           
            it('challenge',function(){
                try {
                    parser.parse('challenge');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'challengeCode','whitespace']);
                }
            });
            
            it('challenge CHALLENGE_CODE',function(){
                try {
                    parser.parse('challenge test 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['and','with']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });
            
            it('challenge CHALLENGE_CODE with',function(){
                try {
                    parser.parse('challenge test with');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'attributeName','whitespace']);
                }
            });

            it('challenge CHALLENGE_CODE with ATTRIBUTE_NAME',function(){
                try {
                    parser.parse('challenge test with test');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(6);
                    should(literalChoices).eql(['<','<=','=','>','>=']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('challenge CHALLENGE_CODE with ATTRIBUTE_NAME',function(){
                try {
                    parser.parse('challenge test with test = "bob" 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            
        });
    });
});