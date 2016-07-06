'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Rules smartlist:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('smartlist rule',function(){

            it('should parse simple belongs to smartlist rule',function(){
                var rule = parser.parse('member belongs to smartlist montreal');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    query: {
                        smartlistCodes:['montreal']

                    }
                }]);
            });

            it('should parse simple belongs to smartlist rule with multiple code',function(){
                var rule = parser.parse('member belongs to smartlist montreal&quebec&bob');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    query: {

                        smartlistCodes:['montreal','quebec','bob']

                    }
                }]);
            });

            it('should parse complexe belongs to smartlist rule',function(){
                var rule = parser.parse('member belongs to smartlist montreal&bob since 4 hours');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    query: {
                        smartlistCodes:['montreal','bob'],
                        condition:{
                            type:'since',
                            duration:4,
                            durationScope:'hour'
                        }
                    }
                }]);
            });

            it('should parse simple do not belongs to smartlist rule',function(){

                var rule = parser.parse('member do not belongs to smartlist montreal');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    negative:true,
                    query: {
                        smartlistCodes:['montreal']
                    }
                }]);
            });

            it('should parse simple do not belongs to smartlist rule with multiple code',function(){
                var rule = parser.parse('member do not belongs to smartlist montreal&quebec&bob');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    negative:true,
                    query: {
                        smartlistCodes:['montreal','quebec','bob']
                    }
                }]);
            });

            it('should parse complexe do not belongs to smartlist rule',function(){
                var rule = parser.parse('member do not belongs to smartlist montreal&bob since 4 hours');
                should(rule).eql([{
                    scope:'member',
                    type:'smartlist',
                    negative:true,
                    query: {
                        smartlistCodes:['montreal','bob'],
                        condition:{
                            type:'since',
                            duration:4,
                            durationScope:'hour'
                        }
                    }
                }]);
            });


        });

    });
});
