/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Text
 */
var React = require('react');
// var Mixin = require('../Mixin/index');

var Text = React.createClass({

    // mixins: [Mixin],

    //用于对属性值的数据类型校验
    //propTypes: {
    //    numberOfLines: React.PropTypes.number,
    //    suppressHighlighting: React.PropTypes.bool
    //},

    //组件默认值
    getDefaultProps(){
        return {
            style : {},
            tag : 'div',
            numberOfLines : 0,
            suppressHighlighting : false
        }
    },

    //组件加载前调用
    componentWillMount(){
        //如果是多行截断的话则使用css3来实现
        if(this.props.numberOfLines){
            this.props.style['overflow'] = 'hidden';
            this.props.style['display'] = '-webkit-box';
            this.props.style['WebkitLineClamp'] = this.props.numberOfLines;
            this.props.style['WebkitBoxOrient'] = 'vertical';
        }

    },

    render(){

        var props = this.props;

        // var newComponentProps = Mixin.cloneProps(props,this.handlers);

        return React.createElement(props.tag, props, props.children);

    }
});

module.exports = Text;