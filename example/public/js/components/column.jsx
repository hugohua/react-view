var React = require('react');

var styles = {
	item : {
		posotion : 'relative'
	}
}

// 3c 一排三
var Column = React.createClass({

	renderItems : function(data){
		return data.map(function(item,i){
          return (
              <li key={i}>
              	<img src={item.img} />
                <span>{item.text}</span>
              </li>
          )
      })
	},

	

	render : function(){
		return (
			<div style={styles.item}>
				<div>client side render ....</div>
				<ul>
					{this.renderItems(this.props.dataSource)}
				</ul>
			</div>
		)
	}

})


module.exports = Column;
