'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
  describe('Auto-Complete Content Member Conditions Member:', function () {
    var literalChoices;
    var otherChoices;

	  before(function (done) {
		  return helper.contentParser().then(function(newParser){
			  parser = newParser;
			  done()
		  });
	  });


    describe('should auto-complete the geo filter', function () {

      it('member did something in geofence ', function () {
        try {
          parser.parse('member did something in geofence ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['geofenceCode', 'whitespace']);
        }
      });

      it('member did something in geofence montreal', function () {
        try {
          parser.parse('member did something in geofence montreal s');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(10);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did something in geofence montreal,', function () {
        try {
          parser.parse('member did something in geofence montreal,');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['geofenceCode', 'whitespace']);
        }
      });

      it('member did something in geofence montreal,laval', function () {
        try {
          parser.parse('member did something in geofence montreal,laval s');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(10);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
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

      it('member did something in range of beacon ', function () {
        try {
          parser.parse('member did something in range of beacon ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['beaconCode', 'whitespace']);
        }
      });

      it('member did something in range of beacon montreal', function () {
        try {
          parser.parse('member did something in range of beacon montreal s');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(10);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
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
          should(otherChoices).eql(['beaconCode', 'whitespace']);
        }
      });

      it('member did something in range of beacon montreal,laval', function () {
        try {
          parser.parse('member did something in range of beacon montreal,laval s');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(10);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'during the', 'in last', 'since']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI ', function () {
        try {
          parser.parse('member did something with RSSI ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(4);
          should(literalChoices).eql(['below', 'between', 'over']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI over ', function () {
        try {
          parser.parse('member did something with RSSI over ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did somthing with RSSI below ', function () {
        try {
          parser.parse('member did something with RSSI below ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did somthing with RSSI between ', function () {
        try {
          parser.parse('member did something with RSSI between ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did somthing with RSSI over 3 ', function () {
        try {
          parser.parse('member did something with RSSI over 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['from']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI below 3 ', function () {
        try {
          parser.parse('member did something with RSSI below 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['from']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 ', function () {
        try {
          parser.parse('member did something with RSSI between 3 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['and']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI over 3 from ', function () {
        try {
          parser.parse('member did something with RSSI over 3 from ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['beacon']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI below 3 from ', function () {
        try {
          parser.parse('member did something with RSSI below 3 from ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['beacon']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 and ', function () {
        try {
          parser.parse('member did something with RSSI between 3 and ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['number', 'whitespace']);
        }
      });

      it('member did somthing with RSSI over 3 from beacon ', function () {
        try {
          parser.parse('member did something with RSSI over 3 from beacon ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['beaconCode', 'whitespace']);
        }
      });

      it('member did somthing with RSSI below 3 from beacon ', function () {
        try {
          parser.parse('member did something with RSSI below 3 from beacon ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['beaconCode', 'whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 and 4 ' , function () {
        try {
          parser.parse('member did something with RSSI between 3 and 4 ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['from']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 and 4 from ', function () {
        try {
          parser.parse('member did something with RSSI between 3 and 4 from ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql(['beacon']);
          should(otherChoices).eql(['whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 and 4 from beacon ', function () {
        try {
          parser.parse('member did something with RSSI between 3 and 4 from beacon ');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(2);
          should(literalChoices).eql([]);
          should(otherChoices).eql(['beaconCode', 'whitespace']);
        }
      });

      it('member did somthing with RSSI over 3 from beacon mtl', function () {
        try {
          parser.parse('member did something with RSSI over 3 from beacon mtl');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(9);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'in', 'since']);
          should(otherChoices).eql([, 'whitespace']);
        }
      });

      it('member did somthing with RSSI below 3 from beacon mtl', function () {
        try {
          parser.parse('member did something with RSSI below 3 from beacon mtl');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(9);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'in', 'since']);
          should(otherChoices).eql([, 'whitespace']);
        }
      });

      it('member did somthing with RSSI between 3 and 4 from beacon mtl', function () {
        try {
          parser.parse('member did something with RSSI between 3 and 4 from beacon mtl');
        } catch (error) {
          literalChoices = helper.extractLiterals(error);
          otherChoices = helper.extractOthers(error);

          should(error.expected.length).equal(9);
          should(literalChoices).eql([',', 'after', 'and', 'before', 'between', 'in', 'since']);
          should(otherChoices).eql([, 'whitespace']);
        }
      });


    })

  });
});