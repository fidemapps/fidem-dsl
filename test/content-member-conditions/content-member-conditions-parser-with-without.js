'use strict';

var should = require('should'),
	helper = require('../helper');

var parser;

describe('<Unit Test>', function () {
    describe('Content Member Conditions with/without:', function () {

	    before(function (done) {
		    return helper.contentParser().then(function(newParser){
			    parser = newParser;
			    done()
		    });
	    });

        describe('Should parse member with/without conditions',function(){

            describe('tag',function(){


                it('member with tag bob:boby',function(){
                    var condition = parser.parse('member with tag bob:boby');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'boby' },operator:'>',value:0 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob:bob = 3',function(){
                    var condition = parser.parse('member with tag bob:bob =3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'bob' }, operator:'=',value:3 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob:bob = 3.5',function(){
                    var condition = parser.parse('member with tag bob:bob =3.5');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'bob' }, operator:'=',value:3.5 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob:bob = 3.3%',function(){
                    var condition = parser.parse('member with tag bob:bob = 3.3 %');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'bob' },relative:true, operator:'=',value:3.3,relativeScope:'member' },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob:bob = 40%',function(){
                    var condition = parser.parse('member with tag bob:bob = 40 %');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'bob' },relative:true, operator:'=',value:40 ,relativeScope:'member'},
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag bob:bob = 100%',function(){
                    var condition = parser.parse('member with tag bob:bob = 100 %');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag',tagCode: { tagClusterCode: 'bob', tagCode: 'bob' },relative:true, operator:'=',value:100 ,relativeScope:'member'},
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });


                it('member without tag bob',function(){
                    var condition = parser.parse('member without tag bob:bob ');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag', tagCode: { tagClusterCode: 'bob', tagCode: 'bob' },operator:'>',value:0 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without tag bob:bob > 3',function(){
                    var condition = parser.parse('member without tag bob:bob > 3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tag', tagCode: { tagClusterCode: 'bob', tagCode: 'bob' },operator:'>',value:3 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

            });

            describe('tag cluster',function(){

                it('member with tag cluster bob',function(){
                    var condition = parser.parse('member with tag cluster bob');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tagCluster', tagClusterCode:'bob',operator:'>',value:0 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag cluster bob = 3',function(){
                    var condition = parser.parse('member with tag cluster bob =3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tagCluster',tagClusterCode: 'bob' , operator:'=',value:3 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with tag cluster bob = 3.5',function(){
                    var condition = parser.parse('member with tag cluster bob =3.5');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tagCluster',tagClusterCode:  'bob' , operator:'=',value:3.5 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without tag cluster bob',function(){
                    var condition = parser.parse('member without tag cluster bob ');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tagCluster',  tagClusterCode:  'bob' ,operator:'>',value:0 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without tag cluster bob > 3',function(){
                    var condition = parser.parse('member without tag cluster bob > 3');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'tagCluster', tagClusterCode:  'bob' ,operator:'>',value:3 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

            });

            describe('points',function(){

                it('member with points levelCode',function(){
                    var condition = parser.parse('member with points levelCode');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'points',levelCode: 'levelCode',operator:'>',value:0 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without points levelCode',function(){
                    var condition = parser.parse('member without points levelCode');
                    should(condition).eql({
                        conditions: [
                            {
                                negative:true,
                                query: { type:'points',levelCode: 'levelCode',operator:'>',value:0 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

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

                it('member without points levelCode < 10',function(){
                    var condition = parser.parse('member without points levelCode < 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'points',levelCode: 'levelCode', operator:'<',value:10 },
                                negative:true,
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

            describe('level',function(){

                it('member with level levelCode',function(){
                    var condition = parser.parse('member with level levelCode');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { operator: '>', type: 'level', value: 0,levelCode: 'levelCode' },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without level levelCode',function(){
                    var condition = parser.parse('member without level levelCode');
                    should(condition).eql({
                        conditions: [
                            {
                                negative:true,
                                query: {operator: '>', type: 'level', value: 0,levelCode: 'levelCode' },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member with level levelCode < 10',function(){
                    var condition = parser.parse('member with level levelCode < 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'level',levelCode: 'levelCode', operator:'<',value:10 },
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without level levelCode < 10',function(){
                    var condition = parser.parse('member without level levelCode < 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'level',levelCode: 'levelCode', operator:'<',value:10 },
                                negative:true,
                                scope: 'member',
                                type: 'with'
                            }
                        ]
                    });
                });

                it('member without level levelCode <= 10',function(){
                    var condition = parser.parse('member without level levelCode <= 10');
                    should(condition).eql({
                        conditions: [
                            {
                                query: { type:'level',levelCode: 'levelCode', operator:'<=',value:10 },
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
