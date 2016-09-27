'use strict';

var should = require('should'),
  fs = require('fs'),
  PEG = require('pegjs');

var parser;

describe('<Unit Test>', function () {
  describe('Reaction Actions Parser:', function () {
    before(function (done) {
      fs.readFile(__dirname + '/../../dsl/reaction-actions-parser.pegjs', 'utf8', function (err, data) {
        if (err) {
          return done(err);
        }
        parser = PEG.buildParser(data);
        done();
      });
    });

    describe('Should parse reaction actions', function () {
      it('give reward 100 POINTS from program PRG1 to list LIST2', function (done) {

        var rule = parser.parse("give reward 100 POINTS from program PRG1 to list LIST2");
        should(rule).eql({
          action: 'giveReward',
          rewardCode: 'POINTS',
          quantity: 100,
          programCode: 'PRG1',
          listCode: 'LIST2'
        });
        done();
      });

      it('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to list LIST2', function (done) {

        var rule = parser.parse('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to list LIST2');
        should(rule).eql({
          action: 'sendTextMessage',
          messageText: 'A MESSAGE TEXT',
          messageSubject: 'A MESSAGE SUBJECT',
          listCode: 'LIST2'
        });
        done();
      });

      it('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to emails email1@host.com', function (done) {

        var rule = parser.parse('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to emails email1@host.com');
        should(rule).eql({
          action: 'sendTextMessage',
          messageText: 'A MESSAGE TEXT',
          messageSubject: 'A MESSAGE SUBJECT',
          emails: ['email1@host.com']
        });
        done();
      });

      it('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to emails email1@host.com,email2@host.com, email3@host.com', function (done) {

        var rule = parser.parse('send message text "A MESSAGE TEXT" with subject "A MESSAGE SUBJECT" to emails email1@host.com,email2@host.com, email3@host.com');
        should(rule).eql({
          action: 'sendTextMessage',
          messageText: 'A MESSAGE TEXT',
          messageSubject: 'A MESSAGE SUBJECT',
          emails: ['email1@host.com', 'email2@host.com', 'email3@host.com']
        });
        done();
      });

      it('send message template TMPL_A to list LIST2', function (done) {

        var rule = parser.parse('send message template TMPL_A to list LIST2');
        should(rule).eql({
          action: 'sendTemplateMessage',
          templateMessageCode: 'TMPL_A',
          listCode: 'LIST2'
        });
        done();
      });

      it('send message template TMPL_A to emails email1@host.com', function (done) {

        var rule = parser.parse('send message template TMPL_A to emails email1@host.com');
        should(rule).eql({
          action: 'sendTemplateMessage',
          templateMessageCode: 'TMPL_A',
          emails: ['email1@host.com']
        });
        done();
      });

      it('send message template TMPL_A to emails email1@host.com,email2@host.com, email3@host.com', function (done) {

        var rule = parser.parse('send message template TMPL_A to emails email1@host.com,email2@host.com, email3@host.com');
        should(rule).eql({
          action: 'sendTemplateMessage',
          templateMessageCode: 'TMPL_A',
          emails: ['email1@host.com', 'email2@host.com', 'email3@host.com']
        });
        done();
      });
    });
  });
});
