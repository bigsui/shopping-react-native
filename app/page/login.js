/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var API = require('../network/api');
var Util = require('../util/util');
var user_id ="1234";
var access_token="12345";

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} = React;

var login = React.createClass({
  getInitialState: function() {
    return {
      phone: "",
      code: "",
      logined: false,
      secondsElapsed: -1,
    };
  },

  tick: function() {
    if(this.state.secondsElapsed==-1){
      this.setState({secondsElapsed: 10});
    }else if(this.state.secondsElapsed==0){
      clearInterval(interval);
      this.setState({secondsElapsed: -1});
    }else {
      this.setState({secondsElapsed: this.state.secondsElapsed -1});
      clearInterval(interval);
    }
  },

  getCode: function() {
    var phone = this.state.phone;
    if(!this.checkPhone(phone)){
      alert("请输入正确的手机号码");
      return;
    }
    Util.post(API.getSmsCode(),{'tel':phone,'type':'verifiycode'},function (ret){
      alert(ret.msg);
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
    return (
      <View style={[styles.container]}>
        <View style={[styles.inputRow]}>
          <Text style={styles.label}>手机号</Text>
          <TextInput  
            style={styles.input} 
            placeholder="请输入11位手机号" 
            onChangeText={(text) => this.setState({phone: text})}/>
        </View>
        <View style={[styles.line]} />
        <View style={[styles.inputRow,{marginTop:5}]}>
          <Text style={styles.label}>验证码</Text>
          <TextInput 
            style={styles.input} 
            placeholder="4位数字" 
            onChangeText={(text) => this.setState({code: text})}/>
          <TouchableHighlight style={[styles.btn,{width:80,height:25}]} onPress={this.getCode}>
            <Text style={{color:'#fff',fontSize:12}}>获取验证码</Text>
          </TouchableHighlight>

        </View>
        <View style={[styles.line,{marginTop:2}]} />
        <TouchableHighlight style={[styles.btn,styles.marginTop30]} onPress={this.login}>
          <Text style={{color:'#fff'}}>登录</Text>
        </TouchableHighlight>   
        <Text style={{color:'#fff',fontSize:12}}>test:{this.state.secondsElapsed}秒</Text>
      </View>);
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
    backgroundColor: '#57a84a',
    paddingLeft:40,
    paddingRight:40,
    paddingTop:90,
    flex:1,
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
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    height:35,
    borderColor:'#ccc',
    flex:1,
    fontSize:14,
  },
  label: {
    width:80,
    fontSize: 14,
    color:'ffffff'
  },
  btn:{
    marginTop:10,
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
