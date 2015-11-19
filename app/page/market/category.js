/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:38:47
 * @version $Id$
 */
'use strict';
var React = require('react-native');
var Styles  = require('./category_style');

var {
  	View,
    Text,
    ListView,
    TouchableHighlight,
} = React;

var Category = React.createClass({

  getInitialState:function(){
    var ds =  new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2});
    return {
      categoryIndex:0,
      dataSource:ds.cloneWithRows(this._genRows(0)),
      loaded:false,
    };
  },

  _genRows:function(index: number):Array<any>{
    var holderList = [];
    for (var ii = 0; ii < this.props.categoryList.length; ii++) {
      holderList[ii] = ii == index;
    };
    return holderList;
  },

  _rowPressed:function(rowID: number, cate_id: number){
    this.props.onSelect(rowID,cate_id);
    this.setState(
    {
      categoryIndex:rowID,
      dataSource:this.state.dataSource.cloneWithRows(this._genRows(rowID)),
    });
  },

  renderSeparator:function(){
    return ;
  },

  renderCategoryItem:function(rowData: Object, sectionID: number, rowID: number ){
    var cate = this.props.categoryList[rowID];
    var selected = this.state.categoryIndex == rowID;
    var styles_bg = selected?Styles.category_bg_select:Styles.category_bg_normal;

    return(
      <TouchableHighlight
        underlayColor ='#eef0f3'
        style = {[Styles.category,styles_bg]}
        onPress = {() => this._rowPressed(rowID,cate.cate_id)}>
        <Text> {cate.cate_name} </Text>
      </TouchableHighlight>
      );
  },

 render: function() {
    return (
      <View style={Styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderSeparator={this.renderSeparator}
          renderRow={this.renderCategoryItem.bind(this)}/>
      </View>
    );
  },

});

module.exports = Category;