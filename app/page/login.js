/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var API = require('../network/api');
var Util = require('../util/util');
var TimerMixin = require('react-timer-mixin');
var Store = require('react-native-simple-store');

var {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  TextInput,
} = React;

var login = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      phone: "",
      code: "",
      logined: false,
      secondsElapsed: 0,
    };
  },

  componentDidMount: function() {
    Store.get('user').then((userdata)=>{
      this.setState({
        phone:userdata.user_name,
    })});
  },

  tick: function() {
    var secondsElapsed = this.state.secondsElapsed-1;
    if(secondsElapsed==0){
      this.setState({secondsElapsed: 0});
      return;
    }
    this.setTimeout(
        () => {
          this.setState({secondsElapsed: secondsElapsed});
          this.tick();
        },
        500
    );
  },

  getCode: function() {
    var phone = this.state.phone;
    if(!this.checkPhone(phone)){
      alert("请输入正确的手机号码");
      return;
    }
    var thiz = this;
    Util.post(API.getSmsCode(),{'tel':phone,'type':'verifiycode'},function (ret){
      if(ret.code==0){
        thiz.setState({secondsElapsed: 60});
        thiz.tick();
      }
      Util.log(ret.msg);
    });
  },

  login:function(){
    var phone = this.state.phone;
    var code = this.state.code;
     if(!this.checkPhone(phone)){
      alert("请输入正确的手机号码");
      return;
    }
     if(!this.checkCode(code)){
      alert("验证码为4位数字");
      return;
    }

    fetch(API.LOGIN+"?user_name="+phone+"&code="+code+"&type=verifiycode")
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.code==0){
          this._loginSucc(responseData.data);
        }else{
          alert("验证码错误");
        }
      })
      .done();
  },

  _loginSucc:function(userData){
    this.props.loginResult(userData);
  },

  logout:function(){
    this.setState({logined:false});
  },

  checkPhone:function(phone){
    return phone&&phone.length>10;
  },

  checkCode:function(code){
    return code&&code.length===4;
  },

  renderLogined:function(){
    return (
        <View style={[styles.container]}>
          <Text style={{alignItems:'center',justifyContent:'center'}}>欢迎你:user_id:{user_id} access_token:{access_token}</Text>
          <TouchableHighlight style={[styles.btn,styles.marginTop30]} onPress={this.logout}>
            <Text style={{color:'#fff'}}>退出</Text>
          </TouchableHighlight>
        </View>);
  },

  renderLogin:function(){

    var getCode_text = this.state.secondsElapsed==0?'获取验证码':(this.state.secondsElapsed+'秒后重试');

    return (
      <Image style={[Util.size,styles.container]} source={require("image!bg_login")}>

        <View style={styles.loginform}>
        <Text style={[styles.title,{marginTop:40}]} >用户登陆</Text>
          <View style={[styles.inputRow,{marginTop:90}]}>
            <Text style={styles.label} >手机号</Text>
            <TextInput
              keyboardType ='numeric'
              clearButtonMode='while-editing'
              style={styles.input}
              placeholder="请输入11位手机号"
              onChangeText={(text) => this.setState({phone: text})}/>
          </View>
          <View style={[styles.line]} />
          <View style={[styles.inputRow,{marginTop:10}]}>
            <Text style={styles.label}>验证码</Text>
            <TextInput
              keyboardType ='numeric'
              clearButtonMode='while-editing'
              style={styles.input}
              placeholder="4位数字"
              onChangeText={(text) => this.setState({code: text})}/>
            <TouchableHighlight style={[styles.btn,{width:80,height:30}]} underlayColor='#0057a84a' onPress={this.getCode}>
              <Text style={{color:'#fff',fontSize:12}}>{getCode_text}</Text>
            </TouchableHighlight>
          </View>
          <View style={[styles.line,{marginTop:2}]} />
          <TouchableHighlight style={[styles.btn,styles.marginTop30]} underlayColor='#0057a84a' onPress={this.login}>
            <Text style={{color:'#fff'}}>登录</Text>
          </TouchableHighlight>
        </View>
      </Image>);
    },
    
  render: function() {
      if(this.state.logined){
        return this.renderLogined();
      }
      return this.renderLogin();
    },
  });

var styles = StyleSheet.create({
  container: {
    flex:1,
  },
  loginform:{
    backgroundColor:'#00000000',
    paddingLeft:40,
    paddingRight:40,
  },
  transparent:{
     backgroundColor:'#00000000',
  },
  title: {
    color:'#ffffff',
    fontSize:20,
    flex:1,
    textAlign:'center',
  },
  action:{
    height:50,
  },
  line:{
    height:1,
    backgroundColor: '#ffffff',
  },
  marginleft10:{
    marginLeft:10,
  },
   marginTop20:{
    marginTop:20,
  },
  marginTop30:{
    marginTop:30,
  },
  marginRight10:{
    marginRight:10,
  },
  inputRow:{
    backgroundColor:'00000000',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    height:35,
    borderColor:'#ccc',
    color:'#fff',
    flex:1,
    fontSize:14,
  },
  label: {
    width:80,
    fontSize: 14,
    color:'ffffff'
  },
  btn:{
    height:35,
    backgroundColor:'#4d796e',
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 10,
    borderWidth:1,
    borderColor:'#ffffff',
  }
});

module.exports = login;
