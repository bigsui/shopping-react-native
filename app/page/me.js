/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:41:19
 * @version $Id$
 */
'use strict';
var React = require('react-native');
var AddresManager = require('./address/addresslist');
var OrderManager = require('./order/orderlist');
var CouponManager = require('./coupon/couponlist');
var ShellManager = require('./shell/shell');
var store = require('react-native-simple-store');


var {
  	StyleSheet,
  	View,
  	Text,
    ScrollView,
    Image,
    LinkingIOS,
    TouchableHighlight,
    ActionSheetIOS,
    NavigatorIOS,
} = React;

var MenuItem = React.createClass({
  _performClick:function(){
    var onClick = this.props.onClick;
    if(onClick){
      onClick();
    }
  },

  render: function() {
    var margin2Top =parseInt(this.props.margin2Top);
    return (
      <TouchableHighlight underlayColor="#dad9d7" onPress={this._performClick}>
        <View style={{flexDirection:'row',alignItems:'center',backgroundColor:'#ffffff',height:45,marginTop:margin2Top,paddingLeft:20,paddingRight:20}}>
          <Image style={[styles.iconSize]}
            source={require(this.props.icon)} />
          <Text  style={{flex:1,color:'#333333',marginLeft:10}}>{this.props.title}</Text>
          <Image style={[styles.iconSize]}
            source={require("image!arrow_right_grey")} />
        </View>
      </TouchableHighlight>
    );
  },
});
var Me = React.createClass({
  getInitialState: function() {
    return {
      user:null,
    };
  },

  componentDidMount: function() {
    store.get('user').then((userdata)=>{
      this.setState({
        user:userdata,
    })});
  },

  _addNavigator: function(component, title){
    var data = null;
    this.props.navigator.push({
        title: title,
        component: component,
        passProps:{
          data: data
        }
      });
  },

  _call:function(){
    LinkingIOS.openURL('tel://4007008780');
  },

  render: function() {
    var thiz = this;
    var name="";
    if(this.state.user){
      name = this.state.user.user_name;
    }
    return (
      <ScrollView style={{backgroundColor:'#eef0f3'}}>
        <View style={[]}>
          <Image style={[styles.header,styles.center,{backgroundColor:'#6bb967'}] } >
            <View style={styles.transparent}>
                <Image style={[styles.logoSize]}
                       source={require("image!ic_logo_circle")} />
              <Text style={styles.userName}>{name}</Text>
            </View>
          </Image>
         </View>

        <MenuItem 
          title='地址管理'
          icon="image!icon_bottomtag_me_n"
          onClick={function(){thiz._addNavigator(AddresManager,"地址管理")}}/>
        
        <MenuItem
          title='我的订单'
          margin2Top='1'
          icon="image!icon_bottomtag_me_n"
          onClick={function(){thiz._addNavigator(OrderManager,"订单列表")}}/>

        <MenuItem
          title='我的红包'
          margin2Top='1'
          icon="image!icon_bottomtag_me_n"
          onClick={function(){thiz._addNavigator(CouponManager,"红包")}}/>

        <MenuItem
          title='我的贝壳'
          margin2Top='1'
          icon="image!icon_bottomtag_me_n"
          onClick={function(){thiz._addNavigator(ShellManager,"我的贝壳")}}/>

        <TouchableHighlight 
          style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#ffffff',height:45,marginTop:30}} 
          underlayColor="#dad9d7" onPress={()=>this._call()}>
         <Text >拨打客服400-700-8780</Text>
        </TouchableHighlight>

      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center:{
    alignItems:'center',
    justifyContent: 'center',
  },
  userName:{
    color:'#ffffff',
    fontSize:20,
  },
  transparent:{
     backgroundColor:'#00000000',
  },
  header: {
    height: 100,
  },
  iconSize: {
    height:20,
    width:20,
    resizeMode: Image.resizeMode.contain,
  },
  logoSize: {
        height:40,
        width:40,
        resizeMode: Image.resizeMode.contain,
  },
});

module.exports = Me;