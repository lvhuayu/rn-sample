'use strict';

var React = require('react-native');
import NavigationBar from 'react-native-navbar'
var TimerMixin = require('react-timer-mixin');
var {View,
    Text,
    TextInput,
    Navigator,
    StyleSheet
} = React;

var appConstants = require('../../constants/appConstants');
var asyncStorage = require('../../common/storage');
var commonStyle = require('../../styles/commonStyle');
var Button = require('../../common/button.js');
var Modal = require('../../common/modal');

var userAction = require('../../actions/user/userAction');
var userStore = require('../../stores/user/userStore');

var BlueBackButton = require('../../common/blueBackButton');
var RightDoneButton = require('../../common/rightDoneButton');

//获取可视窗口的宽高
var util = require('../../common/util.js');
var {
    width, height, scale
} = util.getDimensions();

var _navigator, _topNavigator = null;
module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function(){
        _navigator = this.props.navigator;
        _topNavigator = this.props.route.topNavigator;
        return {
            position: this.props.route.data.position || '',
            targetUserId: this.props.route.data.userId || 0
        }
    },
    _modal: {},
    componentDidMount: function(){
        this.unlisten = userStore.listen(this.onChange)
    },
    componentWillUnmount: function() {
        this.unlisten();
    },
    onChange: function() {
        var result = userStore.getState();
        if (result.type == 'update') {
            if (result.status != 200 && !!result.message) {
                return;
            }
            this._modal.showModal('修改职位成功');
            if (this._timeout) {
                this.clearTimeout(this._timeout);
            };
            this._timeout = this.setTimeout(()=>{
                this._modal.hideModal();
                _navigator.pop();
            },2000);

        };
    },
    onChangePositionText: function(text){
        this.setState({
            position: text
        });
    },
    doCommit: function(){
        userAction.update({
            position: this.state.position,
            targetUserId: this.state.targetUserId
        });
    },
    onPressDone: function(){
        this.doCommit();
    },
    onSubmitEditing: function(){
        this.doCommit();
    },
    render: function(){
        return (
            <View style={commonStyle.container}>
                <NavigationBar
                    title={{title: '修改职位'}}
                    leftButton={<BlueBackButton navigator={_topNavigator} />}
                    rightButton={<RightDoneButton onPress={this.onPressDone} />} />
                <View style={styles.main}>
                    <View style={commonStyle.textInputWrapper}>
                        <TextInput placeholder='请输入职位'
                        style={commonStyle.textInput}
                        clearButtonMode={'while-editing'}
                        value={this.state.position}
                        onChangeText={this.onChangePositionText}
                        onSubmitEditing={this.onSubmitEditing} />
                    </View>
                    <Modal ref={(ref)=>{this._modal = ref}}/>
                </View>
            </View>
        );
    }
})

var styles = StyleSheet.create({
    main: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});