/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./app/page/login');
var Home = require('./app/page/home');
var Market = require('./app/page/market');
var ShoppingCart = require('./app/page/shoppingcart');
var Me = require('./app/page/me');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

// StatusBarIOS.setStyle('light-content');

var bqseller = React.createClass({
  getInitialState: function() {
    return{
      selectedTab:'home',
      logined:false,
      showIndex: {
        height:0,
        opacity:0
      },
    };
  },

  _selectTab: function(tabName){
    this.setState({
      selectedTab:tabName,
    });
  },

   _addNavigator: function(component, title){
    var data = null;
    return <NavigatorIOS
      style={{flex:1}}
      barTintColor='#6bb967'
      titleTextColor="#fff"
      tintColor="#fff"
      translucent={false}
      initialRoute={{
          component: component,
          title: title,
          passProps:{
            data: data
          }
        }} />;
  },

  _renderLogin:function(){
    return (
        <Login/>
      );
  },

  render: function() {
    return (
          <TabBarIOS >
            <TabBarIOS.Item
              title="首页"
              icon={require("image!icon_bottomtag_home_n")}
              selected={this.state.selectedTab ==='home'}
              onPress={this._selectTab.bind(this,'home')}
              >
              {this._addNavigator(Home,'首页')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              title="闪送超市"
              icon={require("image!icon_bottomtag_market_n")}
              selected={this.state.selectedTab ==='market'}
              onPress={this._selectTab.bind(this,'market')}
              >
              {this._addNavigator(Market,'闪送超市')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              title="购物车"
              icon={require("image!icon_bottomtag_cart_n")}
              selected={this.state.selectedTab ==='shoppingcart'}
              onPress={this._selectTab.bind(this,'shoppingcart')}
              >
              {this._addNavigator(ShoppingCart,'购物车')}
            </TabBarIOS.Item>

            <TabBarIOS.Item
              title="个人中心"
              icon={require("image!icon_bottomtag_me_n")}
              selected={this.state.selectedTab ==='me'}
              onPress={this._selectTab.bind(this,'me')}
              >
              {this._addNavigator(Me,'个人中心')}
            </TabBarIOS.Item>

          </TabBarIOS>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
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
