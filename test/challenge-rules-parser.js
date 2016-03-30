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

    describe('Should parse zone rules', function () {
      it('action TEST in zone CODE1 give 1 points', function (done) {

        var rule = parser.parse("action TEST in zone CODE1 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'action', code: 'TEST',
            conditions: [],
            filters: [
              {type: 'zone', zones: ['CODE1']}
            ]
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });
        done();
      });

      it('action TEST in zone CODE1,CODE2 give 1 points', function (done) {

        var rule = parser.parse("action TEST in zone CODE1,CODE2 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'action', code: 'TEST',
            conditions: [],
            filters: [
              {type: 'zone', zones: ['CODE1', 'CODE2']}
            ]
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });
        done();
      });
    });

    describe('Should parse beacon rules', function () {
      it('action TEST near 50 of beacon CODE1 give 1 points', function (done) {

        var rule = parser.parse("action TEST near 50 of beacon CODE1 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'action', code: 'TEST',
            conditions: [],
            filters: [
              {distance: 50, type: 'beacon', beacons: ['CODE1']}
            ]
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });
        done();
      });

      it('action TEST near 50 of beacon CODE1,CODE2 give 1 points', function (done) {

        var rule = parser.parse("action TEST near 50 of beacon CODE1,CODE2 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'action', code: 'TEST',
            conditions: [],
            filters: [
              {distance: 50, type: 'beacon', beacons: ['CODE1', 'CODE2']}
            ]
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });
        done();
      });
    });

    describe('Should parse action rules', function () {
      it('action BrowseTicket give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket give 1 points");
        should(rule).eql({
          rules: [
            {scope: 'action', code: 'BrowseTicket', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });
        done();
      });

      it('action BrowseTicket give 1 points and give 1 CourageBadge', function (done) {

        var rule = parser.parse("action BrowseTicket give 1 points give 1 CourageBadge");
        should(rule).eql({
          rules: [
            {scope: 'action', code: 'BrowseTicket', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 1, code: 'points'},
            {quantity: 1, code: 'CourageBadge'}
          ]
        });

        done();
      });

      it('action BrowseTicket give 100 points give 1 CourageBadge give 2 Rebates', function (done) {

        var rule = parser.parse("action BrowseTicket give 100 points give 1 CourageBadge give 2 Rebates");
        should(rule).eql({
          rules: [
            {scope: 'action', code: 'BrowseTicket', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 100, code: 'points'},
            {quantity: 1, code: 'CourageBadge'},
            {quantity: 2, code: 'Rebates'}
          ]
        });

        done();
      });

      it('action BrowseTicket 3 times give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times', value: 3}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket 3 times within 2 months give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times within 2 months give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'month'}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with tag Patate give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [],
              filters: [
                {type: 'tag', tagClusterCode: null, tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with tag CLUSTER:Patate give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket with tag CLUSTER:Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [],
              filters: [
                {type: 'tag', tagClusterCode: 'CLUSTER', tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with data test = "test value" give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket with data test = 'test value' give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [],
              filters: [
                {operator: '=', type: 'data', attribute: 'test', value: 'test value'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with data number = 3 value" give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket with data number = 3 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [],
              filters: [
                {operator: '=', type: 'data', attribute: 'number', value: 3}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with data number < 3 value" give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket with data number < 3 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [],
              filters: [
                {operator: '<', type: 'data', attribute: 'number', value: 3}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket 3 times with tag Patate give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times', value: 3}
              ],
              filters: [
                {type: 'tag', tagClusterCode: null, tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket 3 times with tag CLUSTER:Patate give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times with tag CLUSTER:Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times', value: 3}
              ],
              filters: [
                {type: 'tag', tagClusterCode: 'CLUSTER', tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with tag Patate 3 times within 2 months give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times within 2 months with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'month'}
              ],
              filters: [
                {type: 'tag', tagClusterCode: null, tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('action BrowseTicket with tag CLUSTER:Patate 3 times within 2 months give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 3 times within 2 months with tag CLUSTER:Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'month'}
              ],
              filters: [
                {type: 'tag', tagClusterCode: 'CLUSTER', tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

    });

    describe('Should parse challenge rules', function () {
      it('challenge ChallengeCode give 1 points', function (done) {

        var rule = parser.parse("challenge ChallengeCode give 1 points");
        should(rule).eql({
          rules: [
            {scope: 'challenge', code: 'ChallengeCode', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('challenge ChallengeCode give 1 points and give 1 CourageBadge', function (done) {

        var rule = parser.parse("challenge ChallengeCode give 1 points give 1 CourageBadge");
        should(rule).eql({
          rules: [
            {scope: 'challenge', code: 'ChallengeCode', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 1, code: 'points'},
            {quantity: 1, code: 'CourageBadge'}
          ]
        });

        done();
      });

      it('challenge ChallengeCode give 100 points give 1 CourageBadge give 2 Rebates', function (done) {

        var rule = parser.parse("challenge ChallengeCode give 100 points give 1 CourageBadge give 2 Rebates");
        should(rule).eql({
          rules: [
            {scope: 'challenge', code: 'ChallengeCode', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 100, code: 'points'},
            {quantity: 1, code: 'CourageBadge'},
            {quantity: 2, code: 'Rebates'}
          ]
        });

        done();
      });

      it('challenge ChallengeCode 3 times give 1 points', function (done) {

        var rule = parser.parse("challenge ChallengeCode 3 times give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'challenge', code: 'ChallengeCode',
              conditions: [
                {type: 'times', value: 3}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('challenge ChallengeCode 3 times within 2 months give 1 points', function (done) {

        var rule = parser.parse("challenge ChallengeCode 3 times within 2 months give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'challenge', code: 'ChallengeCode',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'month'}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      // FIXME (SG) : May not need the tag condition for challenge scope
      it('challenge ChallengeCode with tag Patate give 1 points', function (done) {

        var rule = parser.parse("challenge ChallengeCode with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'challenge', code: 'ChallengeCode',
              conditions: [],
              filters: [
                {type: 'tag', tagClusterCode: null, tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('challenge ChallengeCode with tag CLUSTER:Patate give 1 points', function (done) {

        var rule = parser.parse("challenge ChallengeCode with tag CLUSTER:Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'challenge', code: 'ChallengeCode',
              conditions: [],
              filters: [
                {type: 'tag', tagClusterCode: 'CLUSTER', tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

    });

    describe('Should parse member zone rules', function () {
      it('member in zone CODE1 give 1 point', function (done) {

        var rule = parser.parse("member in zone CODE1 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'member',
            type: 'zone',
            codes: ['CODE1'],
            duration: null,
            timeframe: null
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member in zone CODE1,CODE2 give 1 point', function (done) {

        var rule = parser.parse("member in zone CODE1,CODE2 give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'member',
            type: 'zone',
            codes: ['CODE1', 'CODE2'],
            duration: null,
            timeframe: null
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member in zone CODE1 for 10 minutes give 1 point', function (done) {

        var rule = parser.parse("member in zone CODE1 for 10 minutes give 1 points");
        should(rule).eql({
          rules: [{
            scope: 'member',
            type: 'zone',
            codes: ['CODE1'],
            duration: 10,
            timeframe: 'minute'
          }],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });
    });

    describe('Should parse member rules', function () {
      it('member level LevelListCode 2 give 1 point', function (done) {

        var rule = parser.parse("member level LevelListCode 2 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level', levelCode: 'LevelListCode',
              conditions: [
                {operator: '>=', type: 'level', value: 2}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member level LevelListCode 2 with tag Patate give 1 points', function (done) {

        var rule = parser.parse("member level LevelListCode 2 with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level', levelCode: 'LevelListCode',
              conditions: [
                {operator: '>=', type: 'level', value: 2}
              ],
              filters: [
                {type: 'tag', tagClusterCode: null, tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member level LevelListCode 2 with tag CLUSTER:Patate give 1 points', function (done) {

        var rule = parser.parse("member level LevelListCode 2 with tag CLUSTER:Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level', levelCode: 'LevelListCode',
              conditions: [
                {operator: '>=', type: 'level', value: 2}
              ],
              filters: [
                {type: 'tag', tagClusterCode: 'CLUSTER', tag: 'Patate'}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member point LevelListCode 100 give 1 points', function (done) {

        var rule = parser.parse("member point LevelListCode 100 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'point', levelCode: 'LevelListCode',
              conditions: [
                {operator: '>=', type: 'point', value: 100}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member tag TagCode 20 give 1 points', function (done) {

        var rule = parser.parse("member tag TagCode 20 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'tag', tagClusterCode: null, levelCode: 'TagCode',
              conditions: [
                {operator: '>=', type: 'tag', value: 20}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member tag CLUSTER:TagCode 20 give 1 points', function (done) {

        var rule = parser.parse("member tag CLUSTER:TagCode 20 give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'tag', tagClusterCode: 'CLUSTER', levelCode: 'TagCode',
              conditions: [
                {operator: '>=', type: 'tag', value: 20}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      /** NOT IMPLEMENTED YET IN ENGINE
      it('member level up LevelListCode give 1 points', function (done) {

        var rule = parser.parse("member level up LevelListCode give 1 points");
        should(rule).eql({
          rules: [
            {scope: 'member', type: 'level up', levelCode: 'LevelListCode', conditions: [], filters: []}
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member level up LevelListCode 3 times give 1 points', function (done) {

        var rule = parser.parse("member level up LevelListCode 3 times give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level up', levelCode: 'LevelListCode',
              conditions: [
                {type: 'times', value: 3}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member level up LevelListCode 3 times within 2 days give 1 points', function (done) {

        var rule = parser.parse("member level up LevelListCode 3 times within 2 days give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level up', levelCode: 'LevelListCode',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'day'}
              ],
              filters: []
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });

      it('member level up LevelListCode 3 times within 2 days with tag Patate give 1 points', function (done) {

        var rule = parser.parse("member level up LevelListCode 3 times within 2 days with tag Patate give 1 points");
        should(rule).eql({
          rules: [
            {
              scope: 'member', type: 'level up', levelCode: 'LevelListCode',
              conditions: [
                {type: 'times_within_timeframe', value: 3, duration: 2, durationScope: 'day'}
              ],
              filters: [
                {type: 'tag', tag: 'Patate', value: null}
              ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'}
          ]
        });

        done();
      });
      */
    });

    describe('Should parse complexe action rules', function () {
      it('action BrowseTicket and action CoolThing give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket and action CoolThing give 1 points");
        should(rule).eql(
          {
            rules: [
              {scope: 'action', code: 'BrowseTicket', conditions: [], filters: []},
              {scope: 'action', code: 'CoolThing', conditions: [], filters: []}
            ],
            rewards: [
              {quantity: 1, code: 'points'}
            ]
          });

        done();
      });

      it('action BrowseTicket 5 times and action CoolThing with tag Patate and challenge Boule 8 times and member level LevelCode 5 give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 5 times and action CoolThing with tag Patate and challenge BouleCode 8 times within 6 years and member level LevelCode 5 with tag Cool give 1 points give 8 ballouns");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket', conditions: [
              {type: 'times', value: 5}
            ], filters: []
            },
            {
              scope: 'action', code: 'CoolThing', conditions: [], filters: [
              {type: 'tag', tagClusterCode: null, tag: 'Patate'}
            ]
            },
            {
              scope: 'challenge', code: 'BouleCode', conditions: [
              {type: 'times_within_timeframe', value: 8, duration: 6, durationScope: 'year'}
            ], filters: []
            },
            {
              scope: 'member', type: 'level', levelCode: 'LevelCode', conditions: [
              {operator: '>=', type: 'level', value: 5}
            ], filters: [
              {type: 'tag', tagClusterCode: null, tag: 'Cool'}
            ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'},
            {quantity: 8, code: 'ballouns'}
          ]
        });

        done();
      });

      it('action BrowseTicket 5 times and action CoolThing with tag CLUSTER1:Patate and challenge Boule 8 times and member level LevelCode 5 give 1 points', function (done) {

        var rule = parser.parse("action BrowseTicket 5 times and action CoolThing with tag CLUSTER1:Patate and challenge BouleCode 8 times within 6 years and member level LevelCode 5 with tag CLUSTER2:Cool give 1 points give 8 ballouns");
        should(rule).eql({
          rules: [
            {
              scope: 'action', code: 'BrowseTicket', conditions: [
              {type: 'times', value: 5}
            ], filters: []
            },
            {
              scope: 'action', code: 'CoolThing', conditions: [], filters: [
              {type: 'tag', tagClusterCode: 'CLUSTER1', tag: 'Patate'}
            ]
            },
            {
              scope: 'challenge', code: 'BouleCode', conditions: [
              {type: 'times_within_timeframe', value: 8, duration: 6, durationScope: 'year'}
            ], filters: []
            },
            {
              scope: 'member', type: 'level', levelCode: 'LevelCode', conditions: [
              {operator: '>=', type: 'level', value: 5}
            ], filters: [
              {type: 'tag', tagClusterCode: 'CLUSTER2', tag: 'Cool'}
            ]
            }
          ],
          rewards: [
            {quantity: 1, code: 'points'},
            {quantity: 8, code: 'ballouns'}
          ]
        });

        done();
      });

    });
  });
});
