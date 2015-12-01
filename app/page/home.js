/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var API = require('../network/api');
var Util = require('../util/util');
var Swiper = require('react-native-swiper');
var ItemBlock = require('./serviceitem');
var Global = require('../util/global');
var Loading = require('./loading');
var Web = require('./web');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ListView,
  TouchableHighlight,
} = React;

//参数的传递使用props
var Slider = React.createClass({

    _loadWeb:function(title,loadurl){
      this.props.navigator.push({
        title: title,
        component: Web,
        passProps:{
          url: loadurl,
        }
      });
    },

  	render: function(){
      var thiz = this;
	    return (
		    <Swiper style={styles.wrapper} showsButtons={false} autoplay={true} height={125} showsPagination={false}>
			        {this.props.banners.map(function(banner){
			        	return (
                  <TouchableHighlight onPress={()=>thiz._loadWeb(banner.title,banner.url)}>
                    <Image style={[styles.slide,]} source={{uri: banner.image_path}}></Image>
                  </TouchableHighlight>
                  );
			        })}
	      </Swiper>
	    );
  	}
});

var Adviews = React.createClass({
  _loadWeb:function(title,loadurl){
      this.props.navigator.push({
        title: title,
        component: Web,
        passProps:{
          url: loadurl,
        }
      });
    },

    render: function() {
    var advViews = [];
    var advs = this.props.advs;
    for(var i = 0; i < advs.length; i++){
     var ad = advs[i];
      advViews.push(
        <TouchableHighlight onPress={()=>this._loadWeb(ad.title,ad.url)}>
          <View>
            <View style={{height:10,backgroundColor:'#eef0f3'}} />
            <Image style={[styles.adv]} source={{uri:advs[i].image_path}} />
          </View>
        </TouchableHighlight>
      );
    };
      return (
        <View >
          {advViews}
        </View>
      );
    }
});

var home = React.createClass({
  getInitialState: function() {
	var width = Math.floor(Util.size.width/3);
    return {
      store_id: 8805,
      loaded:false,
      banners:[],
      services:[],
      advs:[],
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      item_width:width,
    };
  },

  componentDidMount: function() {
    this.getStoreMunu();
  },

  getStoreMunu:function(){
  	var store_id=this.state.store_id;
  	var p9 = "app";
  	var url ="http://test.api.bqmart.cn/stores/menu.json?store_id=8805&p9=app";
  	fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          banners: responseData.result.banners,
          services: responseData.result.services,
          advs:responseData.result.advs,
          loaded:true,
        });
      })
      .done()
  },

  renderContent: function() {
  	var service1 = [];
    var service2 = [];
    var services = this.state.services;
    //可以使用flex 布局
	  for(var i = 0; i < 3; i++){
      service1.push(
        <ItemBlock  key = {i} width={this.state.item_width} service={services[i]}/>
      );
    };

    for(var i = 3; i < services.length; i++){
      service2.push(
        <ItemBlock  key = {i} width={this.state.item_width} service={services[i]}/>
      );
    };

  	return (
  		<ScrollView style={[styles.container]}>
        	<Slider banners={this.state.banners} navigator={this.props.navigator}/>
        	<View style={styles.itemRow}>
         	  {service1}
        	</View>
          <View style={styles.itemRow}>
            {service2}
          </View>
          <Adviews advs={this.state.advs} navigator={this.props.navigator}/>
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

var styles = StyleSheet.create({
  container: {
    flex:1,
    paddingBottom:68,
  },
  //slider
  wrapper: {
    height:125,
  },
  slide: {
    height:125,
    resizeMode: Image.resizeMode.stretch,
  },
  adv: {
    height:175,
    resizeMode: Image.resizeMode.stretch,
  },
  container_bqservice:{
    padding:10,
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
  },
   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemRow:{
    flexDirection:'row',
    marginBottom:2,
  },
  
});

module.exports = home;
