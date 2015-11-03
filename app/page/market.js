/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:38:47
 * @version $Id$
 */
'use strict';
var React = require('react-native');
var Global = require('../util/global');
var API = require('../network/api');
var Util = require('../util/util');
var Loading = require('./loading');
var CATEGORY=[];
var CateI =0;
var {
  	View,
    Text,
    Image,
    ListView,
    StyleSheet,
    TouchableHighlight,
} = React;

var resultsCache = {
  dataForCategory: [],
  dataForGoods: {},
  totalForGoods: {},
};

var Category = React.createClass({
  getInitialState:function(){
    var ds =  new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2});
    return {
      categoryIndex:0,
      dataSource:ds.cloneWithRows(this._genRows(0)),
      loaded:true,
    };
  },

  _genRows:function(index:number){
    var holderList = [];
    for (var ii=0; ii < this.props.categoryList.length; ii++) {
      holderList[ii] = ii == index;
    };
    return holderList;
  },

  _rowPressed:function(rowID,cate_id){
    this.props.onSelect(rowID,cate_id);
    this.setState(
    {
      categoryIndex:rowID,
      dataSource:this.state.dataSource.cloneWithRows(this._genRows(rowID)),
    });
  },

  _renderCategoryItem:function(rowData, sectionID, rowID){
    var cate = this.props.categoryList[rowID];
    var selected= this.state.categoryIndex == rowID;
    return(
      <TouchableHighlight
        underlayColor='#eef0f3'
        style={[styles.category,selected?styles.category_bg_select:styles.category_bg_normal]}
        onPress={() => this._rowPressed(rowID,cate.cate_id)}>
        <Text >{cate.cate_name}</Text>
      </TouchableHighlight>
      );
  },

 render: function() {
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderCategoryItem.bind(this)}/>
      </View>
    );
  },

});

var Market = React.createClass({
  getInitialState: function() {
    var dsc  = new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2});
    return {
      categoryIndex:0,
      dataSource_CAT:dsc.cloneWithRows([]),
      loaded:false,
      goodsList:{
      dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
        loaded:false,
      },
    };
  },

  componentDidMount: function() {
     this._fetchData();
  },

  _getCategoryDataSource: function(index:number): ListView.DataSource {
   var holderList = [];
    for (var ii=0; ii < resultsCache.dataForCategory.length; ii++) {
      holderList[ii] = ii == index;
    };
    alert(index);
    return holderList;
  },


//加载网络数据
  _fetchData: function() {
    var thiz = this;
    var thizDataSource = thiz.state.dataSource;
    Util.post(API.CATEGORYLIST,{'store_id':'8805'},
      function (ret){
        if(ret.code==0&&ret.data.assortment.length>0){
          resultsCache.dataForCategory= ret.data.assortment;
          thiz.setState({
              loaded:true,
              dataSource_CAT:thiz.state.dataSource_CAT.cloneWithRows(thiz._getCategoryDataSource(0)),
          });
          // thiz._fetchGoodsByCategory(ret.data.assortment[0].cate_id);
        }
      });
  },

  _fetchGoodsByCategory:function(category_id){
    var thiz = this;
    var thizDataSource = thiz.state.goodsList.dataSource;
    var params={
        'store_id':8805,
        'page':1,
        'limit':30,
        'cate_id':category_id
    };
    // Util.post(API.GOODSLIST,params,
    //   function (ret){
    //     thiz.setState({
    //       goodsList:{
    //         dataSource: thizDataSource.cloneWithRows(ret.data),
    //         loaded:true,
    //       },
    //     });
    //   });
  },

  _selectCategory:function (rowID,cate_id){
    alert(rowID);
  },

  _rowPressed:function(rowID,cate_id){
    this.setState({
      categoryIndex:rowID,
      dataSource: this.state.dataSource_CAT.cloneWithRows(this._getCategoryDataSource(rowID)),
    });
    
    // this._fetchGoodsByCategory(cate_id);
  },

   _renderCategoryItem:function(rowData, sectionID, rowID){
    var cate = resultsCache.dataForCategory[rowID];
    var selected= this.state.categoryIndex==rowID;
    return(
      <TouchableHighlight
        underlayColor='#eef0f3'
        style={[styles.category,selected?styles.category_bg_select:styles.category_bg_normal]}
        onPress={() => this._rowPressed(rowID,cate.cate_id)}>
        <Text >{cate.cate_name+selected}</Text>
      </TouchableHighlight>
      );
  },

  _renderGoodsList:function(rowData, sectionID, rowID){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.default_image }} />
          <View style={{flex:1}}>
            <Text style={{flex:1}}>{rowData.goods_name}</Text>
            <View style={{flexDirection:'row',alignItems:'flex-end',}}>
              <Text style={{color:'#626770'}}>倍全价:</Text>
              <Text style={{color:'#f28006',flex:1}}>{rowData.shichang}</Text>
              <Image style={{height:25,width:25,marginRight:10}} source={require("image!ic_goods_add")}/>
            </View>
          </View>
        </View>
        <View style={styles.line}/>
      </View>
      );
  },

  render: function() {
    if(!this.state.loaded){
        return <Loading loadingtext='正在商品...'/>
    };
    var thiz = this;
    return (
      <View style={styles.container}>
        <Category
          style={{flex:1}}
          onSelect={thiz._selectCategory}
          categoryList = {resultsCache.dataForCategory}/>

        <ListView
          style={{flex:3}}
          dataSource={this.state.goodsList.dataSource}
          renderRow={this._renderGoodsList}/>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    backgroundColor:'#eef0f3',
    paddingBottom:68,
  },
  category:{
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
  },
  category_bg_select:{
    backgroundColor:'#d7ead6',
  },
  category_bg_normal:{
    backgroundColor:'#ffffff',
  },
  thumb: {
    width: 70,
    height: 70,
    marginRight: 10
  },
  line:{
    backgroundColor:'#eef0f3',
    height:1,
  },
  textContainer: {
    flex: 1
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    height:90,
    justifyContent: 'center',
  }
});

module.exports = Market;