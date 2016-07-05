'use strict';

var should = require('should'),
  fs = require('fs'),
  helper = require('./helper'),
  PEG = require('pegjs');

var parser;
var otherChoices;
var literalChoices;
describe('<Unit Test>', function () {
  describe('Auto-Complete Challenge Rules:', function () {
    beforeEach(function (done) {
      fs.readFile(__dirname + '/../dsl/challenge-rules-parser.pegjs', 'utf8', function (error, data) {
        if (error) {
          return done(error);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });


    describe('member',function(){

      it('member',function(){
        try {
          parser.parse("member");
        }
        catch (error) {
          var literalChoices = helper.extractLiterals(error);
          should(error.expected.length).equal(13);
          should(literalChoices).eql([
            'belongs to smartlist',
            'city',
            'country',
            'created',
            'did',
            'do not belongs to smartlist',
            'has',
            'is',
            'state',
            'with',
            'without',
            'zip'
          ]);
        }
      });

      describe('is rule',function(){
        var literalChoices;
        var otherChoices;

        it('member is',function(){
          try {
            parser.parse("member is");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['in range of','in zone','with RSSI']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is in zone',function(){
          try {
            parser.parse("member is in zone");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['whitespace','zoneCode']);
          }
        });

        it('member is in zone montreal',function(){
          try {
            parser.parse("member is in zone montreal s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is in zone montreal,',function(){
          try {
            parser.parse("member is in zone montreal,");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['whitespace','zoneCode']);
          }
        });

        it('member is in zone montreal,laval',function(){
          try {
            parser.parse("member is in zone montreal,laval s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is in range of',function(){
          try {
            parser.parse("member is in range of");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql(['beacon']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is in range of beacon',function(){
          try {
            parser.parse("member is in range of beacon");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is in range of beacon montreal',function(){
          try {
            parser.parse("member is in range of beacon montreal s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is in range of beacon montreal,',function(){
          try {
            parser.parse("member is in range of beacon montreal,");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is in range of beacon montreal,laval',function(){
          try {
            parser.parse("member is in range of beacon montreal,laval s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI',function(){
          try {
            parser.parse('member is with RSSI ');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['below','between','over']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI over',function(){
          try {
            parser.parse('member is with RSSI over');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number','whitespace']);
          }
        });

        it('member is with RSSI over 3',function(){
          try {
            parser.parse('member is with RSSI over 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['from']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI over 3 from',function(){
          try {
            parser.parse('member is with RSSI over 3 from');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['beacon']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI over 3 from beacon',function(){
          try {
            parser.parse('member is with RSSI over 3 from beacon');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is with RSSI over 3 from beacon bob',function(){
          try {
            parser.parse('member is with RSSI over 3 from beacon bob s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI over 3 from beacon bob,',function(){
          try {
            parser.parse('member is with RSSI over 3 from beacon bob,');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is with RSSI below',function(){
          try {
            parser.parse('member is with RSSI over');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number','whitespace']);
          }
        });

        it('member is with RSSI below 3',function(){
          try {
            parser.parse('member is with RSSI below 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['from']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI below 3 from',function(){
          try {
            parser.parse('member is with RSSI below 3 from');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['beacon']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI below 3 from beacon',function(){
          try {
            parser.parse('member is with RSSI below 3 from beacon');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is with RSSI below 3 from beacon bob',function(){
          try {
            parser.parse('member is with RSSI below 3 from beacon bob s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI below 3 from beacon bob,',function(){
          try {
            parser.parse('member is with RSSI below 3 from beacon bob,');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is with RSSI between',function(){
          try {
            parser.parse('member is with RSSI over');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number','whitespace']);
          }
        });

        it('member is with RSSI between 3',function(){
          try {
            parser.parse('member is with RSSI between 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['and']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI between 3 and',function(){
          try {
            parser.parse('member is with RSSI between 3 and');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['number','whitespace']);
          }
        });

        it('member is with RSSI between 3 and 4',function(){
          try {
            parser.parse('member is with RSSI between 3 and 4');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['from']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI between 3 and 4 from',function(){
          try {
            parser.parse('member is with RSSI between 3 and 4 from');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['beacon']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI between 3 and 4 from beacon',function(){
          try {
            parser.parse('member is with RSSI between 3 and 4 from beacon');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });

        it('member is with RSSI between 3 and 4 from beacon bob',function(){
          try {
            parser.parse('member is with RSSI between 3 and 4 from beacon bob s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(5);
            should(literalChoices).eql([',','and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member is with RSSI between 3 and 4 from beacon bob,',function(){
          try {
            parser.parse('member is with RSSI between 3 and 4 from beacon bob,');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['beaconCode','whitespace']);
          }
        });


      });

      describe('with/without rule',function(){

        it('member with ',function(){
          try {
            parser.parse('member with');
          } catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['points','prize','tag']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member without',function(){
          try {
            parser.parse('member without');
          } catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['points','prize','tag']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        describe('tag',function(){
          it('member with tag',function(){
            try {
              parser.parse('member with tag');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(2);
              should(literalChoices).eql([]);
              should(otherChoices).eql(['tagCode','whitespace']);
            }
          });

          it('member with tag bob',function(){
            try {
              parser.parse('member with tag bob d');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(9);
              should(literalChoices).eql(['<', '<=', '=', '>', '>=', 'and' ,'give','on']);
              should(otherChoices).eql(['whitespace']);
            }
          });

          it('member with tag bob >=',function(){
            try {
              parser.parse('member with tag bob >=');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(2);
              should(literalChoices).eql([]);
              should(otherChoices).eql(['number','whitespace']);
            }
          });

          it('member with tag bob >= 4',function(){
            try {
              parser.parse('member with tag bob >= 4');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(4);
              should(literalChoices).eql(['and','give','on']);
              should(otherChoices).eql(['whitespace']);
            }
          });
        });

        describe('points',function(){
          it('member with points',function(){
            try {
              parser.parse('member with points');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(2);
              should(literalChoices).eql([]);
              should(otherChoices).eql(['levelCode','whitespace']);
            }
          });

          it('member with points bob',function(){
            try {
              parser.parse('member with points bob d');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(6);
              should(literalChoices).eql(['<', '<=', '=', '>', '>=' ]);
              should(otherChoices).eql(['whitespace']);
            }
          });

          it('member with points bob >=',function(){
            try {
              parser.parse('member with points bob >=');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(2);
              should(literalChoices).eql([]);
              should(otherChoices).eql(['number','whitespace']);
            }
          });

          it('member with points bob >= 4',function(){
            try {
              parser.parse('member with points bob >= 4');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(4);
              should(literalChoices).eql(['and','give','on']);
              should(otherChoices).eql(['whitespace']);
            }
          });
        });

        describe('prize',function(){

          it('member with prize',function(){
            try {
              parser.parse('member with prize');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(2);
              should(literalChoices).eql([]);
              should(otherChoices).eql(['prizeCode','whitespace']);
            }
          });

          it('member with prize bob',function(){
            try {
              parser.parse('member with prize bob d');
            } catch (error) {
              var literalChoices = helper.extractLiterals(error);
              var otherChoices = helper.extractOthers(error);
              should(error.expected.length).equal(4);
              should(literalChoices).eql(['and','give','on']);
              should(otherChoices).eql(['whitespace']);
            }
          });
        });

      });

      describe('created rule',function(){

        it('member created before', function () {
          try {
            parser.parse('member created before');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['datetime', 'whitespace']);
          }
        });

        it('member created after', function () {
          try {
            parser.parse('member created after');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['datetime', 'whitespace']);
          }
        });

        it('member created after/before datetime', function () {
          try {
            parser.parse('member created after 2016-03-04T23:20:20 2');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created between', function () {
          try {
            parser.parse('member created between');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['datetime', 'whitespace']);
          }
        });

        it('member created between datetime', function () {
          try {
            parser.parse('member created between 2016-03-04T23:20:20');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['and']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created between datetime and', function () {
          try {
            parser.parse('member created between 2016-03-04T23:20:20 and');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['datetime', 'whitespace']);
          }
        });

        it('member created between datetime and datetime', function () {
          try {
            parser.parse('member created between 2016-03-04T23:20:20 and 2016-03-04T23:20:21 4');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created in', function () {
          try {
            parser.parse('member created in');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['last']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created in last', function () {
          try {
            parser.parse('member created in last');
          } catch (error) {
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(otherChoices).eql(['number', 'whitespace']);
          }
        });

        it('member created in last number', function () {
          try {
            parser.parse('member created in last 3');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(13);
            should(literalChoices).eql(['day', 'days', 'hour', 'hours', 'minute', 'minutes', 'month', 'months', 'week', 'weeks', 'year', 'years']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created in last number timeframe', function () {
          try {
            parser.parse('member created in last 3 weeks 4');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since',function(){
          try {
            parser.parse('member created since');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(3);
            should(literalChoices).eql(['did','received']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since did',function(){
          try {
            parser.parse('member created since did');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['first','last']);
            should(otherChoices).eql(['actionCode','whitespace']);
          }
        });

        it('member created since did eat',function(){
          try {
            parser.parse('member created since did eat s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since did first',function(){
          try {
            parser.parse('member created since did first ');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['actionCode','whitespace']);
          }
        });

        it('member created since did last',function(){
          try {
            parser.parse('member created since did last ');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['actionCode','whitespace']);
          }
        });

        it('member created since did first eat',function(){
          try {
            parser.parse('member created since did first eat s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since did last eat',function(){
          try {
            parser.parse('member created since did last eat s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since received',function(){
          try {
            parser.parse('member created since received');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql(['prize']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member created since received prize',function(){
          try {
            parser.parse('member created since received prize');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['prizeCode','whitespace']);
          }
        });

        it('member created since received prize prizeCode',function(){
          try {
            parser.parse('member created since received prize prizeCode s');
          } catch (error) {
            literalChoices = helper.extractLiterals(error);
            otherChoices = helper.extractOthers(error);

            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

      });

      describe('city rule',function(){

        it('member city',function(){
          try {
            parser.parse("member city");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(3);
            should(literalChoices).eql(['!=','=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member city =',function(){
          try {
            parser.parse("member city =");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member city = "bob"',function(){
          try {
            parser.parse("member city = 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member city !=',function(){
          try {
            parser.parse("member city !=");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member city != "bob"',function(){
          try {
            parser.parse("member city != 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

      });

      describe('state rule',function(){

        it('member state',function(){
          try {
            parser.parse("member state");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(3);
            should(literalChoices).eql(['!=','=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member state =',function(){
          try {
            parser.parse("member state =");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member state = "bob"',function(){
          try {
            parser.parse("member state = 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member state !=',function(){
          try {
            parser.parse("member state !=");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member state != "bob"',function(){
          try {
            parser.parse("member state != 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });
      });

      describe('zip rule',function(){

        it('member zip',function(){
          try {
            parser.parse("member zip");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(3);
            should(literalChoices).eql(['!=','=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member zip =',function(){
          try {
            parser.parse("member zip =");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member zip = "bob"',function(){
          try {
            parser.parse("member zip = 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member zip !=',function(){
          try {
            parser.parse("member zip !=");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member zip != "bob"',function(){
          try {
            parser.parse("member zip != 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });
      });

      describe('country rule',function(){

        it('member country',function(){
          try {
            parser.parse("member country");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(3);
            should(literalChoices).eql(['!=','=']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member country =',function(){
          try {
            parser.parse("member country =");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member country = "bob"',function(){
          try {
            parser.parse("member country = 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });

        it('member country !=',function(){
          try {
            parser.parse("member country !=");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(2);
            should(literalChoices).eql([]);
            should(otherChoices).eql(['string','whitespace']);
          }
        });

        it('member country != "bob"',function(){
          try {
            parser.parse("member country != 'bob' s");
          }
          catch (error) {
            var literalChoices = helper.extractLiterals(error);
            var otherChoices = helper.extractOthers(error);
            should(error.expected.length).equal(4);
            should(literalChoices).eql(['and','give','on']);
            should(otherChoices).eql(['whitespace']);
          }
        });
      });
    });

  });
});
