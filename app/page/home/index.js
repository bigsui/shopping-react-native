/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Styles = require('./style');

var API = require('../../network/api');
var Util = require('../../util/util');
var Global = require('../../util/global');
var Loading = require('../loading');
var Web = require('../web');

//自定义组件
var Slider = require('./slidebanner');
var ADViews = require('./adview');
var BqService = require('./bqservice');
var HotGoods = require('./hotgoods');

//下拉刷新
var {
  RefresherListView,
  LoadingBarIndicator
} = require('react-native-refresher');

var {
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  TouchableHighlight,
} = React;

var home = React.createClass({
  getInitialState: function() {
    return {
      store_id: 8805,
      loaded:false,
      banners:[],
      services:[],
      hotgoods:[],
      advs:[],
    };
  },

  componentDidMount: function() {
    this.getStoreMunu();
  },

  getStoreMunu:function(){
  	var store_id=this.state.store_id;
  	var p9 = "app";
  	var url ="https://api.bqmart.cn/stores/menu.json?store_id=8805&p9=app";
  	fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          banners: responseData.result.banners,
          services: responseData.result.services,
          advs:responseData.result.advs,
          loaded:true,
        });
        this.getRecommendation();
      })
      .done();
  },

  getRecommendation:function(){
    var storeid = this.state.store_id;
    var url = "https://api.bqmart.cn/goods/relatedrecommend.json?store_id=8805&type=seckill&page=1&limit=40";
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          hotgoods:responseData.result,
        });
      }).done();
  },

  renderContent: function() {
    if(!this.state.loaded){
      return (<Text style={Styles.hottitle}> LOADING </Text>);
    }
  	return (
  		<ScrollView style={[Styles.container]}>
            <Slider banners={this.state.banners} navigator={this.props.navigator}/>
            <BqService
                collumnNum={3}
                services = {this.state.services}/>
            <ADViews advs={this.state.advs} navigator={this.props.navigator}/>
            <View style={[Styles.row,Styles.center]}>
                <View style={[Styles.hotLine,Styles.flex1]}/>
                <Text style={Styles.hottitle}> 精品推荐 </Text>
                <View style={[Styles.hotLine,Styles.flex1]}/>
            </View>
            <HotGoods
              collumnNum={2}
              navigator={this.props.navigator}
              hotgoods ={this.state.hotgoods}/>
  		</ScrollView>
  	);
  },

  render: function() {
  	 if(!this.state.loaded){
        return <Loading loadingtext='正在加载首页...'/>
      }
  	return this.renderContent();
  },
});

module.exports = home;
