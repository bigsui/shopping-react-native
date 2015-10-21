/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:40:24
 * @version $Id$
 */
'use strict';
var React = require('react-native');
var Util = require('../util/util');
var Global = require('../util/global');
var API = require('../network/api');
var Loading = require('./loading');

var {
  	StyleSheet,
  	View,
    Text,
    Image,
    ListView,
} = React;

var ShoppingCart = React.createClass({
  getInitialState: function() {
    return {
      cartList:{
        dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
        loaded:false,
      },
    };
  },

  componentDidMount: function() {
    this._fetchData();
  },

  _fetchData:function(){
    var thiz = this;
    var thizDataSource = thiz.state.cartList.dataSource;
    Util.post(API.CARTLIST,Global.user,
      function (ret){
        if(ret.code==0&&ret.data.length>0){
          thiz.setState({
            cartList:{
              dataSource: thizDataSource.cloneWithRows(ret.data),
              loaded:true,
            },
          });
        }
      });
  },
   _renderCartList:function(rowData, sectionID, rowID){
    var products = rowData.products;
    var procuctsView = [];
    for(var i = 0; i < products.length; i++){
      var item = products[i];
      procuctsView.push(
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.default_image }} />
            <View style={{flex:1}}>
              <Text style={{flex:1}}>{item.goods_name}</Text>
              <View style={{flexDirection:'row',alignItems:'flex-end',}}>
                <Text style={{color:'#f28006',flex:1}}>{item.shichang}</Text>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                  <Image style={{height:25,width:25}} source={require("image!ic_goods_add")}/>
                  <Text style={{color:'#f28006',paddingLeft:10,paddingRight:10}}>{item.quantity}</Text>
                  <Image style={{height:25,width:25}} source={require("image!ic_goods_reduce")}/>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.line}/>
        </View>
        );
    };
    return(
      <View style={{marginBottom:15,backgroundColor:'#ffffff',}}>
        <View style={styles.line}/>
        <View style={{justifyContent:'center',height:45,paddingLeft:15}}>
          <Text style={{color:'#333333'}}>{rowData.store.title}</Text>
        </View>
         <View style={styles.line}/>
         {procuctsView}
      </View>
      );
  },

  render: function() {
    if(!this.state.cartList.loaded){
        return <Loading loadingtext='正在购物车数据...'/>
    };
    
    return (
      <View style={styles.container}>
        <ListView
          style={{}}
          dataSource={this.state.cartList.dataSource}
          renderRow={this._renderCartList}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#eef0f3',
    paddingBottom:68,
  },
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height:90,
    justifyContent: 'center',
  },
  line:{
    backgroundColor:'#eef0f3',
    height:1,
  },
});

module.exports = ShoppingCart;