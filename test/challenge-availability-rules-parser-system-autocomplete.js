'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('./helper'),
    PEG = require('pegjs');

var parser;
describe('<Unit Test>', function () {
    describe('Auto-Complete Challenge Availability System Rules:', function () {
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

        describe('Every', function () {

            describe('Exception for auto-complete', function () {

                describe('should auto-complete days', function () {

                    it('should auto-complete the day correctly', function () {
                        try {
                            parser.parse('every');
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(11);
                            should(literalChoices).eql(['day', 'friday', 'monday', 'saturday', 'sunday', 'thursday', 'tuesday', 'wednesday', 'weekday', 'weekend']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('should auto-complete after the day', function () {
                        try {
                            parser.parse('every monday 3');
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(12);
                            should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'from', 'in', 'of', 'starting at', 'until']);
                            should(otherChoices).eql(['whitespace']);
                        }

                    });

                    it('should auto-complete multiple days', function () {
                        try {
                            parser.parse('every monday,');
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(10);
                            should(literalChoices).eql(['friday', 'monday', 'saturday', 'sunday', 'thursday', 'tuesday', 'wednesday', 'weekday', 'weekend']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('should auto-complete after the keyword day', function () {
                        try {
                            parser.parse('every day 3');
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(11);
                            should(literalChoices).eql(['after', 'and', 'before', 'between', 'from', 'in', 'of', 'starting at', 'until']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('should auto-complete months', function () {

                    it('should auto-complete after the keyword of', function () {
                        try {
                            parser.parse('every day of');
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(13);
                            should(literalChoices).eql(['april', 'august', 'december', 'february', 'january', 'july', 'june', 'march', 'may', 'november', 'october', 'september']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('should auto-complete after the month', function () {
                        try {
                            parser.parse('every day of december 3')
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(11);
                            should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'from', 'in', 'starting at', 'until']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('should auto-complete multiple months', function () {

                        try {
                            parser.parse('every day of december,')
                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(13);
                            should(literalChoices).eql(['april', 'august', 'december', 'february', 'january', 'july', 'june', 'march', 'may', 'november', 'october', 'september']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('should auto-complete years', function () {

                    describe('in', function () {
                        it('before the year', function () {
                            try {
                                parser.parse('every day of december,march in');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['whitespace', 'year']);
                            }

                        });

                        it('after the year', function () {
                            try {
                                parser.parse('every day of december,march in 1990 3');

                            } catch (error) {
                                literalChoices = helper.extractLiterals(error);
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(7);
                                should(literalChoices).eql([',', 'after', 'and', 'before', 'between']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                        it('multiple years', function () {
                            try {
                                parser.parse('every day of december,march in 1990,');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['whitespace', 'year']);
                            }
                        });

                    });

                    describe('starting at', function () {

                        it('before year', function () {
                            try {
                                parser.parse('every day of december,march starting at');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['date', 'whitespace']);
                            }
                        });

                        it('after year', function () {
                            try {
                                parser.parse('every day of december,march starting at 1900-03-04 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);

                                should(error.expected.length).equal(6);
                                should(literalChoices).eql(['after', 'and', 'before', 'between']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                    describe('until', function () {

                        it('before year', function () {
                            try {
                                parser.parse('every day of december,march until');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['date', 'whitespace']);
                            }
                        });

                        it('after year', function () {
                            try {
                                parser.parse('every day of december,march until 2003-04-06 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);

                                should(error.expected.length).equal(6);
                                should(literalChoices).eql(['after', 'and', 'before', 'between']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                    describe('from', function () {

                        it('before the first time', function () {
                            try {
                                parser.parse('every day of december,march from');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['date', 'whitespace']);
                            }
                        });

                        it('after the first time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);

                                should(error.expected.length).equal(2);
                                should(literalChoices).eql(['to']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                        it('before the second time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);

                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['date', 'whitespace']);
                            }
                        });

                        it('after the second time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);


                                should(error.expected.length).equal(6);
                                should(literalChoices).eql(['after', 'and', 'before', 'between']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                });

                describe('should auto-complete times', function () {

                    describe('before', function () {
                        
                        it('before time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 before');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);


                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['time', 'whitespace']);
                            }
                        });

                        it('after time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 before 01:30 am 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);


                                should(error.expected.length).equal(2);
                                should(literalChoices).eql(['and']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                    describe('after', function () {
                        
                        it('before time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 after');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);


                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['time', 'whitespace']);
                            }
                        });

                        it('after time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 after 01:30 am 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);


                                should(error.expected.length).equal(2);
                                should(literalChoices).eql(['and']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                    describe('between', function () {

                        it('before first time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 between');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);


                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['time', 'whitespace']);
                            }
                        });

                        it('after first time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 between 01:30 am');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);


                                should(error.expected.length).equal(2);
                                should(literalChoices).eql(['and']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                        it('before second time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 between 01:30 am and');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);


                                should(error.expected.length).equal(2);
                                should(otherChoices).eql(['time', 'whitespace']);
                            }
                        });

                        it('after second time', function () {
                            try {
                                parser.parse('every day of december,march from 2003-04-06 to 2006-05-04 between 01:30 am and 02:00 pm 3');

                            } catch (error) {
                                otherChoices = helper.extractOthers(error);
                                literalChoices = helper.extractLiterals(error);


                                should(error.expected.length).equal(2);
                                should(literalChoices).eql(['and']);
                                should(otherChoices).eql(['whitespace']);
                            }
                        });

                    });

                });

            });

        });

        describe('On', function () {

            describe('should auto-complete date', function () {

                it('before first date', function () {
                    try {
                        parser.parse('on');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(3);
                        should(literalChoices).eql(['the']);
                        should(otherChoices).eql(['date', 'whitespace']);
                    }
                });

                it('after first date', function () {
                    try {
                        parser.parse('on 2016-03-05 3');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(7);
                        should(literalChoices).eql([',', 'after', 'and', 'before', 'between']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('before second date', function () {
                    try {
                        parser.parse('on 2016-03-05,');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);


                        should(error.expected.length).equal(2);
                        should(otherChoices).eql(['date', 'whitespace']);
                    }
                });

            });

            describe('should auto-complete times', function () {

                describe('before', function () {
                    it('before time', function () {
                        try {
                            parser.parse('on 2016-03-05 before');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after time', function () {
                        try {
                            parser.parse('on 2016-03-05 before 01:30 am 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('after', function () {
                    it('before time', function () {
                        try {
                            parser.parse('on 2016-03-05 after');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after time', function () {
                        try {
                            parser.parse('on 2016-03-05 after 01:30 am 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);

                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('between', function () {

                    it('before first time', function () {
                        try {
                            parser.parse('on 2016-03-05 between');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after first time', function () {
                        try {
                            parser.parse('on 2016-03-05 between 01:30 am');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('before second time', function () {
                        try {
                            parser.parse('on 2016-03-05 between 01:30 am and');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after second time', function () {
                        try {
                            parser.parse('on 2016-03-05 between 01:30 am and 02:00 pm 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

            });

        });

        describe('On the',function() {

            describe('should auto-complete the position',function(){
                
                it('before the position',function(){
                    try {
                        parser.parse('on the');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(7);
                        should(literalChoices).eql(['1st','2nd','3rd','last']);
                        should(otherChoices).eql(['digit','whitespace']);
                    }
                });

                it('in the position',function(){
                    try {
                        parser.parse('on the 4');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(2);
                        should(literalChoices).eql(['th']);
                        should(otherChoices).eql(['digit']);
                    }
                    try {
                        parser.parse('on the 14');

                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(1);
                        should(literalChoices).eql(['th']);
                    }
                });

                it('after the position',function(){
                    try {
                        parser.parse('on the 4th');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(3);
                        should(literalChoices).eql([',','day']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('after day',function(){
                    try {
                        parser.parse('on the 4th day');

                    } catch (error) {
                        otherChoices = helper.extractOthers(error);
                        literalChoices = helper.extractLiterals(error);


                        should(error.expected.length).equal(2);
                        should(literalChoices).eql(['of']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

            });

            describe('should auto-complete months', function () {

                it('should auto-complete after the keyword of', function () {
                    try {
                        parser.parse('on the 4th day of');
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(14);
                        should(literalChoices).eql(['april', 'august', 'december', 'february', 'january', 'july', 'june', 'march', 'may','month', 'november', 'october', 'september']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('should auto-complete after the month', function () {
                    try {
                        parser.parse('on the 4th day of december 3')
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(11);
                        should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'from', 'in', 'starting at', 'until']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

                it('should auto-complete multiple months', function () {

                    try {
                        parser.parse('on the 4th day of december,')
                    } catch (error) {
                        literalChoices = helper.extractLiterals(error);
                        otherChoices = helper.extractOthers(error);

                        should(error.expected.length).equal(13);
                        should(literalChoices).eql(['april', 'august', 'december', 'february', 'january', 'july', 'june', 'march', 'may', 'november', 'october', 'september']);
                        should(otherChoices).eql(['whitespace']);
                    }
                });

            });

            describe('should auto-complete years', function () {

                describe('in', function () {
                    it('before the year', function () {
                        try {
                            parser.parse('on the 1st day of december,march in');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['whitespace', 'year']);
                        }

                    });

                    it('after the year', function () {
                        try {
                            parser.parse('on the 1st day of december,march in 1990 3');

                        } catch (error) {
                            literalChoices = helper.extractLiterals(error);
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(7);
                            should(literalChoices).eql([',', 'after', 'and', 'before', 'between']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('multiple years', function () {
                        try {
                            parser.parse('on the 1st day of december,march in 1990,');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['whitespace', 'year']);
                        }
                    });

                });

                describe('starting at', function () {

                    it('before year', function () {
                        try {
                            parser.parse('on the 1st day of december,march starting at');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['date', 'whitespace']);
                        }
                    });

                    it('after year', function () {
                        try {
                            parser.parse('on the 1st day of december,march starting at 1900-03-04 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);

                            should(error.expected.length).equal(6);
                            should(literalChoices).eql(['after', 'and', 'before', 'between']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('until', function () {

                    it('before year', function () {
                        try {
                            parser.parse('on the 1st day of december,march until');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['date', 'whitespace']);
                        }
                    });

                    it('after year', function () {
                        try {
                            parser.parse('on the 1st day of december,march  until 2003-04-06 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);

                            should(error.expected.length).equal(6);
                            should(literalChoices).eql(['after', 'and', 'before', 'between']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('from', function () {

                    it('before the first time', function () {
                        try {
                            parser.parse('on the 1st day of december,march  from');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['date', 'whitespace']);
                        }
                    });

                    it('after the first time', function () {
                        try {
                            parser.parse('on the 1st day of december,march from 2003-04-06');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);

                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['to']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('before the second time', function () {
                        try {
                            parser.parse('on the 1st day of december,march from 2003-04-06 to');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);

                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['date', 'whitespace']);
                        }
                    });

                    it('after the second time', function () {
                        try {
                            parser.parse('on the 1st day of december,march from 2003-04-06 to 2006-05-04 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(6);
                            should(literalChoices).eql(['after', 'and', 'before', 'between']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

            });

            describe('should auto-complete times', function () {

                describe('before', function () {
                    it('before time', function () {
                        try {
                            parser.parse('on the 1st day of month before');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after time', function () {
                        try {
                            parser.parse('on the 1st day of month before 01:30 am 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('after', function () {
                    it('before time', function () {
                        try {
                            parser.parse('on the 1st day of month after');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after time', function () {
                        try {
                            parser.parse('on the 1st day of month after 01:30 am 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

                describe('between', function () {

                    it('before first time', function () {
                        try {
                            parser.parse('on the 1st day of month between');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after first time', function () {
                        try {
                            parser.parse('on the 1st day of month  between 01:30 am');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                    it('before second time', function () {
                        try {
                            parser.parse('on the 1st day of month  between 01:30 am and');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);


                            should(error.expected.length).equal(2);
                            should(otherChoices).eql(['time', 'whitespace']);
                        }
                    });

                    it('after second time', function () {
                        try {
                            parser.parse('on the 1st day of month  between 01:30 am and 02:00 pm 3');

                        } catch (error) {
                            otherChoices = helper.extractOthers(error);
                            literalChoices = helper.extractLiterals(error);


                            should(error.expected.length).equal(2);
                            should(literalChoices).eql(['and']);
                            should(otherChoices).eql(['whitespace']);
                        }
                    });

                });

            });

        });
            
    });
});