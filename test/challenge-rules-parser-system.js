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
                            {type:'on', date: new Date(2016, 4-1, 4), time:null}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            
            it('action TEST in zone CODE1,CODE2 every sunday,monday give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every sunday,monday give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['sunday','monday'],months:null,years:null, time:null}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });

            it('action TEST in zone CODE1,CODE2 every sunday,monday of march give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every sunday,monday of march give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['sunday','monday'],months:['march'],years:null,time:null}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            it('action TEST in zone CODE1,CODE2 every sunday of march,january in 1959 give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every sunday of march,january in 1959 give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['sunday'],months:['march','january'],years:['1959'],time:null}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            it('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['day'],months:['march','january'],years:[new Date(1959, 11, 10),new Date(1960, 2, 10)],time:null}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            it('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 before 04:00 am give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 before 04:00 am give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['day'],months:['march','january'],years:[new Date(1959, 11, 10),new Date(1960, 2, 10)],time:{type:"before",time:"04:00 am"}}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            it('action TEST in zone CODE1,CODE2 on 2016-04-04 between 05:30 am and 06:30 pm give 1 points', function (done) {

                var rule = parser.parse("action TEST in zone CODE1,CODE2 on 2016-04-04 between 05:30 am and 06:30 pm give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'on', date: new Date(2016, 4-1, 4), time:{type:"between",time:["05:30 am","06:30 pm"]}}
                        ]
                    }],
                    rewards: [
                        {quantity: 1, code: 'points'}
                    ]
                });
                done();
            });
            it('action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 after 04:00 am give 1 points',function (done){
                var rule = parser.parse("action TEST in zone CODE1,CODE2 every day of march,january from 1959-12-10 to 1960-03-10 after 04:00 am give 1 points");
                should(rule).eql({
                    rules: [{
                        scope: 'action', code: 'TEST',
                        conditions: [],
                        filters: [
                            {type: 'zone', zones: ['CODE1', 'CODE2']}
                        ],
                        systems: [
                            {type:'every', days:['day'],months:['march','january'],years:[new Date(1959, 11, 10),new Date(1960, 2, 10)],time:{type:"after",time:"04:00 am"}}
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
