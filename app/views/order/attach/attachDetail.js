'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
import NavigationBar from 'react-native-navbar'
var SearchBar = require('react-native-search-bar');
var moment = require('moment');
var {
    View,
    Text,
    Image,
    Navigator,
    ListView,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    ActionSheetIOS,
    StyleSheet
} = React;

var _navigator, _topNavigator = null;

var commonStyle = require('../../../styles/commonStyle');
var styles = require('../../../styles/order/orderDetail');

var BlueBackButton = require('../../../common/blueBackButton');
var RightSettingButton = require('../../../common/rightSettingButton');
var AttachSetting = require('./attachSetting');

var attachAction = require('../../../actions/attach/attachAction');
var attachStore = require('../../../stores/attach/attachStore');

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function(){
        _navigator = this.props.navigator;
        _topNavigator = this.props.route.topNavigator;
        return {
            gmtCreate: this.props.route.data.gmtCreate,
            fileAddress: this.props.route.data.fileAddress,
            fileName: this.props.route.data.fileName,
            operatorName: this.props.route.data.operatorName,
            accessoryId: this.props.route.data.id
        }
    },
    componentDidMount: function(){
        this.unlisten = attachStore.listen(this.onChange);
    },
    componentWillUnmount: function() {
        this.unlisten();
    },
    onChange: function(){
        var result = attachStore.getState();
        if (result.status != 200 && !!result.message) {
            return;
        }
        switch(result.type){
            case 'get':
                return this.doGet(result);
            case 'update':
                return this.doUpdate(result);
            default: return;
        }
    },
    doGet: function(result){
        this.setState({
            gmtCreate: result.data.gmtCreate,
            fileAddress: result.data.absoluteUrl,
            fileName: result.data.fileName,
            operatorName: result.data.userName,
            accessoryId: result.data.id
        });
    },
    doUpdate: function(result){
        if (this._timeout) {
            this.clearTimeout(this._timeout);
        };
        this._timeout = this.setTimeout(()=>{
            this.fetchData();
            // _navigator.pop();
        },2000);
    },
    fetchData: function(){
        attachAction.get({
            accessoryId: this.state.accessoryId
        });
    },
    _pressSettingButton: function(){
        _topNavigator.push({
            title: '附件设置',
            data: this.state,
            component: AttachSetting,
            sceneConfig: Navigator.SceneConfigs.FloatFromRight,
            topNavigator: _topNavigator
        })
    },
    renderTime: function(timestamp){
        var time = moment(timestamp).format('YYYY年MM月DD日');
        return(
            <Text
            style={commonStyle.settingDetail}>
                {time}
            </Text>
            )
    },
    render: function(){
        return(
            <View style={commonStyle.container}>
                <NavigationBar
                    title={{ title: this.props.route.title}}
                    leftButton={<BlueBackButton navigator={_topNavigator} />}
                    rightButton={<RightSettingButton onPress={this._pressSettingButton} />} />
                <View style={styles.main}>
                    <View style={styles.attachImageWrapper}>
                        <Image
                          source={{uri: this.state.fileAddress}}
                          style={styles.attachImageMiddle} />
                    </View>
                    <Text style={styles.attachTitle}>
                        {this.state.fileName}
                    </Text>
                    <TouchableHighlight
                        style={commonStyle.settingItemWrapper}
                        underlayColor='#eee'
                        onPress={this.cleanCache}>
                        <View
                        style={commonStyle.settingItem}>
                            <Text
                            style={[commonStyle.settingTitle, commonStyle.textLight]}>
                                上传人
                            </Text>
                            <Text
                            style={commonStyle.settingDetail}>
                                {this.state.operatorName}
                            </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={commonStyle.settingItemWrapper}
                        underlayColor='#eee'>
                        <View
                        style={commonStyle.settingItem}>
                            <Text
                            style={[commonStyle.settingTitle, commonStyle.textLight]}>
                                时间
                            </Text>
                            {this.renderTime(this.state.gmtCreate)}
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
            );
    }
})