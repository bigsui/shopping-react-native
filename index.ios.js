/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./app/page/login');
var Index = require('./app/page/index');
var store = require('react-native-simple-store');

var {
  AppRegistry,
} = React;

// StatusBarIOS.setStyle('light-content');

var app = React.createClass({
  getInitialState: function() {
    return{
      logined:false,
    };
  },

  _renderLogin:function(){
    return (
        <Login loginResult={(userData)=>this._loginSucc(userData)}/>
      );
  },

  _loginSucc:function(userData){
    store.save('user', userData);
    this.setState({
      logined:true,
    });
  },

  _renderIndex:function(){
    return (
        <Index/>
      );
  },

  render: function() {
    if(this.state.logined){
        return this._renderIndex();
    }else{
        return this._renderLogin();
    }
  },

});

AppRegistry.registerComponent('bqseller', () => app);
