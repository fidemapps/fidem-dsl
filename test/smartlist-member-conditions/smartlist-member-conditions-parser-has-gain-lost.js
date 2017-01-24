'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions has gain/lost:', function () {
	    before(function (done) {
		    return helper.smartlistParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });
        describe('gained/lost',function(){

            describe('tag',function(){

                it('member has gained tag bob:bob',function(done){
                    var rule = parser.parse('member has gained tag bob:bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type: 'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }

                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has lost 3 tag bob:bob',function(done){
                    var rule = parser.parse('member has lost 3 tag bob:bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        quantity:3,
                                        type:'lost_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not gained 3 tag bob:bob',function(done){
                    var rule = parser.parse('member has not gained 3 tag bob:bob');
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
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has not lost tag bob:bob',function(done){
                    var rule = parser.parse('member has not lost tag bob:bob');
                    should(rule).eql({
                            conditions: [
                                {
                                    scope: 'member',
                                    type: 'has',
                                    negative:true,
                                    query: {
                                        type:'lost_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob:bob in last 3 days ',function(done){
                    var rule = parser.parse('member has gained tag bob:bob in last 3 days');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
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

                it('member has gained tag bob:bob before 2016-04-04 10:10',function(done){
                    var rule = parser.parse('member has gained tag bob:bob before 2016-04-04 10:10');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
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

                it('member has gained tag bob:bob after 2016-04-04 10:10 pm',function(done){
                    var rule = parser.parse('member has gained tag bob:bob after 2016-04-04 10:10 pm');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
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

                it('member has gained tag bob:bob between  2016-04-04   10:10 and  2016-04-05 10:10',function(done){
                    var rule = parser.parse('member has gained tag bob:bob between  2016-04-04 10:10 and  2016-04-05 10:10 pm');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
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

	            it('member has gained tag bob:bob between  2016-04-04   10:10 and  2016-04-05 10:10 pm  before 8:00 pm',function(done){
		            var rule = parser.parse('member has gained tag bob:bob between  2016-04-04 10:10 and  2016-04-05 10:10 pm  before 8:00 pm');
		            should(rule).eql({
				            conditions:[
					            {
						            scope: 'member',
						            type: 'has',
						            query: {
							            type:'gained_tag',
							            tagCode: {
								            tagClusterCode: 'bob',
								            tagCode: 'bob'
							            }
						            },
						            periodFilter: {
							            type:'between',
							            dates:['2016-04-04 10:10','2016-04-05 22:10']
						            },
                                    momentFilter: {
						                type: 'before',
                                        times: ['20:00']
                                    }

					            }]
			            }
		            );
		            done();
	            });

	            it('member has gained tag bob:bob since did action eat',function(done){
                    var rule = parser.parse('member has gained tag bob:bob since did action eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob:bob since did first action eat',function(done){
                    var rule = parser.parse('member has gained tag bob:bob since did first action eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        scope:'action',
                                        position:'first',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob:bob since did last action eat',function(done){
                    var rule = parser.parse('member has gained tag bob:bob since did last action eat');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_did',
                                        scope:'action',
                                        position:'last',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained tag bob:bob since received prize points',function(done){
                    var rule = parser.parse('member has gained tag bob:bob since received prize points');
                    should(rule).eql({
                            conditions:[
                                {
                                    scope: 'member',
                                    type: 'has',
                                    query: {
                                        type:'gained_tag',
                                        tagCode: {
                                            tagClusterCode: 'bob',
                                            tagCode: 'bob'
                                        }
                                    },
                                    periodFilter: {
                                        type:'since_received',
                                        scope:'prize',
                                        prizeCode:'points'
                                    }

                                }]
                        });
                    done();
                });

                it('member has gained tag bob:bob before 12:00 pm',function(done){
	                var rule = parser.parse('member has gained tag bob:bob before 12:00 pm');
	                should(rule).eql({
			                conditions:[
				                {
					                scope: 'member',
					                type: 'has',
					                query: {
						                type:'gained_tag',
						                tagCode: {
							                tagClusterCode: 'bob',
							                tagCode: 'bob'
						                }
					                },
					                momentFilter: {
						                type:'before',
						                times:['12:00']
					                }

				                }]
		                });
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

                it('member has gained points bob since did action eat',function(done){
                    var rule = parser.parse('member has gained points bob since did action eat');
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
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did first action eat',function(done){
                    var rule = parser.parse('member has gained points bob since did first action eat');
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
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did last action eat',function(done){
                    var rule = parser.parse('member has gained points bob since did last action eat');
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
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did check-in eat',function(done){
                    var rule = parser.parse('member has gained points bob since did check-in eat');
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
                                        scope:'check-in',
                                        checkinCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did first check-in eat',function(done){
                    var rule = parser.parse('member has gained points bob since did first check-in eat');
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
                                        scope:'check-in',
                                        checkinCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained points bob since did last check-in eat',function(done){
                    var rule = parser.parse('member has gained points bob since did last check-in eat');
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
                                        scope:'check-in',
                                        checkinCode:'eat'
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
                                        scope:'prize',
                                        prizeCode:'points'
                                    }

                                }]
                        }
                    );
                    done();
                });

	            it('member has gained points bob during the evening',function(done){
		            var rule = parser.parse('member has gained points bob during the evening');
		            should(rule).eql({
				            conditions:[
					            {
						            scope: 'member',
						            type: 'has',
						            query: {
							            type:'gained_points',
							            levelCode:'bob'
						            },
						            momentFilter: {
							            type:'during',
							            moment:'evening',
						            }

					            }]
			            });
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

                it('member has gained prize bob since did action eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did action eat');
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
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since did first action eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did first action eat');
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
                                        scope:'action',
                                        actionCode:'eat'
                                    }

                                }]
                        }
                    );
                    done();
                });

                it('member has gained prize bob since did last action eat',function(done){
                    var rule = parser.parse('member has gained prize bob since did last action eat');
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
                                        scope:'action',
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
                                        scope:'prize',
                                        prizeCode:'prize'
                                    }

                                }]
                        }
                    );
                    done();
                });

	            it('member has gained prize bob between 12:00 and 8:00 pm',function(done){
		            var rule = parser.parse('member has gained prize bob between 12:00 and 8:00 pm');
		            should(rule).eql({
				            conditions:[
					            {
						            scope: 'member',
						            type: 'has',
						            query: {
							            type:'gained_prize',
							            prizeCode:'bob'
						            },
						            momentFilter: {
							            type:'between',
							            times:['12:00', '20:00']
						            }

					            }]
			            });
		            done();
	            });

            });
        });


    });
});