'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

var otherChoices;
var literalChoices;

describe('<Unit Test>', function () {
    describe('Auto-Complete List Member Conditions info:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        
        describe('city rule',function(){

            it('member city',function(){
                try {
                    parser.parse("member city");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['!=','=']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member city =',function(){
                try {
                    parser.parse("member city =");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member city = "bob"',function(){
                try {
                    parser.parse("member city = 'bob' s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member city !=',function(){
                try {
                    parser.parse("member city !=");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member city != "bob"',function(){
                try {
                    parser.parse("member city != 'bob' s");
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

            it('member state',function(){
                try {
                    parser.parse("member state");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['!=','=']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member state =',function(){
                try {
                    parser.parse("member state =");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member state = "bob"',function(){
                try {
                    parser.parse("member state = 'bob' s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member state !=',function(){
                try {
                    parser.parse("member state !=");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member state != "bob"',function(){
                try {
                    parser.parse("member state != 'bob' s");
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

            it('member zip',function(){
                try {
                    parser.parse("member zip");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['!=','=']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member zip =',function(){
                try {
                    parser.parse("member zip =");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member zip = "bob"',function(){
                try {
                    parser.parse("member zip = 'bob' s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member zip !=',function(){
                try {
                    parser.parse("member zip !=");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member zip != "bob"',function(){
                try {
                    parser.parse("member zip != 'bob' s");
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

            it('member country',function(){
                try {
                    parser.parse("member country");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['!=','=']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member country =',function(){
                try {
                    parser.parse("member country =");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member country = "bob"',function(){
                try {
                    parser.parse("member country = 'bob' s");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member country !=',function(){
                try {
                    parser.parse("member country !=");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    var otherChoices = helper.extractOthers(err);
                    should(err.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['string','whitespace']);
                }
            });

            it('member country != "bob"',function(){
                try {
                    parser.parse("member country != 'bob' s");
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
