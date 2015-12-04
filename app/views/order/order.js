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

var orderListAction = require('../../actions/order/orderListAction');
var orderListStore = require('../../stores/order/orderListStore');

var commonStyle = require('../../styles/commonStyle');
var OrderSegmentControl = require('./components/orderSegmentControl');
var OrderList = require('./components/orderList');
var OrderTemplates = require('./orderTemplates');
var OrderSettings = require('./orderSettings');
var OrderDetail = require('./orderDetail');
var RightAddButton = require('../../common/rightAddButton');

var util = require('../../common/util');

var _navigator, _topNavigator = null;

var order =  React.createClass({
    getInitialState: function(){
        _navigator = this.props.navigator;
        _topNavigator = this.props.route.topNavigator;
        return {
            tabIndex: 0,
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
    onPressOrderRow: function(rowData, sectionID){
        _topNavigator.push({
            title: rowData.name,
            component: OrderDetail,
            sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            topNavigator: _topNavigator
        })
    },
    onSegmentChange: function(event){
        this.setState({
            tabIndex: event.nativeEvent.selectedSegmentIndex
        })
    },
    renderTabContent: function(){
        switch(this.state.tabIndex){
            case 0:
                return(
                    <OrderList
                    events={{onPressRow: this.onPressOrderRow}}
                    status={0} />
                )
            case 1:
                return(
                    <OrderList
                    events={{onPressRow: this.onPressOrderRow}}
                    status={1} />
                )
        }
    },
    render:function(){
        return (
            <View style={commonStyle.container}>
                <NavigationBar
                    title={{ title: '订单', }}
                    rightButton={<RightAddButton onPress={this.showActionSheet} />} />
                <View style={styles.main}>
                    <OrderSegmentControl
                    onSegmentChange={this.onSegmentChange} />
                    {this.renderTabContent()}
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