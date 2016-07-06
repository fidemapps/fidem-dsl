'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Rules info:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('city rule',function(){

            it('should parse simple city rule with =',function(){
                var rule = parser.parse('member city = "montreal"');
                should(rule).eql([{
                    scope:'member',
                    type:'city',
                    query: {
                        operator:'=',
                        value:'montreal'
                    }
                }]);
            });

            it('should parse simple city rule with !=',function(){
                var rule = parser.parse('member city != "montreal"');
                should(rule).eql([{
                    scope:'member',
                    type:'city',
                    query: {
                        operator:'!=',
                        value:'montreal'
                    }
                }]);
            });

        });

        describe('state rule',function(){

            it('should parse simple state rule with =',function(){
                var rule = parser.parse('member state = "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'state',
                    query: {
                        operator:'=',
                        value:'quebec'
                    }
                }]);
            });

            it('should parse simple state rule with !=',function(){
                var rule = parser.parse('member state != "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'state',
                    query: {
                        operator:'!=',
                        value:'quebec'
                    }
                }]);
            });

        });

        describe('zip rule',function(){

            it('should parse simple state rule with =',function(){
                var rule = parser.parse('member zip = "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'zip',
                    query: {
                        operator:'=',
                        value:'quebec'
                    }
                }]);
            });

            it('should parse simple state rule with !=',function(){
                var rule = parser.parse('member zip != "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'zip',
                    query: {
                        operator:'!=',
                        value:'quebec'
                    }
                }]);
            });

        });

        describe('country rule',function(){

            it('should parse simple state rule with =',function(){
                var rule = parser.parse('member country = "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'country',
                    query: {
                        operator:'=',
                        value:'quebec'
                    }
                }]);
            });

            it('should parse simple state rule with !=',function(){
                var rule = parser.parse('member country != "quebec"');
                should(rule).eql([{
                    scope:'member',
                    type:'country',
                    query: {
                        operator:'!=',
                        value:'quebec'
                    }
                }]);
            });

        });


    });
});
