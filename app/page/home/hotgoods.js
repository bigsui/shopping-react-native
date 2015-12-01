'use strict';
var React = require('react-native');
var Util = require('../../util/util');
var GoodsDetail = require('../goodsdetail');

var {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    } = React;

//每个单项组件
var Product = React.createClass({
    render: function() {

        var item = this.props.data;
        var itemWidth =this.props.itemWidth;
        var itemsize ={
            width:itemWidth,
        };
        var imagesize ={
            width:itemWidth-10,
            height: itemWidth-10,
        };
        return (
            <View style={[styles.itemBlock,itemsize]}>
                <Image style={[styles.image,imagesize]} source={{uri: item.default_image}}></Image>
                <Text style={[styles.font_goodsname,styles.marginTop4]}>{item.goods_name}</Text>
                <View style={[styles.row]}>
                    <Text>倍全价: </Text>
                    <Text style = {[styles.font_bqprice,styles.flex1]}>{item.price}</Text>
                    <Image style={[styles.image,styles.image_add]} source={require("image!ic_goods_add")}></Image>
                </View>
            </View>
        );
    }
});

var HotGoods = React.createClass({
     _goodsDetail:function (product) {
        this.props.navigator.push({
            title: '商品详情',
            rightButtonTitle:'分享',
            component: GoodsDetail,
            passProps:{
              intent: product,
            }
          });
    },

    render: function(){
        var collumnNum = this.props.collumnNum;
        var products = this.props.hotgoods;
        var itemWidth = Math.floor((Util.size.width)/collumnNum);
        var size ={
            width:itemWidth,
            height: itemWidth*1.25,
        };
        var itemviews = [];
        for(var ii = 0;ii<products.length;ii++){
            var product = products[ii];
            itemviews.push(
                <TouchableHighlight onPress={()=>this._goodsDetail(product)}>
                    <View style={[styles.center,size]} key={ii}>
                        <Product
                            itemWidth ={itemWidth-15}
                            data={products[ii]} />
                    </View>
                </TouchableHighlight>
            );
        }

        return(
            <View style={styles.container}>
                {itemviews}
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f5f5f5',
        flexWrap:'wrap',

    },
    center:{
        justifyContent:'center',
        alignItems:'center',
    },
    itemBlock:{
        backgroundColor:'white',
        padding:5,
    },
    row:{
        flexDirection:'row',
    },
    flex1:{
        flex:1,
    },
    marginTop4:{
        marginTop:4,
    },
    font_goodsname:{
        fontSize:12,
        color:'#333333',
        height:26,
    },
    font_bqprice:{
        fontSize:16,
        color:'#ee7700',
    },
    image: {
        paddingLeft:5,
        paddingRight:5,
        paddingTop:5,
        paddingBottom:5,
        resizeMode: Image.resizeMode.stretch,//拉伸
    },
    image_add:{
        width:25,
        height:25,
    },
});

module.exports = HotGoods;