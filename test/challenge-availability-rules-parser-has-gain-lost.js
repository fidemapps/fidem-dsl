'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Availability Member conditions Rules has gained/lost:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-availability-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });
        
        describe('has gained/lost', function () {

            describe('tag', function () {

                it('member has gained tag bob', function (done) {
                    var rule = parser.parse('member has gained tag bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
                            }

                        }]
                    );
                    done();
                });

                it('member has lost 3 tag bob', function (done) {
                    var rule = parser.parse('member has lost 3 tag bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                quantity: 3,
                                type: 'lost',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'

                                }
                            }

                        }]
                    );
                    done();
                });

                it('member has not gained 3 tag bob', function (done) {
                    var rule = parser.parse('member has not gained 3 tag bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                quantity: 3,
                                type: 'gained',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
                            }

                        }]
                    );
                    done();
                });

                it('member has not lost tag bob', function (done) {
                    var rule = parser.parse('member has not lost tag bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'lost',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
                            }

                        }]
                    );
                    done();
                });

                it('member has gained tag bob in last 3 days', function (done) {
                    var rule = parser.parse('member has gained tag bob in last 3 days');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                tagCode: {
                                    tagClusterCode: null,
                                    tagCode: 'bob'
                                }
                            },
                            period_filter: {
                                type: 'last',
                                duration: 3,
                                durationScope: 'day'
                            }

                        }]
                    );
                    done();
                });

            });

            describe('points', function () {

                it('member has gained points bob', function (done) {
                    var rule = parser.parse('member has gained points bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                levelCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has lost 3 points bob', function (done) {
                    var rule = parser.parse('member has lost 3 points bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                quantity: 3,
                                type: 'lost',
                                levelCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has not gained 3 points bob', function (done) {
                    var rule = parser.parse('member has not gained 3 points bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                quantity: 3,
                                type: 'gained',
                                levelCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has not lost points bob', function (done) {
                    var rule = parser.parse('member has not lost points bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'lost',
                                levelCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has gained points bob in last 3 days', function (done) {
                    var rule = parser.parse('member has gained points bob in last 3 days');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                levelCode: 'bob'

                            },
                            period_filter: {
                                type: 'last',
                                duration: 3,
                                durationScope: 'day'
                            }

                        }]
                    );
                    done();
                });
            });

            describe('prize', function () {
                it('member has gained prize bob', function (done) {
                    var rule = parser.parse('member has gained prize bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                prizeCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has lost 3 prize bob', function (done) {
                    var rule = parser.parse('member has lost 3 prize bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                quantity: 3,
                                type: 'lost',
                                prizeCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has not gained 3 prize bob', function (done) {
                    var rule = parser.parse('member has not gained 3 prize bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                quantity: 3,
                                type: 'gained',
                                prizeCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has not lost prize bob', function (done) {
                    var rule = parser.parse('member has not lost prize bob');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            negative: true,
                            query: {
                                type: 'lost',
                                prizeCode: 'bob'

                            }

                        }]
                    );
                    done();
                });

                it('member has gained prize bob in last 3 days', function (done) {
                    var rule = parser.parse('member has gained prize bob in last 3 days');
                    should(rule).eql([
                        {
                            scope: 'member',
                            type: 'has',
                            query: {
                                type: 'gained',
                                prizeCode: 'bob'

                            },
                            period_filter: {
                                type: 'last',
                                duration: 3,
                                durationScope: 'day'
                            }


                        }]
                    );
                    done();
                });
            });

        });


    });

});