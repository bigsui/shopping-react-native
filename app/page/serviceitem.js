'use strict';
var React = require('react-native');
var {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
} = React;

//每个单项组件
var ItemBlock = React.createClass({
	render: function() {
    var size ={
      width: parseInt(this.props.width),
      height: parseInt(this.props.width*0.7)
    };
    var item = this.props.service;
		return (
          <View style={[styles.itemBlock,size]}>
            <Image style={[styles.image]} source={{uri: item.icon}}></Image>
            <Text style={[styles.font18]}>{item.title}</Text>
          </View>
		);
	}
});

var styles = StyleSheet.create({
itemBlock:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  font18:{
    fontSize:14,
    color:'#333333',
    marginTop:5,
  },
  image: {
    width:50,
    height:50,
    resizeMode: Image.resizeMode.contain,
  },
});

module.exports = ItemBlock;