

var React = require('react-native');
var Dimensions = require('Dimensions');

var {
  PixelRatio
} = React;

var Util = {

  //单位像素
  pixel: 1 / PixelRatio.get(),
  //屏幕尺寸
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  //post请求
  post: function (url, data, callback) {
    var fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

    fetch(url, fetchOptions)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
      // callback(responseText);
    }).done();
  },

  //get请求
  get: function (url, callback) {
    fetch(url)
    .then((response) => response.text())
    .then((responseText) => {
      callback(JSON.parse(responseText));
      // callback(responseText);
    }).done();
  },

  log:function (obj){
    var description = "";
     for(var i in obj){
        var property=obj[i];
        description+=i+" = "+property+"\n";
     }
     alert(description);
  },
  //Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'

};

module.exports = Util;