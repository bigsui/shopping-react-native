/**
 *
 * @authors Your Name (you@example.org)
 * @date    2015-10-18 14:38:47
 * @version $Id$
 */
'use strict';
var React = require('react-native');


var Global = require('../../util/global');
var API = require('../../network/api');
var Util = require('../../util/util');
var Loading = require('../loading');

var PAGESIZE = 6;

var {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    Platform,
    TouchableHighlight,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    } = React;


var resultsCache = {
    dataForOrder: [],
    nextPageNumberForQuery: {},
    totalForQuery: {},
    pageIndex:1,
};

var Search = React.createClass({
    getInitialState: function() {
        return {
            dataSource:new ListView.DataSource({rowHasChanged:(row1,row2) =>row1!==row2}),
            loaded:false,
        };
    },

    componentDidMount: function() {

    },

    render: function() {
        return (
            <View style={styles.container}>
                <Text>新模块</Text>
                <ListView
                    ref='listview'
                    renderFooter={this.renderFooter}
                    onEndReached={this.onEndReached}
                    renderSeparator={this.renderSeparator} //分割线
                    dataSource={this.state.dataSource}
                    renderRow={this._renderListItem}/>
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eef0f3',
    },
    thumb: {
        width: 60,
        height: 60,
        marginRight: 10
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

module.exports = Search;