'use strict';

var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var {
    View,
    Text,
    Navigator,
    ActionSheetIOS,
    StyleSheet
} = React;
var commonStyle = require('../../styles/commonStyle');
var OrderSegmentControl = require('./components/orderSegmentControl');
var OrderList = require('./components/orderList');
var OrderTemplates = require('./orderTemplates');
var OrderSettings = require('./orderSettings');
var OrderDetail = require('./orderDetail');
var _navigator, _topNavigator = null;

var order =  React.createClass({
    getInitialState: function(){
        _navigator = this.props.navigator;
        _topNavigator = this.props.route.topNavigator;
        return {
            orderStatus: 0
        }
    },
    doPush: function(component){
        _topNavigator.push({
            component: component,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            topNavigator: _topNavigator
        });
    },
    doCreate: function(index){
        switch(index){
            case 0:
                this.setState({
                    orderStatus: index
                })
                return this.doPush(OrderSettings);
            case 1:
                this.setState({
                    orderStatus: index
                })
                return this.doPush(OrderTemplates);
            default:
                return;
        }
    },
    showActionSheet: function(){
        var self = this;
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.actionList,
            cancelButtonIndex: 2,
            // destructiveButtonIndex: 1,
            },
            (buttonIndex) => {
                self.doCreate(buttonIndex)
              // self.setState({ clicked: self.actionList[buttonIndex] });
            });
    },
    actionList: ['新建订单','从模版创建','取消'],
    rightButtonConfig:function(){
        var self = this;
        return {
            title: '+',
            handler:() =>
                self.showActionSheet()
        }
    },
    onPressOrderRow: function(rowData, sectionID){
        _topNavigator.push({
            title: rowData.name,
            component: OrderDetail,
            sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            topNavigator: _topNavigator
        })
    },
    render:function(){
        return (
            <View style={commonStyle.container}>
                <NavigationBar
                    title={{ title: '订单', }}
                    rightButton={this.rightButtonConfig()} />
                <View style={styles.main}>
                    <OrderSegmentControl />
                    <OrderList
                    events={{onPressRow: this.onPressOrderRow}} />
                </View>
            </View>
        );
    }
})

var styles = StyleSheet.create({
    main:{
        flex:1
    }
});

module.exports = order;