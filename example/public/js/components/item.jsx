var React = require('react');
var View = require('./View');
var Text = require('./Text');

var Item = React.createClass({

  propTypes: {
    remove: React.PropTypes.func,
    tit: React.PropTypes.string
  },

  render: function() {
    return(
      <View>
        <Text className="item">Title: {this.props.tit}</Text>
        <Text>Price: {this.props.price}</Text>
        <Text className="remove" onClick={this.props.remove}>x</Text>
      </View>
    );
  }
});

module.exports = Item;
