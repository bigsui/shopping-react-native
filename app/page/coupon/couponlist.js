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
    this._getCouponList();
  },

  _getCouponList:function(){
    var thiz = this;
    var thizDataSource = thiz.state.dataSource;
    Util.post(API.COUPONLIST,Global.user,
      function (ret){
        if(ret.code==0&&ret.data.length>0){
          thiz.setState({
              dataSource: thizDataSource.cloneWithRows(ret.data),
              loaded:true,
          });
        }else{
          alert("暂无红包");
          thiz.setState({loaded:true,});
        }
      });
  },

  _renderListItem:function(rowData){
    return (
      <View style={{padding:15,backgroundColor:'white',marginBottom:10}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'#424242'}}>text1</Text>
          <Text style={{color:'#424242',marginLeft:20,}}>text2</Text>
        </View>
      </View>
      );
  },

  render: function() {
    if(!this.state.loaded){
        return <Loading loadingtext='正在加载红包列表数据...'/>
    };
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
  },
});

module.exports = Market;