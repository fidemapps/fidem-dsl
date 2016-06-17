'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('List Member Conditions Challenge:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse challenge code conditions',function(){

            it('challenge TEST', function (done) {
                var condition = parser.parse('challenge TEST');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'challenge',
                            code: 'TEST',
                            conditions:[]
                        }
                    ]
                });
                done();
            });

            it('challenge TEST with member = "bob"',function(done){
                var condition = parser.parse('challenge TEST with member = "bob"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'challenge',
                            code: 'TEST',
                            conditions:[
                                {
                                    name:'member',
                                    operator:'=',
                                    value:'bob'
                                }
                            ]
                        }
                    ]
                });
                done();
            });

            it('challenge TEST with member = "bob" and member = "eric"',function(done){
                var condition = parser.parse('challenge TEST with member = "bob" and member >= "eric"');
                should(condition).eql({
                    conditions: [
                        {
                            scope: 'challenge',
                            code: 'TEST',
                            conditions:[
                                {
                                    name:'member',
                                    operator:'=',
                                    value:'bob'
                                },
                                {
                                    name:'member',
                                    operator:'>=',
                                    value:'eric'
                                }
                            ]
                        }
                    ]
                });
                done();
            });

        })

    });
});