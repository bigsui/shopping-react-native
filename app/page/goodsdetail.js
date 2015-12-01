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
var HTMLView = require('react-native-htmlview');

var {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
    } = React;

var resultsCache = {
    dataForOrder: [],
    nextPageNumberForQuery: {},
    totalForQuery: {},
    pageIndex:1,
};

var GoodsDetail = React.createClass({
    getInitialState: function() {
        return {
            goods:null,
        };
    },

    componentDidMount: function() {
        var intent = this.props.intent;
        this.setState({
          goods: intent,
        });
        this._fetchGoods(intent.spec_id);
    },

    _fetchGoods:function (spec_id) {

    var thiz = this;
    Util.post(API.GOODSDETAIL,{'spec_id':spec_id},function (ret){
      if(ret.code==0){
        thiz.setState({
          goods: ret.data,
        });
      }else{
        alert(ret.msg);
      }
    });
    },
    render: function() {
        var goods = this.state.goods;
        if(!goods){
            return <Loading loadingtext='正在加载商品...'/>
        }
        var htmlContent = goods.description||"";
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image 
                        style={{width:Util.size.width,height:490}}
                        source={{uri: goods.default_image}}
                        />
                    <Text style={[styles.textprimary,styles.paddingLeftRight,styles.marginTop10]}>商品名称：{goods.goods_name}</Text>
                    <Text style={[styles.textPrice,styles.paddingLeftRight,styles.marginTop10]}>倍全价：{goods.shichang}</Text>
                    <View style={[styles.line1,styles.marginTop10]}/>
                    <Text style={[styles.textsecond,styles.paddingLeftRight,styles.marginTop10]}>品牌：{goods.brand}</Text>
                    <View style={[styles.line10,styles.marginTop10]}/>
                    <Text style={[styles.textprimary,styles.paddingLeftRight,styles.marginTop10]}>商品图文详情</Text>
                    <Text style={[styles.textprimary,styles.paddingLeftRight,styles.marginTop10]}>{htmlContent}</Text>
                    <HTMLView
                        value={htmlContent}
                        style={styles.container}
                      />
                </View>
            </ScrollView>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#f9f9f9',
        marginBottom:100,
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 10
    },
    line1:{
        height:1,
        backgroundColor:'#dadce2'
    },
    line10:{
        height:10,
        backgroundColor:'#ebeef1'
    },
    textprimary:{
        fontSize:18,
        color:'#4a4d52',
    },
    textsecond:{
        fontSize:18,
        color:'#929aa2',
    },
    textPrice:{
        fontSize:18,
        color:'#fb7e00',
    },
    marginTop10:{
        marginTop:15,
    },
    paddingLeftRight:{
        paddingLeft:10,
        paddingRight:10,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
    rowSeparator: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: 10,
    },
    rowSeparatorHide: {
        opacity: 0.0,
    },
    line:{
        height:1,
        backgroundColor: '#eef0f3',
    },
    row: {
        flexDirection: 'row',
    },
});

module.exports = GoodsDetail;