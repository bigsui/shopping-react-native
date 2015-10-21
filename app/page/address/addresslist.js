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
var AddAddress = require('./addaddress');
var Loading = require('../loading');

var {
  	StyleSheet,
  	View,
    Text,
    ListView,
    TouchableHighlight,
} = React;

var Market = React.createClass({
  getInitialState: function() {
    return {
      dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
      loaded:false,
    };
  },

  componentDidMount: function() {
    this._getAddressList();
  },

  _getAddressList:function(){
    var thiz = this;
    var thizDataSource = thiz.state.dataSource;
    Util.post(API.ADDRESSLIST,Global.user,
      function (ret){
        if(ret.code==0&&ret.data.length>0){
          thiz.setState({
              dataSource: thizDataSource.cloneWithRows(ret.data),
              loaded:true,
          });
        }
      });
  },

  _renderListItem:function(rowData){
    return (
      <View style={{padding:15,backgroundColor:'white',marginBottom:10}}>
        <View style={{flexDirection:'row'}}>
          <Text style={{color:'#424242'}}>{rowData.consignee}</Text>
          <Text style={{color:'#424242',marginLeft:20,}}>{rowData.phone_mob}</Text>
        </View>
        <Text>{rowData.address}</Text>
      </View>
      );
  },

  _addAddr:function(){
    this.props.navigator.push({
        title: '地址添加',
        component: AddAddress,
        passProps:{
          data: {},
        }
      });
  },

  render: function() {
    if(!this.state.loaded){
        return <Loading loadingtext='正在加载地址列表数据...'/>
    };
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderListItem}/>
        <TouchableHighlight
          underlayColor='#eef0f3'
          style={{ justifyContent: 'center',alignItems: 'center',height:50,backgroundColor:'#ee7700'}}
          onPress={() => this._addAddr()}>
          <Text style={{fontSize:18,color:'white'}}>添加地址</Text>
        </TouchableHighlight>
     </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    backgroundColor:'#eef0f3',
  },
});

module.exports = Market;