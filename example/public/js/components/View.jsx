/**
 * Copyright (c) 2015-present, Alibaba Group Holding Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule View
 */
var React = require('react');
// var Mixin = require('../Mixin/index');

var CSS_PROPERTY_POINTER_EVENT = 'pointerEvents';
var PropTypes = React.PropTypes;

var View = React.createClass({

    //propTypes: {
    //    /**
    //     * When true, indicates that the view is an accessibility element. By default,
    //     * all the touchable elements are accessible.
    //     */
    //    accessible: PropTypes.bool,
    //
    //    /**
    //     * Overrides the text that's read by the screen reader when the user interacts
    //     * with the element. By default, the label is constructed by traversing all the
    //     * children and accumulating all the Text nodes separated by space.
    //     */
    //    accessibilityLabel: PropTypes.string,
    //
    //
    //    /**
    //     * For most touch interactions, you'll simply want to wrap your component in
    //     * `TouchableHighlight` or `TouchableOpacity`. Check out `Touchable.js`,
    //     * `ScrollResponder.js` and `ResponderEventPlugin.js` for more discussion.
    //     */
    //    onMoveShouldSetResponder: PropTypes.func,
    //    onResponderGrant: PropTypes.func,
    //    onResponderMove: PropTypes.func,
    //    onResponderReject: PropTypes.func,
    //    onResponderRelease: PropTypes.func,
    //    onResponderTerminate: PropTypes.func,
    //    onResponderTerminationRequest: PropTypes.func,
    //    onStartShouldSetResponder: PropTypes.func,
    //    onStartShouldSetResponderCapture: PropTypes.func,
    //
    //    /**
    //     * Invoked on mount and layout changes with {x, y, width, height}.
    //     */
    //    onLayout: PropTypes.func,
    //
    //    /**
    //     * In the absence of `auto` property, `none` is much like `CSS`'s `none`
    //     * value. `box-none` is as if you had applied the `CSS` class:
    //     *
    //     * ```
    //     * .box-none {
    //     *   pointer-events: none;
    //     * }
    //     * .box-none * {
    //     *   pointer-events: all;
    //     * }
    //     * ```
    //     *
    //     * `box-only` is the equivalent of
    //     *
    //     * ```
    //     * .box-only {
    //     *   pointer-events: all;
    //     * }
    //     * .box-only * {
    //     *   pointer-events: none;
    //     * }
    //     * ```
    //     *
    //     * But since `pointerEvents` does not affect layout/appearance, and we are
    //     * already deviating from the spec by adding additional modes, we opt to not
    //     * include `pointerEvents` on `style`. On some platforms, we would need to
    //     * implement it as a `className` anyways. Using `style` or not is an
    //     * implementation detail of the platform.
    //     */
    //    pointerEvents: PropTypes.oneOf([
    //        'box-none',
    //        'none',
    //        'box-only',
    //        'auto'
    //    ]),
    //
    //
    //    /**
    //     * This is a special performance property exposed by RCTView and is useful
    //     * for scrolling content when there are many subviews, most of which are
    //     * offscreen. For this property to be effective, it must be applied to a
    //     * view that contains many subviews that extend outside its bound. The
    //     * subviews must also have overflow: hidden, as should the containing view
    //     * (or one of its superviews).
    //     */
    //    removeClippedSubviews: PropTypes.bool,
    //
    //    /**
    //     * Whether this view should render itself (and all of its children) into a
    //     * single hardware texture on the GPU.
    //     *
    //     * On Android, this is useful for animations and interactions that only
    //     * modify opacity, rotation, translation, and/or scale: in those cases, the
    //     * view doesn't have to be redrawn and display lists don't need to be
    //     * re-executed. The texture can just be re-used and re-composited with
    //     * different parameters. The downside is that this can use up limited video
    //     * memory, so this prop should be set back to false at the end of the
    //     * interaction/animation.
    //     */
    //    renderToHardwareTextureAndroid: PropTypes.bool
    //},

    // mixins: [Mixin],

    //组件默认值
    getDefaultProps : function(){
        return {
            style : {},
            pointerEvents : 'auto',
            tag : 'div',
            //accessible: true,
            //accessibilityLabel: undefined,
            renderToHardwareTextureAndroid: false
        }
    },


    //在初始化渲染执行之前立刻调用
    componentWillMount : function(){
        this._pointerEvents();
        // this._hardware();
    },

    _pointerEvents: function(){
        var pointerEvents = this.props.pointerEvents;
        if(pointerEvents === 'none'){
            this.props.style[CSS_PROPERTY_POINTER_EVENT] = 'none';
        }else if(pointerEvents === 'box-none'){
            this.props.style[CSS_PROPERTY_POINTER_EVENT] = 'none';
        }else if(pointerEvents === 'box-only'){
            this.props.style[CSS_PROPERTY_POINTER_EVENT] = 'all';
        }else{
            this.props.style[CSS_PROPERTY_POINTER_EVENT] = undefined;
        }
    },

    _hardware: function(){
        var style = function(){
            var style = ['transform', '-webkit-transform', '-moz-transform'].filter(function(item){
                return item in document.body.style;
            });
            return style.length ? style[0] : 'transform';
        }();
        if(this.props.renderToHardwareTextureAndroid === true){
            this.props.style[style] = 'translateZ(0)';
        }else{
            this.props.style[style] = undefined;
        }
    },

    //componentWillMount下children还没有mount，无法直接修改children的props
    render : function(){
        var pointerEvents = this.props.pointerEvents;
        var children = React.Children.map(this.props.children, function(item) {

            if (!item) {
                return;
            }

            if(pointerEvents === 'box-none'){
                item.props.style[CSS_PROPERTY_POINTER_EVENT] ='all';
            }else if(pointerEvents === 'box-only'){
                item.props.style[CSS_PROPERTY_POINTER_EVENT] ='none';
            }

            return React.cloneElement(item);
        });

        var props = this.props;

        // var newComponentProps = Mixin.cloneProps(props,this.handlers);

        return React.createElement(props.tag, props, children);
    }
});

module.exports = View;