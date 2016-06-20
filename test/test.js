'use strict';
const assert = require('assert');
const WeChat = require('../');

var api = new WeChat({
  appId     : 'wxfb9dc00461bcef17',
  appSecret : '21f48e4c7c68683b681ca81ba60d3190'
});

describe('wechat api', function() {
  
  var openId = 'ozwcHuC792LGHpQ0dYFlYoA2Uh_c';

  it('get ticket ', function(done) {
    api.ticket().then(function(ticket){
      assert.ifError(ticket.errcode, ticket.errmsg);
      done();
    });
  });
  
  it('get callback ip', function(done) {
    api.callback_ip().then(function(res){
      assert.ok(res.ip_list)
      assert.ifError(res.errcode, res.errmsg);
      done()
    });
  });
  
  it('get user', function(done) {
    api.user(openId).then(function(user){
      // console.log(user);
      assert.ok(user.openid);
      assert.ifError(user.errcode, user.errmsg);
      done();
    });
  });
  
  it('set user remark', function(done) {
    api.user_remark(openId, 'remark').then(function(res){
      // console.log(res);
      assert.ifError(res.errcode, res.errmsg);
      done();
    });
  });
  
  it('list users', function(done) {
    api.users().then(function(res){
      // console.log(res);
      assert.ok(res.total);
      assert.ok(res.count);
      assert.ok(res.data);
      assert.ok(res.next_openid);
      done()
    });
  });
  
  it('fetch user info', function(done) {
    api.users_info([ openId ]).then(function(res){
      assert.equal(res.user_info_list.length, 1);
      done();
    });
  });
  
  it('send template message', function(done) {
    var templateId = 'zVwzW_Sm7Ln8mrf2a74-3XgWbDMPYbXVcjEbf-aA75o';
    var data = {
      name: 'Lsong',
      content: 'test'
    };
  
    api.template_send(templateId, data, 'https://lsong.org', openId).then(function(res){
      assert.ifError(res.errcode, res.errmsg);
      assert.ok(res.msgid)
      done();
    });
  });
  
  // it('send custom message', function(done) {
  //   api.custom_send(openId, 'text', { content: 'test' }).then(function(res){
  //     // console.log(res);
  //     assert.ifError(res.errcode, res.errmsg);
  //     done();
  //   });
  // });
  
  it('menu list', function(done) {
    api.menu_list().then(function(res){
      // console.log(res);
      assert.ok(res.is_menu_open);
      assert.ifError(res.errcode, res.errmsg);
      done();
    });
  });
  //
  // it('auth refresh token', function(done) {
  //   api.auth_refresh().then(function(res){
  //     console.log(res);
  //   });
  // });
});
