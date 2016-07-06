'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Rules created:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('created rule',function(){

            it('should parse simple created rule with in last',function(){

                var rule = parser.parse('member created in last 3 days');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        duration: 3,
                        durationScope: "day",
                        type: "last"
                    }
                }]);

            });

            it('should parse simple created rule with before',function(){

                var rule = parser.parse('member created before 2015-04-04T10:10:10');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        date: [new Date(2015,4-1,4,10,10,10)],
                        type: "before"
                    }
                }]);

            });

            it('should parse simple created rule with between',function(){

                var rule = parser.parse('member created between 2015-04-04T10:10:10 and 2016-04-04T10:10:10');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        date: [new Date(2015,4-1,4,10,10,10),new Date(2016,4-1,4,10,10,10)],
                        type: 'between'
                    }
                }]);

            });

            it('should parse simple created rule with after',function(){

                var rule = parser.parse('member created after 2015-04-04T10:10:10');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        date: [new Date(2015,4-1,4,10,10,10)],
                        type: "after"
                    }
                }]);

            });

            it('should parse simple created rule with since did',function(){
                var rule = parser.parse('member created since did first ACTIONCODE');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        position:'first',
                        actionCode: 'ACTIONCODE',
                        type: "since-did"
                    }
                }]);

                var rule = parser.parse('member created since did last ACTIONCODE');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        position:'last',
                        actionCode: 'ACTIONCODE',
                        type: "since-did"
                    }
                }]);
            });

            it('should parse simple created rule with since received',function(){
                var rule = parser.parse('member created since received prize PRIZECODE');
                should(rule).eql([{
                    scope:'member',
                    type:'created',
                    period_filter: {
                        prizeCode: 'PRIZECODE',
                        target:'prize',
                        type: 'since-received'
                    }
                }]);
            });

        });

    });
});
