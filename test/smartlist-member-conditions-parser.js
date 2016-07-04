'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('List Member Conditions:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('Should parse member is conditions', function () {

            it('member is in zone CODE1', function (done) {
                var condition = parser.parse("member is in zone CODE1");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'zone', zones: [ 'CODE1' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

            it('member is in zone CODE1,CODE2', function (done) {
                var condition = parser.parse("member is in zone CODE1,CODE2");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'zone', zones: [ 'CODE1','CODE2' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
                done();
            });

            it('member is in range of beacon bob',function(){
                var condition = parser.parse("member is in range of beacon bob");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'inRange', beacons: [ 'bob' ] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is in range of beacon bob,tom',function(){
                var condition = parser.parse("member is in range of beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {

                            geo_filter: { type: 'inRange', beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI over 4 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI over 4 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {

                            geo_filter: { type: 'RSSI-over', number:4, beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI below 4 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI below 4 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'RSSI-below',number :4 , beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

            it('member is with RSSI between 4  and 5 from beacon bob,tom',function(){
                var condition = parser.parse("member is with RSSI between 4  and 5 from beacon bob,tom");
                should(condition).eql({
                    conditions: [
                        {
                            geo_filter: { type: 'RSSI-between', start:4,end:5, beacons: [ 'bob' ,'tom'] },
                            scope: 'member',
                            type: 'is'
                        }
                    ]
                });
            });

        });

        describe('Should parse member created conditions', function () {

            it('member created last 1 week', function (done) {
                var condition = parser.parse("member created in last 1 week");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { duration: 1, durationScope: 'week', type: 'last' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

            it('member created after 2014-01-01T10:10:10',function(){
                var condition = parser.parse("member created after 2014-01-01T10:10:10");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { date: [new Date('2014-01-01 10:10:10')], type: 'after' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created before 2014-01-01T10:10:10',function(){
                var condition = parser.parse("member created before 2014-01-01T10:10:10");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { date: [new Date('2014-01-01 10:10:10')], type: 'before' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did first eat',function(){
                var condition = parser.parse("member created since did first eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did',position:'first' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did last eat',function(){
                var condition = parser.parse("member created since did last eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did',position:'last' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since did eat',function(){
                var condition = parser.parse("member created since did eat");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { actionCode: 'eat', type: 'since-did' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created since received prize points',function(){

                var condition = parser.parse("member created since received prize points");
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: { prizeCode: 'points', type: 'since-received',target:'prize' },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
            });

            it('member created between 2014-01-01T10:10:10 and 2015-01-01T08:08:08', function (done) {
                var condition = parser.parse('member created between 2014-01-01T10:10:10 and 2015-01-01T08:08:08');
                should(condition).eql({
                    conditions: [
                        {

                            period_filter: {
                                date: [ new Date('2014-01-01 10:10:10'), new Date('2015-01-01 08:08:08') ],
                                type: 'between'
                            },
                            scope: 'member',
                            type: 'created'
                        }
                    ]
                });
                done();
            });

        });

        describe('Should parse member city/state/country/zip conditions', function () {

            it('member city = "test"', function (done) {
                var condition = parser.parse('member city = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
                done();
            });

            it('member state = "test"', function (done) {
                var condition = parser.parse('member state = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
                done();
            });

            it('member country = "test"', function (done) {
                var condition = parser.parse('member country = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
                done();
            });

            it('member zip = "test"', function (done) {
                var condition = parser.parse('member zip = "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '=', value: 'test' },
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
                done();
            });

            it('member city != "test"', function (done) {
                var condition = parser.parse('member city != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'city'
                        }
                    ]
                });
                done();
            });

            it('member state != "test"', function (done) {
                var condition = parser.parse('member state != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'state'
                        }
                    ]
                });
                done();
            });

            it('member country != "test"', function (done) {
                var condition = parser.parse('member country != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'country'
                        }
                    ]
                });
                done();
            });

            it('member zip != "test"', function (done) {
                var condition = parser.parse('member zip != "test"');
                should(condition).eql({
                    conditions: [
                        {
                            condition: { operator: '!=', value: 'test' },
                            scope: 'member',
                            type: 'zip'
                        }
                    ]
                });
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
                                condition: { tagCode: { tagClusterCode: null, tagCode: 'bob' } },
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
                                condition: { tagCode: { tagClusterCode: null, tagCode: 'bob' }, operator:'=',value:3 },
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
                                condition: { tagCode: { tagClusterCode: null, tagCode: 'bob' } },
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
                                condition: { tagCode: { tagClusterCode: null, tagCode: 'bob' },operator:'>',value:3 },
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
                                condition: { levelCode: 'levelCode', operator:'<',value:10 },
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
                                condition: { levelCode: 'levelCode', operator:'<=',value:10 },
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
                                condition: { prizeCode: 'PRIZECODE' },
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
                                condition: { prizeCode: 'PRIZECODE'},
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
