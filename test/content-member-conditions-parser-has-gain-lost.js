'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions has gain/lost:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        describe('gained/lost',function(){

            describe('tag',function(){

                it('member has gained tag bob',function(done){
                    var rule = parser.parse('member has gained tag bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type: 'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has lost 3 tag bob',function(done){
                    var rule = parser.parse('member has lost 3 tag bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        quantity:3,
                                        type:'lost_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not gained 3 tag bob',function(done){
                    var rule = parser.parse('member has not gained 3 tag bob');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        quantity:3,
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not lost tag bob',function(done){
                    var rule = parser.parse('member has not lost tag bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        type:'lost_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob in last 3 days ',function(done){
                    var rule = parser.parse('member has gained tag bob in last 3 days');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'last',
                                        duration:3,
                                        durationScope:'day'

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob before 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained tag bob before 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'before',
                                        date:'2016-04-04 10:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob after 2016-04-04 10:10 pm',function(done){
                    var rule = parser.parse('member has gained tag bob after 2016-04-04 10:10 pm');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'after',
                                        date:'2016-04-04 22:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob between  2016-04-04   10:10 and  2016-04-05 10:10',function(done){
                    var rule = parser.parse('member has gained tag bob between  2016-04-04 10:10 and  2016-04-05 10:10 pm');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'between',
                                        dates:['2016-04-04 10:10','2016-04-05 22:10']
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob since did eat',function(done){
                    var rule = parser.parse('member has gained tag bob since did eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob since did first eat',function(done){
                    var rule = parser.parse('member has gained tag bob since did first eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'first',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob since did last eat',function(done){
                    var rule = parser.parse('member has gained tag bob since did last eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'last',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob since received prize points',function(done){
                    var rule = parser.parse('member has gained tag bob since received prize points');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: null,
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_received',
                                        prizeCode:'points'
                                    }

                                }]
                        }
                    );
                    done();
                });

            });

            describe('points',function(){

                it('member has gained points bob',function(done){
                    var rule = parser.parse('member has gained points bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type: 'gained_points',
                                        levelCode:'bob'

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has lost 3 points bob',function(done){
                    var rule = parser.parse('member has lost 3 points bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        quantity:3,
                                        type:'lost_points',
                                        levelCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not gained 3 points bob',function(done){
                    var rule = parser.parse('member has not gained 3 points bob');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        quantity:3,
                                        type:'gained_points',
                                        levelCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not lost points bob',function(done){
                    var rule = parser.parse('member has not lost points bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        type:'lost_points',
                                        levelCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob in last 3 days ',function(done){
                    var rule = parser.parse('member has gained points bob in last 3 days');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'last',
                                        duration:3,
                                        durationScope:'day'

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob before 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained points bob before 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'before',
                                        date:'2016-04-04 10:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob after 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained points bob after 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'after',
                                        date:'2016-04-04 10:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob between  2016-04-04 10:10 and  2016-04-05 10:10',function(done){
                    var rule = parser.parse('member has gained points bob between  2016-04-04 10:10 and  2016-04-05 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'between',
                                        dates:['2016-04-04 10:10','2016-04-05 10:10']
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did eat',function(done){
                    var rule = parser.parse('member has gained points bob since did eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did first eat',function(done){
                    var rule = parser.parse('member has gained points bob since did first eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'first',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did last eat',function(done){
                    var rule = parser.parse('member has gained points bob since did last eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'last',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since received prize points',function(done){
                    var rule = parser.parse('member has gained points bob since received prize points');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_points',
                                        levelCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_received',
                                        prizeCode:'points'
                                    }

                                }]
                        }
                    );
                    done();
                });

            });

            describe('prize',function(){
                it('member has gained prize bob',function(done){
                    var rule = parser.parse('member has gained prize bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type: 'gained_prize',
                                        prizeCode:'bob'

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has lost 3 prize bob',function(done){
                    var rule = parser.parse('member has lost 3 prize bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        quantity:3,
                                        type:'lost_prize',
                                        prizeCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not gained 3 prize bob',function(done){
                    var rule = parser.parse('member has not gained 3 prize bob');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        quantity:3,
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not lost prize bob',function(done){
                    var rule = parser.parse('member has not lost prize bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        type:'lost_prize',
                                        prizeCode:'bob'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob in last 3 days ',function(done){
                    var rule = parser.parse('member has gained prize bob in last 3 days');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'last',
                                        duration:3,
                                        durationScope:'day'

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob before 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained prize bob before 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'before',
                                        date:'2016-04-04 10:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob after 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained prize bob after 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'after',
                                        date:'2016-04-04 10:10'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob between  2016-04-04  10:10 and  2016-04-05  10:10',function(done){
                    var rule = parser.parse('member has gained prize bob between  2016-04-04 09:10 and  2016-04-05 09:10 pm');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'between',
                                        dates:['2016-04-04 09:10','2016-04-05 21:10']
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since did eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since did first eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did first eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'first',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since did last eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did last eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        position:'last',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since received prize prize',function(done){
                    var rule = parser.parse('member has gained prize bob since received prize prize');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_prize',
                                        prizeCode:'bob'
                                    },
                                    periodFilter: {
                                        type:'since_received',
                                        prizeCode:'prize'
                                    }

                                }]
                        }
                    );
                    done();
                });
            });
        });


    });
});