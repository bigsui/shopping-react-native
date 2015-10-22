/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-10-19 18:32:08
 * @version $Id$
 */
'use strict';
var React = require('react-native');

var {
  	StyleSheet,
    Image,
} = React;



var styles = StyleSheet.create({
  container: {
    paddingBottom:200,
  },
  //slider
  wrapper: {
    height:125,
  },
  slide: {
    height:125,
    resizeMode: Image.resizeMode.stretch,
  },
  adv: {
    height:175,
    resizeMode: Image.resizeMode.stretch,
  },
  container_bqservice:{
    padding:10,
  },
  inputRow:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    marginBottom:10,
  },
   welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  itemRow:{
    flexDirection:'row',
    marginBottom:2,
  },

});



module.exports = styles;