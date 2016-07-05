'use strict';

var should = require('should'),
    fs = require('fs'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('SmartList Member Conditions has been:', function () {
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../dsl/smartlist-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });

        describe('has been',function(){

            it('member has been in zone',function(){

                var rule = parser.parse('member has been in zone bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'zone',
                            zones:['bob']
                        }
                    }]
                });

            });

            it('member has not been in zone',function(){

                var rule = parser.parse('member has not been in zone bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'zone',
                            zones:['bob']
                        }
                    }]
                });

            });

            it('member has been in range',function(){

                var rule = parser.parse('member has been in range of beacon bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'inRange',
                            beacons:['bob']
                        }
                    }]
                });

            });

            it('member has not been in range',function(){

                var rule = parser.parse('member has not been in range of beacon bob,tom');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'inRange',
                            beacons:['bob','tom']
                        }
                    }]
                });

            });

            it('member has been with RSSI over',function(){

                var rule = parser.parse('member has been with RSSI over 310 from beacon bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-over',
                            number:310,
                            beacons:['bob']
                        }
                    }]
                });

            });

            it('member has not been with RSSI over',function(){

                var rule = parser.parse('member has not been  with RSSI over 310 from beacon bob,tom,carl');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-over',
                            number:310,
                            beacons:['bob','tom','carl']
                        }
                    }]
                });

            });

            it('member has been with RSSI below',function(){

                var rule = parser.parse('member has been with RSSI below 4 from beacon bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-below',
                            number:4,
                            beacons:['bob']
                        }
                    }]
                });

            });

            it('member has not been with RSSI below',function(){

                var rule = parser.parse('member has not been with RSSI below 4 from beacon bob,eric,jean');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-below',
                            number:4,
                            beacons:['bob','eric','jean']
                        }
                    }]
                });

            });

            it('member has been with RSSI between',function(){

                var rule = parser.parse('member has been with RSSI between 4 and 6 from beacon bob');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-between',
                            number:[4,6],
                            beacons:['bob']
                        }
                    }]
                });
            });

            it('member has not been with RSSI between',function(){

                var rule = parser.parse('member has not been with RSSI between 6 and 4 from beacon bob,norbert');
                should(rule).eql({
                    conditions:[
                    {
                        scope: 'member',
                        type: 'has',
                        negative:true,
                        condition: {
                            type:'been'
                        },
                        geo_filter:{
                            type:'RSSI-between',
                            number:[6,4],
                            beacons:['bob','norbert']
                        }
                    }]
                });

            });

        });

    });
});