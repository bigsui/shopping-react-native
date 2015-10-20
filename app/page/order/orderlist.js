/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:38:47
 * @version $Id$
 */
'use strict';
var React = require('react-native');
var Global = require('../../util/global');
var API = require('../../network/api');
var Util = require('../../util/util');
var Loading = require('../loading');

var {
  	StyleSheet,
  	View,
    Text,
    Image,
    ListView,
} = React;

var Market = React.createClass({
  getInitialState: function() {
    return {
      dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
      loaded:false,
    };
  },

  componentDidMount: function() {
    this._getOrderList(1);
  },

  _getOrderList:function(pageIndex){
    var params = Global.user;
    params.page=pageIndex;
    params.limit=30;
    var thiz = this;
    Util.post(API.ORDERLIST,Global.user,
      function (ret){
        if(ret.code==0&&ret.data.length>0){
          thiz.setState({
              dataSource: thiz.state.dataSource.cloneWithRows(ret.data),
              loaded:true,
          });
        }
      });
  },

  _renderListItem:function(rowData){
    var imageViews = [];
    var goods = rowData.orders_goods;
    if(goods){
      for (var i = 0; i < goods.length&&i<3; i++) {
        imageViews.push(<Image style={[styles.thumb]} source={{uri:goods[i].goods_image}} />);
      };
    }
    return (
      <View style={{backgroundColor:'white',marginBottom:10,}}>
        <View style={[styles.row,{padding:10,}]}>
          <View style={{flex:1}}>
            <Text style={{color:'#585c64'}}>{rowData.title}</Text>
            <View style={[styles.row]}>
              <Text style={{fontSize:12,color:'#929aa2'}}>订单号:</Text>
              <Text style={{fontSize:12,color:'#929aa2',marginLeft:5}}>{rowData.order_sn}</Text>
            </View>
          </View>
          <Text>查看订单</Text>
        </View>
        <View style={styles.line}/>
        <View style={[styles.row,{padding:10}]}>
          {imageViews}
        </View>
        <View style={styles.line}/>
        <View style={[styles.row,{height:40,alignItems:'center',paddingLeft:10}]}>
          <Text style={{fontSize:14,color:'#929aa2'}}>实付款:</Text>
          <Text style={{fontSize:14,color:'#ee7700',marginLeft:5}}>{rowData.order_amount}</Text>
        </View>
      </View>
      );
  },

  render: function() {
    if(!this.state.loaded){
      return <Loading loadingtext='正在加载订单列表...'/>
    }
    return (
      <View style={styles.container}>
         <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderListItem}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f3',
  },
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  line:{
    height:1,
    backgroundColor: '#eef0f3',
  },
  row: {
    flexDirection: 'row',
  },
});

module.exports = Market;