'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Rules:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse rules with system condition', function () {
            it('action TEST in zone CODE1,CODE2 on 2016-04-04 give 1 points', function (done) {

                var rule = parser.parse("action TEST in zone CODE1,CODE2 on 2016-04-04 give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'on', date: new Date(2016, 4-1, 4)}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
        });
    });
});
