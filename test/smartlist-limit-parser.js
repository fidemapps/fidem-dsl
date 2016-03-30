'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('List Member Limit:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-limit-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Only filter condition', function () {
            it('only top 100 by member points TestLevel1', function (done) {
                var condition = parser.parse("only top 100 by member points TestLevel1");
                should(condition).eql({
                        filter: {
                            quantity: 100,
                            type: 'points',
                            tagClusterCode: null,
                            code: 'TestLevel1'
                        }
                    }
                );
                done();
            });

            it('only top 100 by member points TestLevel1', function (done) {
                var condition = parser.parse("only top 100 by member tag TEST");
                should(condition).eql({
                      filter: {
                          quantity: 100,
                          type: 'tag',
                          tagClusterCode: null,
                          code: 'TEST'
                      }
                  }
                );
                done();
            });

            it('only top 100 by member points TestLevel1 (with tag cluster)', function (done) {
                var condition = parser.parse("only top 100 by member tag CLUSTER:TEST");
                should(condition).eql({
                      filter: {
                          quantity: 100,
                          type: 'tag',
                          tagClusterCode: 'CLUSTER',
                          code: 'TEST'
                      }
                  }
                );
                done();
            });

        });
    });
});
