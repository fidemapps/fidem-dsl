'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

var otherChoices;
var literalChoices;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions info:', function () {
        before(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        it('member lives ',function(){
            try {
                parser.parse("member lives ");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                var otherChoices = helper.extractOthers(err);
                should(err.expected.length).equal(3);
                should(literalChoices).eql(['in','not']);
                should(otherChoices).eql(['whitespace']);
            }
        });

        it('member lives in ',function(){
            try {
                parser.parse("member lives in ");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                var otherChoices = helper.extractOthers(err);
                should(err.expected.length).equal(5);
                should(literalChoices).eql(['city','country','state','zip']);
                should(otherChoices).eql(['whitespace']);
            }
        });

        it('member lives not in ',function(){
            try {
                parser.parse("member lives not in ");
            }
            catch (err) {
                var literalChoices = helper.extractLiterals(err);
                var otherChoices = helper.extractOthers(err);
                should(err.expected.length).equal(5);
                should(literalChoices).eql(['city','country','state','zip']);
                should(otherChoices).eql(['whitespace']);
            }
        });

        describe('city rule',function(){

            it('member lives in city ',function(){
                try {
                    parser.parse("member lives in city ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives not in city ',function(){
                try {
                    parser.parse("member lives not in city ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives in city mtl',function(){
                try {
                    parser.parse("member lives in city 'mtl' 3");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member lives not in city "mtl"',function(){
                try {
                    parser.parse("member lives not in city 'mtl' 3");
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

        describe('state rule',function(){

            it('member lives in state ',function(){
                try {
                    parser.parse("member lives in state ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives not in state ',function(){
                try {
                    parser.parse("member lives not in state ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives in state "mtl"',function(){
                try {
                    parser.parse("member lives in state 'mtl' 3");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member lives not in state "mtl"',function(){
                try {
                    parser.parse("member lives not in state 'mtl' 3");
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

        describe('zip rule',function(){

            it('member lives in zip ',function(){
                try {
                    parser.parse("member lives in zip ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives not in zip ',function(){
                try {
                    parser.parse("member lives not in zip ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives in zip "mtl"',function(){
                try {
                    parser.parse("member lives in zip 'mtl' 3");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member lives not in zip "mtl"',function(){
                try {
                    parser.parse("member lives not in zip 'mtl' 3");
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

        describe('country rule',function(){

            it('member lives in country ',function(){
                try {
                    parser.parse("member lives in country ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives not in country ',function(){
                try {
                    parser.parse("member lives not in country ");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member lives in country "mtl"',function(){
                try {
                    parser.parse("member lives in country 'mtl' 3");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member lives not in country "mtl"',function(){
                try {
                    parser.parse("member lives not in country 'mtl' 3");
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
