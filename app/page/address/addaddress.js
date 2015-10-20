/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-19 17:15:39
 * @version $Id$
 */
'use strict';
var React = require('react-native');

var {
  	StyleSheet,
  	View,
  	Text,
} = React;

var AddAddress = React.createClass({
  getInitialState: function() {
    return {
    };
  },

  componentDidMount: function() {
  },

  render: function() {
    return (
      <Text >
      	添加地址
      </Text>
      
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

module.exports = AddAddress;