'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Member Condition Rules:', function () {
        var literalChoices;
        var otherChoices;

        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
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

                should(error.expected.length).equal(7);
                should(literalChoices).eql(['did', 'has', 'in zone', 'level', 'point', 'tag']);
                should(otherChoices).eql([ 'whitespace']);
            }
        });

        describe('did',function(){

            describe('should auto-complete',function(){
                
                it('member did',function(){
                    try {
                        parser.parse('member did');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(5);
                        should(literalChoices).eql(['not','nothing','something']);
                        should(otherChoices).eql([ 'actionCode','whitespace']);
                    }
                });
                
                it('member did not',function(){
                    //This happen because the parser don't know yet that the word 'not' is a token and not an actionCode
                    try {
                        parser.parse('member did not');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(12);
                        should(literalChoices).eql(['after','and','at','before','between','exactly','give','in','less','with']);
                        should(otherChoices).eql([ 'actionCode','whitespace']);
                    }
                });
                
                it('member did actionCode',function(){
                    try {
                        parser.parse('member did eat 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(11);
                        should(literalChoices).eql(['after','and','at','before','between','exactly','give','in','less','with']);

                        should(otherChoices).eql([ 'whitespace']);
                    }
                });

                it('member did actionCode with',function(){
                    try {
                        parser.parse('member did eat with');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(otherChoices).eql([ 'attributeName','whitespace']);
                    }
                });

                it('member did actionCode with attributeName',function(){
                    try {
                        parser.parse('member did eat with bob');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(6);
                        should(literalChoices).eql(['<','<=','=','>','>=']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });
                
                it('member did actionCode with attributeName =',function(){
                    try {
                        parser.parse('member did eat with bob =');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(4);
                        should(literalChoices).eql(["'",'\"']);
                        should(otherChoices).eql([ 'number','whitespace']);
                    }
                });

                it('member did actionCode with attributeName = \"',function(){
                    try {
                        parser.parse('member did eat with bob = \"');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(3);
                        should(literalChoices).eql(['\"','\\']);
                        should(otherChoices).eql([]);
                    }
                });
                
                it('member did actionCode with attributeName = \"attributeValue\"',function(){
                    try {
                        parser.parse('member did eat with bob = \"bob\" 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(11);
                        should(literalChoices).eql([',','after','and','at','before','between','exactly','give','in','less']);

                        should(otherChoices).eql([ 'whitespace']);
                    }
                });
                
                it('member did actionCode with attributeName = \"attributeValue\",',function(){
                    try {
                        parser.parse('member did eat with bob = \"bob\",');
                    } catch (error) {
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(otherChoices).eql([ 'attributeName','whitespace']);
                    }
                });
                
                it('member did nothing',function(){
                    try {
                        parser.parse('member did nothing 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(10);
                        should(literalChoices).eql(['after','and','at','before','between','exactly','give','in','less']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });
                
                it('member did something',function(){
                    try {
                        parser.parse('member did something 3');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(10);
                        should(literalChoices).eql(['after','and','at','before','between','exactly','give','in','less']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });
                
            });

        });

        describe('has',function(){
            
            describe('should auto-complete',function(){

                it('member has',function(){
                    try {
                        parser.parse('member has');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(3);
                        should(literalChoices).eql(['completed','not']);
                        should(otherChoices).eql([ 'whitespace']);
                    }
                });

                it('member has not',function(){
                    try {
                        parser.parse('member has not');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(2);
                        should(literalChoices).eql(['completed']);
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

                        should(error.expected.length).equal(10);
                        should(literalChoices).eql(['after', 'and', 'at', 'before', 'between', 'exactly', 'give', 'in', 'less']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });
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

                    should(error.expected.length).equal(7);
                    should(literalChoices).eql(['after','and','before','between','give','in']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

            it('member did something at least number time',function(){
                try {
                    parser.parse('member did something at least 1 time 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(7);
                    should(literalChoices).eql(['after','and','before','between','give','in']);
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
                    parser.parse('member did something after 2016-03-04T23:20:20 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and','give']);
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
                    parser.parse('member did something between 2016-03-04T23:20:20 and 2016-03-04T23:20:21 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and','give']);
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
                    parser.parse('member did something in last 3 weeks 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(3);
                    should(literalChoices).eql(['and','give']);
                    should(otherChoices).eql([ 'whitespace']);
                }
            });

        });

    });
});
