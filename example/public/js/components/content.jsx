var Create = require('./create');
var Item = require('./item');
var React = require('react');

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
      this.startTime = Date.now();
      this.setState({
          list : ['ddd','ccc']
      })
  },

  render: function() {
    // if (typeof window !== 'undefined') {
       
    //     console.log(window)
    // }
    return (
      <div>
        <div><button type="button" onClick={this.handleRender}>Render</button></div>
        <ul>
          {this.state.list.map((content, index) => {
            return <Item content={content} key={index} remove={this.remove.bind(this, index)} />;
          })}
        </ul>
        <Create add={this.add} />
      </div>
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
