/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./app/page/login');
var Home = require('./app/page/home/index');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var bqseller = React.createClass({
  render: function() {
    return (
      <View>
        <View style={[styles.actionBar,styles.row]}>
          <Text style={[styles.title]}>
            送至吉晟别墅1-01
          </Text>
        </View>
        //<Home/>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#EE7700',
  },
  row:{
    flexDirection:'row',
  },
  title:{
    color: '#ffffff',
  },
  actionBar: {
    height:49,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#6bb967',
  }
});

AppRegistry.registerComponent('bqseller', () => bqseller);
