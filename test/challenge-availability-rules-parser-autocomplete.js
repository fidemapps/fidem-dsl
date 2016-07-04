'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Rules:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should get exception for auto-complete', function () {
            it('Empty string', function (done) {

                try {
                    parser.parse("");
                }
                catch (err) {
                    var literalChoices = helper.extractLiterals(err);
                    should(err.expected.length).equal(3);
                    should(literalChoices).eql(['every','member','on']);
                }

                done();
            });

            describe('member',function(){

                it('member',function(){
                    try {
                        parser.parse("member");
                    }
                    catch (err) {
                        var literalChoices = helper.extractLiterals(err);
                        should(err.expected.length).equal(13);
                        should(literalChoices).eql([
                            'belongs to smartlist',
                            'city',
                            'country',
                            'created',
                            'did',
                            'do not belongs to smartlist',
                            'has',
                            'is',
                            'state',
                            'with',
                            'without',
                            'zip'
                        ]);
                    }
                });

                describe('did',function(){
                });
                
                describe('has',function(){});
                
                describe('is',function(){});
                
                describe('with/without',function(){});
                
                describe('created',function(){});
                
                describe('city',function(){});

                describe('state',function(){});

                describe('zip',function(){});

                describe('country',function(){});

                describe('smartlist',function(){});
            });

            describe('on',function(){

                describe('date',function(){
                    
                });
                
                describe('the',function(){
                    
                });
                
            });

            describe('every',function(){

            });

        });
    });
});
