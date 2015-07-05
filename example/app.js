/*!
 * koa-react-view - example/app.js
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */

var staticCache = require('koa-static-cache');
var react = require('..');
var path = require('path');
var koa = require('koa');
var MockData = require('./public/data/mock.js');

var app = koa();

var viewpath = path.join(__dirname, 'views');
var assetspath = path.join(__dirname, 'public');

react(app, {
  views: viewpath,
  babel: {
    only: [
      viewpath,
      assetspath
    ]
  }
});

app.use(staticCache(assetspath));

// console.log(MockData)

app.use(function* () {
  this.render('index', {
    title: 'List',
    list: MockData.data
  });
});

app.listen(3000);
console.log('server start listen at 3000');
