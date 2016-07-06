'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions with/without:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member with/without conditions',function(){

            describe('tag',function(){

                it('member with tag bob',function(){
                    var condition = parser.parse('member with tag bob');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: null, tagCode: 'bob' } },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob = 3',function(){
                    var condition = parser.parse('member with tag bob =3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: null, tagCode: 'bob' }, operator:'=',value:3 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without tag bob',function(){
                    var condition = parser.parse('member without tag bob ');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag', tagCode: { tagClusterCode: null, tagCode: 'bob' } },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without tag bob > 3',function(){
                    var condition = parser.parse('member without tag bob > 3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag', tagCode: { tagClusterCode: null, tagCode: 'bob' },operator:'>',value:3 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

            });

            describe('points',function(){

                it('member with points levelCode < 10',function(){
                    var condition = parser.parse('member with points levelCode < 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'points',levelCode: 'levelCode', operator:'<',value:10 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without points levelCode <= 10',function(){
                    var condition = parser.parse('member without points levelCode <= 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'points',levelCode: 'levelCode', operator:'<=',value:10 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

            });

            describe('prize',function(){

                it('member with prize PRIZECODE',function(){
                    var condition = parser.parse('member with prize PRIZECODE');
                    should(condition).eql({
                        conditions: [
                            {
                                query: {type:'prize', prizeCode: 'PRIZECODE' },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without prize PRIZECODE',function(){
                    var condition = parser.parse('member without prize PRIZECODE');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'prize',prizeCode: 'PRIZECODE'},
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

            });

        });

    });
});
