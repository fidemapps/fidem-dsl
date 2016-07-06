'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability Member Condition Rules:', function () {
        var literalChoices;
        var otherChoices;
        
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        it('should auto complete after the member keyword',function(){
            try {
                parser.parse('member');
            } catch (error) {
                literalChoices = helper.extractLiterals(error);
                otherChoices = helper.extractOthers(error);

                should(error.expected.length).equal(13);
                should(literalChoices).eql(['belongs to smartlist',
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
                should(otherChoices).eql([ 'whitespace']);
            }
        });

        describe('has',function(){
            
            describe('should auto-complete',function(){

                it('member has',function(){
                    try {
                        parser.parse('member has');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(6);
                        should(literalChoices).eql(['been','completed','gained','lost','not']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });

                it('member has not',function(){
                    try {
                        parser.parse('member has not');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(5);
                        should(literalChoices).eql(['been','completed','gained','lost']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });

                it('member has not completed',function(){
                    try {
                        parser.parse('member has not completed');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(otherChoices).eql([ 'challengeCode','whitespace']);
                    }
                });

                it('member has not completed challengeCode',function() {
                    try {
                        parser.parse('member has not completed bob 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(15);
                        should(literalChoices).eql(['after', 'and', 'at', 'before', 'between', 'exactly','in range of','in zone', 'in','less','on','since','with RSSI']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
                
                it('member has not gained',function(){
                    try {
                        parser.parse('member has not gained');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(5);
                        should(literalChoices).eql(['points','prize','tag']);
                        should(otherChoices).eql([ 'number','whitespace']);
                    }
                });
                
                it('member has not lost',function(){
                    try {
                        parser.parse('member has not lost');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(5);
                        should(literalChoices).eql(['points','prize','tag']);
                        should(otherChoices).eql(['number', 'whitespace']);
                    }
                });
                
                it('member has not gained 3',function(){
                    try {
                        parser.parse('member has not gained 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(4);
                        should(literalChoices).eql(['points','prize','tag']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
                
                it('member has not lost tag',function(){
                    try {
                        parser.parse('member has not lost tag');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(otherChoices).eql(['tagCode', 'whitespace']);
                    }
                });

                it('member has not gained 3 tags',function(){
                    try {
                        parser.parse('member has not gained 3 tags');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(otherChoices).eql(['tagCode','whitespace']);
                    }
                });

                it('member has not lost tag bob',function(){
                    try {
                        parser.parse('member has not lost tag bob d');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(8);
                        should(literalChoices).eql(['after','and','before','between','in','since']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
                
                //TODO has been

            });

        });

        describe('should auto-complete the occurence filter',function(){

            it('member did something at',function(){
                try {
                    parser.parse('member did something at');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['least']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something at least',function(){
                try {
                    parser.parse('member did something at least');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'number','whitespace']);
                }
            });

            it('member did something exactly',function(){
                try {
                    parser.parse('member did something exactly');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'number','whitespace']);
                }
            });

            it('member did something less',function(){
                try {
                    parser.parse('member did something less');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['than']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something less than',function(){
                try {
                    parser.parse('member did something less than');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'number','whitespace']);
                }
            });

            it('member did something at least number',function(){
                try {
                    parser.parse('member did something at least 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['time','times']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something at least number times',function(){
                try {
                    parser.parse('member did something at least 2 times 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(12);
                    should(literalChoices).eql(['after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'on', 'since', 'with RSSI']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something at least number time',function(){
                try {
                    parser.parse('member did something at least 1 time 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(12);
                    should(literalChoices).eql(['after', 'and', 'before', 'between', 'in range of', 'in zone', 'in', 'on', 'since', 'with RSSI']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

        });

        describe('should auto-complete the period filter',function(){

            it('member did something before',function(){
                try {
                    parser.parse('member did something before');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'datetime','whitespace']);
                }
            });

            it('member did something after',function(){
                try {
                    parser.parse('member did something after');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'datetime','whitespace']);
                }
            });

            it('member did something after/before datetime',function(){
                try {
                    parser.parse('member did something after 2016-03-04T23:20:20 2');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['and','on']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something between',function(){
                try {
                    parser.parse('member did something between');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'datetime','whitespace']);
                }
            });

            it('member did something between datetime',function(){
                try {
                    parser.parse('member did something between 2016-03-04T23:20:20');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something between datetime and',function(){
                try {
                    parser.parse('member did something between 2016-03-04T23:20:20 and');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql([ 'datetime','whitespace']);
                }
            });

            it('member did something between datetime and datetime',function(){
                try {
                    parser.parse('member did something between 2016-03-04T23:20:20 and 2016-03-04T23:20:21 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['and','on']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something in',function(){
                try {
                    parser.parse('member did something in');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['last']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something in last',function(){
                try {
                    parser.parse('member did something in last');
                } catch (error) {
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(otherChoices).eql(['number', 'whitespace']);
                }
            });

            it('member did something in last number',function(){
                try {
                    parser.parse('member did something in last 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(13);
                    should(literalChoices).eql(['day','days','hour','hours','minute','minutes','month','months','week','weeks','year','years']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something in last number timeframe',function(){
                try {
                    parser.parse('member did something in last 3 weeks 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['and','on']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

        });
        
        //TODO geo-filter
        //TODO moment-filter

    });
});