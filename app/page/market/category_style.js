/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:38:47
 * @version $Id$
 */
'use strict';
var React = require('react-native');

var {
  	View,
    Text,
    ListView,
    StyleSheet,
    TouchableHighlight,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eef0f3',
  },
  category:{
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
  },
  category_bg_select:{
    backgroundColor:'#d7ead6',
  },
  category_bg_normal:{
    backgroundColor:'#ffffff',
  },
  line:{
    backgroundColor:'#eef0f3',
    height:1,
  },
});

module.exports = styles;