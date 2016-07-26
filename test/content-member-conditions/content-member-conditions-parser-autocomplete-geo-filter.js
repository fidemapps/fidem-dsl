'use strict';

var should = require('should'),
    fs = require('fs'),
    helper = require('../helper'),
    PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
    describe('Auto-Complete Content Member Conditions Member:', function () {
        var literalChoices;
        var otherChoices;
        beforeEach(function (done) {
            fs.readFile(__dirname + '/../../dsl/content-member-conditions-parser.pegjs', 'utf8', function (err, data) {
                if (err) {
                    return done(err);
                }
                parser = PEG.buildParser(data);
                done();
            });
        });



        describe('should auto-complete the geo filter',function(){

            it('member did something in zone', function () {
                try {
                    parser.parse('member did something in zone');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['whitespace','zoneCode']);
                }
            });

            it('member did something in zone montreal', function () {
                try {
                    parser.parse('member did something in zone montreal s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something in zone montreal,', function () {
                try {
                    parser.parse('member did something in zone montreal,');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['whitespace','zoneCode']);
                }
            });

            it('member did something in zone montreal,laval', function () {
                try {
                    parser.parse('member did something in zone montreal,laval s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something in range of', function () {
                try {
                    parser.parse('member did something in range of ');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something in range of beacon', function () {
                try {
                    parser.parse('member did something in range of beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode','whitespace']);
                }
            });

            it('member did something in range of beacon montreal', function () {
                try {
                    parser.parse('member did something in range of beacon montreal s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did something in range of beacon montreal,', function () {
                try {
                    parser.parse('member did something in range of beacon montreal,');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode','whitespace']);
                }
            });

            it('member did something in range of beacon montreal,laval', function () {
                try {
                    parser.parse('member did something in range of beacon montreal,laval s');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI',function(){
                try {
                    parser.parse('member did something with RSSI');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(4);
                    should(literalChoices).eql(['below','between','over']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI over',function(){
                try {
                    parser.parse('member did something with RSSI over');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member did somthing with RSSI below',function(){
                try {
                    parser.parse('member did something with RSSI below');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member did somthing with RSSI between',function(){
                try {
                    parser.parse('member did something with RSSI between');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member did somthing with RSSI over 3',function(){
                try {
                    parser.parse('member did something with RSSI over 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI below 3',function(){
                try {
                    parser.parse('member did something with RSSI below 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI between 3',function(){
                try {
                    parser.parse('member did something with RSSI between 3');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['and']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI over 3 from',function(){
                try {
                    parser.parse('member did something with RSSI over 3 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI below 3 from',function(){
                try {
                    parser.parse('member did something with RSSI below 3 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI between 3 and',function(){
                try {
                    parser.parse('member did something with RSSI between 3 and');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['number','whitespace']);
                }
            });

            it('member did somthing with RSSI over 3 from beacon',function(){
                try {
                    parser.parse('member did something with RSSI over 3 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode','whitespace']);
                }
            });

            it('member did somthing with RSSI below 3 from beacon',function(){
                try {
                    parser.parse('member did something with RSSI below 3 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode','whitespace']);
                }
            });

            it('member did somthing with RSSI between 3 and 4',function(){
                try {
                    parser.parse('member did something with RSSI between 3 and 4');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['from']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI between 3 and 4 from',function(){
                try {
                    parser.parse('member did something with RSSI between 3 and 4 from');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql(['beacon']);
                    should(otherChoices).eql(['whitespace']);
                }
            });

            it('member did somthing with RSSI between 3 and 4 from beacon',function(){
                try {
                    parser.parse('member did something with RSSI between 3 and 4 from beacon');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(2);
                    should(literalChoices).eql([]);
                    should(otherChoices).eql(['beaconCode','whitespace']);
                }
            });

            it('member did somthing with RSSI over 3 from beacon mtl',function(){
                try {
                    parser.parse('member did something with RSSI over 3 from beacon mtl');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql([,'whitespace']);
                }
            });

            it('member did somthing with RSSI below 3 from beacon mtl',function(){
                try {
                    parser.parse('member did something with RSSI below 3 from beacon mtl');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql([,'whitespace']);
                }
            });

            it('member did somthing with RSSI between 3 and 4 from beacon mtl',function(){
                try {
                    parser.parse('member did something with RSSI between 3 and 4 from beacon mtl');
                } catch (error) {
                    literalChoices = helper.extractLiterals(error);
                    otherChoices = helper.extractOthers(error);

                    should(error.expected.length).equal(9);
                    should(literalChoices).eql([',','after','and','before','between','in','since']);
                    should(otherChoices).eql([,'whitespace']);
                }
            });


        })

    });
});