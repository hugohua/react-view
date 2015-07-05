var Content = require('./components/content');
var Column = require('./components/Column')
var unescapeHtml = require('unescape-html');
var React = require('react');

function initApp() {
  var container = document.getElementById('clientContent');
  var list = unescapeHtml(window.__list__);
  list = JSON.parse(list);
  // list = {};
  // reuse server side render result
  var startTime = Date.now();
  React.render(
    <Content list={list}/>,
    container
  );

var totalTime = Date.now() - startTime;
console.log('client side completed in ' + totalTime + 'ms!');
// console.log('Re-rendering on client completed');

  // client side render
//   var clientContent = document.getElementById('clientContent');
  
//   var MockData = [{
//   img : 'http://gtms02.alicdn.com/tps/i2/TB1hbkyHpXXXXboXXXXcy0wIpXX-70-70.png',
//   text : '手机圈儿',
//   link : 'http://3c.m.tmall.com'                      
// },{
//   img : 'http://gtms01.alicdn.com/tps/i1/TB13zsxHpXXXXX8XpXXcy0wIpXX-70-70.png',
//   text : '发现好玩',
//   link : 'http://3c.m.tmall.com'                      
// },{
//   img : 'http://gtms01.alicdn.com/tps/i1/TB1wpUtHpXXXXb1XVXXcy0wIpXX-70-70.png',
//   text : '我爱我家',
//   link : 'http://3c.m.tmall.com'                      
// },{
//   img : 'http://gtms03.alicdn.com/tps/i3/TB14NwyHpXXXXaUXXXXcy0wIpXX-70-70.png',
//   text : '生活圈儿',
//   link : 'http://3c.m.tmall.com'                      
// },{
//   img : 'http://gtms04.alicdn.com/tps/i4/TB1ODktHpXXXXXZXVXXcy0wIpXX-70-70.png',
//   text : '试用中心',
//   link : 'http://3c.m.tmall.com'                      
// }];
	
// 	React.render(
// 		<Column dataSource={MockData} />,
// 		clientContent
// 	)

}

initApp();
