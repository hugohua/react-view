var React = require('react');
var Create = require('./create');
var Item = require('./item');
var View = require('./View');
var Text = require('./Text');
var MockData = require('../../data/mock.js');


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// console.log(MockData,'mock')

var Content = React.createClass({
  propTypes: {
    list: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      list: this.props.list
    };
  },

  componentDidUpdate : function(){
      var totalTime = Date.now() - this.startTime;
      console.log('client side completed in ' + totalTime + 'ms!');
      console.log('Re-rendering on client completed');
  },

  handleRender : function(){
      var newData = shuffle(MockData.data);
      console.log(newData);
      this.startTime = Date.now();
      this.setState({
          list : newData
      })
  },

  render: function() {
    // if (typeof window !== 'undefined') {
       
    //     console.log(window)
    // }
    return (
      <View>
        <View><button type="button" onClick={this.handleRender}>Render</button></View>
        <View>
          {this.state.list.map((item, index) => {
            return (
              <View>
              <Item tit={item.tit} price={item.price} key={index} remove={this.remove.bind(this, index)} />
              </View>
            );
          })}
        </View>
        <Create add={this.add} />
      </View>
    );
  },

  add: function (content) {
    alert(content);

    this.setState({
      list: this.state.list.concat(content)
    });
  },

  remove: function (index) {
    console.log(index, this.state.list)
    // window.location.href = "http://3c.tmall.com"
    this.state.list.splice(index, 1);
    this.setState({
      list: this.state.list
    });
  }
});

module.exports = Content;
