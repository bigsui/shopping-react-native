/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Login = require('./login');
var Home = require('./home/index');
var Market = require('./market/index');
var ShoppingCart = require('./shoppingcart');
var Me = require('./me');
var Search = require('./search/search');
var Scan = require('./search/search');
var {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS,
} = React;

// StatusBarIOS.setStyle('light-content');

var index = React.createClass({
  getInitialState: function() {
    return{
      selectedTab:'home',
      lastTab:'home',
      store_id:8805,
      showIndex: {
        height:0,
        opacity:0
      },
    };
  },

  _selectTab: function(newTabName){
    var currentTab = this.state.selectedTab;
    if(currentTab!=newTabName){
      this.setState({
        lastTab:currentTab,
      });
    }
    this.setState({
      selectedTab:newTabName,
    });
  },
  
  _search: function () {
    this._selectTab('search');
  },

  _scan: function () {
    this._selectTab('scan');
  },

  _addNavigator: function(component, title){
    var data = null;
    if(this.state.selectedTab ==='home'||this.state.selectedTab==='market'){
      return <NavigatorIOS
          style={{flex:1}}
          barTintColor='#6bb967'
          titleTextColor="#fff"
          tintColor="#fff"
          translucent={false}
          initialRoute={
          {
            component: component,
            title: title,
            rightButtonTitle:"搜索",
            onRightButtonPress: () => this._search(),
            leftButtonTitle:"扫一扫",
            onLeftButtonPress:() => this._scan(),
            passProps:{
              data: data
           }
        }} />;
    }

    return <NavigatorIOS
      style={{flex:1}}
      barTintColor='#6bb967'
      titleTextColor="#fff"
      tintColor="#fff"
      translucent={false}
      initialRoute={{
          component: component,
          title: title,
          rightButtonTitle:"",
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

  _renderNewTab: function (component, title) {

    var lastTab = this.state.lastTab;

    return <NavigatorIOS
        style={{flex:1}}
        barTintColor='#6bb967'
        titleTextColor="#fff"
        tintColor="#fff"
        translucent={false}
        initialRoute={
          {
            component: component,
            title: title,
            onLeftButtonPress: () => this._selectTab(lastTab),
            leftButtonTitle:"返回",
            passProps:{
              data: this.state.store_id
           }
        }} />;
  },

  render: function() {

    if(this.state.selectedTab ==='search'){
      return this._renderNewTab(Search,'搜索');
    }else if(this.state.selectedTab ==='scan'){
      return this._renderNewTab(Scan,'扫一扫');
    }

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
              badge="4"
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


module.exports = index;

