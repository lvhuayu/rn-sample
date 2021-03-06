'use strict';

var React = require('react-native');
import NavigationBar from '../../common/react-native-navbar/index';
var Actions = require('react-native-router-flux').Actions;
var TimerMixin = require('react-timer-mixin');
var {View,
    Text,
    Image,
    TextInput,
    TouchableHighlight,
    AlertIOS,
    StyleSheet
} = React;

var appConstants = require('../../constants/appConstants');
var asyncStorage = require('../../common/storage');
var commonStyle = require('../../styles/commonStyle');
var Button = require('../../common/button.js');
var Modal = require('../../common/modal');

var customerAction = require('../../actions/contact/customerAction');
var customerStore = require('../../stores/contact/customerStore');

var BlueBackButton = require('../../common/blueBackButton');
var RightAddButton = require('../../common/rightAddButton');

//获取可视窗口的宽高
var util = require('../../common/util.js');
var {
    width, height, scale
} = util.getDimensions();

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function(){
        var defaultData = this.props.data;
        console.log('-----defaultData', defaultData);
        return {
            target: this.props.target || 1,//1: create 2: update
            id: defaultData ? defaultData.userId : 0,//客户id
            userName: defaultData ? defaultData.userName :'',
            mobiles: defaultData ? defaultData.mobiles :[],
            company: defaultData ? defaultData.company :'',
            position: defaultData ? defaultData.position :''
        }
    },
    _modal: {},
    componentDidMount: function(){
        this.unlisten = customerStore.listen(this.onChange)
    },
    componentWillUnmount: function() {
        this.unlisten();
    },
    handleCreate: function(result){
        if (result.status != 200 && !!result.message) {
            util.toast(result.message);
            return;
        }
        util.toast('添加客户成功');
        if (this._timeout) {
            this.clearTimeout(this._timeout);
        };
        this._timeout = this.setTimeout(()=>{
            Actions.pop();
        },350);
    },
    handleUpdate: function(result){
        if (result.status != 200 && !!result.message) {
            util.toast(result.message);
            return;
        }
        util.toast('编辑成功');
        if (this._timeout) {
            this.clearTimeout(this._timeout);
        };
        this._timeout = this.setTimeout(()=>{
            Actions.pop();
        },350);
    },
    handleDelete: function(result){
        if (result.status != 200 && !!result.message) {
            util.toast(result.message);
            return;
        }
        util.toast('删除客户成功');
        if (this._timeout) {
            this.clearTimeout(this._timeout);
        };
        this._timeout = this.setTimeout(()=>{
            Actions.pop(2);
        },350);
    },
    onChange: function() {
        var result = customerStore.getState();
        switch(result.type){
            case 'create':
                return this.handleCreate(result);
            case 'update':
                return this.handleUpdate(result);
            case 'delete':
                return this.handleDelete(result);
        }
    },
    onChangeNameText: function(text){
        this.setState({
            userName: text
        });
    },
    onChangeCompanyText: function(text){
        this.setState({
            company: text
        });
    },
    onChangePhoneText: function(text){
        this.setState({
            mobiles: [text]
        });
    },
    onChangePositionText: function(text){
        console.log('----position', text);
        this.setState({
            position: text
        });
    },
    doCommit: function(){
        if (!this.state.userName) {
            util.alert('请输入姓名');
            return;
        };
        console.log('-----position result', this.state.position);
        var phone = this.state.mobiles[0];
        if (!!phone) {
            phone = phone.replace(/[^\d]/g, '');
        };
        if (this.state.target == 1) {//新建
            customerAction.create({
                userName: this.state.userName,
                mobiles: [phone],
                company: this.state.company,
                position: this.state.position
            });
        }else{
            customerAction.update({//编辑
                id: this.state.id,
                userName: this.state.userName,
                mobiles: [phone],
                company: this.state.company,
                position: this.state.position
            });
        }
    },
    onPressDone: function(){
        this.doCommit();
    },
    onSubmitEditing: function(){
        this.doCommit();
    },
    doDeleteCustomer: function(){
        AlertIOS.alert(
            '删除客户',
            '您确定要删除客户吗',
            [
                {text: '确定', onPress: () => {
                    customerAction.delete({
                        id: this.state.id
                    });
                } },
                {text: '取消', onPress: () => {return}, style: 'cancel'},
            ]
        )
    },
    renderDeleteButton: function(){
        if (this.state.target == 1) {
            return(
                <View />
                );
        };
        return(
            <TouchableHighlight
                style={commonStyle.logoutWrapper}
                underlayColor='#eee'>
                <View style={commonStyle.logoutBorder}>
                    <Button
                    style={[commonStyle.button, commonStyle.red]}
                    onPress={this.doDeleteCustomer} >
                        删除客户
                    </Button>
                </View>
            </TouchableHighlight>
            );
    },
    render: function(){
        return (
            <View style={commonStyle.container}>
                <NavigationBar
                    tintColor="#f9f9f9"
                    title={{title: this.props.title}}
                    leftButton={<BlueBackButton />}
                    rightButton={<RightAddButton onPress={this.onPressDone} title="保存" />} />
                <View style={styles.main}>
                    <View style={commonStyle.textInputWrapper}>
                        <Image
                          style={commonStyle.textIcon}
                          source={require('../../images/contact/business.png')} />
                        <TextInput placeholder='请输入客户公司'
                        style={commonStyle.textInput}
                        clearButtonMode={'while-editing'}
                        value={this.state.company}
                        onChangeText={this.onChangeCompanyText} />
                    </View>
                    <View style={commonStyle.textInputWrapper}>
                        <Image
                          style={commonStyle.textIcon}
                          source={require('../../images/contact/Person_gray.png')} />

                        <TextInput placeholder='请输入客户名称'
                        style={commonStyle.textInput}
                        clearButtonMode={'while-editing'}
                        value={this.state.userName}
                        onChangeText={this.onChangeNameText} />
                    </View>
                    <View style={commonStyle.textInputWrapper}>
                        <Image
                          style={commonStyle.textIcon}
                          source={require('../../images/contact/phone-number.png')} />
                        <TextInput placeholder='请输入客户手机号码'
                        style={commonStyle.textInput}
                        clearButtonMode={'while-editing'}
                        value={this.state.mobiles[0]}
                        onChangeText={this.onChangePhoneText} />
                    </View>
                    <View style={commonStyle.textInputWrapper}>
                        <Image
                          style={commonStyle.textIcon}
                          source={require('../../images/contact/position.png')} />
                        <TextInput placeholder='请输入客户职位'
                        style={commonStyle.textInput}
                        clearButtonMode={'while-editing'}
                        value={this.state.position}
                        onChangeText={this.onChangePositionText}
                        onSubmitEditing={this.onSubmitEditing} />
                    </View>
                    {this.renderDeleteButton()}
                    <Modal ref={(ref)=>{this._modal = ref}}/>
                </View>
            </View>
        );
    }
})

var styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 16,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    }
});