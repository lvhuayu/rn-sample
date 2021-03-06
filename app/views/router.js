'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var {AppRegistry, Navigator, StyleSheet,Text,View} = React;
var {Router, Route, Schema, Animations, TabBar, Actions} = require('react-native-router-flux');

var Advertisement = require('./advertisement');
var Welcome = require('./welcome');
var Launch = require('./launch');
var About = require('./about');
var Calendar = require('./calendar');
var DatePicker = require('./datePicker');
var Error = require('./error');
var Login = require('./login');
var Register = require('./register');
var ImageSwiperPage = require('./imageSwiperPage');
var WebViewWrapper = require('./webViewWrapper');

var MyTask = require('./home/myTask');
var OrderSheet = require('./home/orderSheet');

var OrderQuantitySetting = require('./order/orderQuantitySetting');

var RecordsList = require('./order/records/recordsList');
var RecordsSetting = require('./order/records/recordsSetting');

var OrderDetail = require('./order/orderDetail');
var OrderSettings = require('./order/orderSettings');
var OrderSettingsForTemplate = require('./order/orderSettingsForTemplate');
var OrderTemplates = require('./order/orderTemplates');

var AttachDetail = require('./order/attach/attachDetail');
var AttachSetting = require('./order/attach/attachSetting');
var TaskAttach = require('./order/attach/taskAttach');

var OrderShareSetting = require('./order/share/orderShareSetting');
var AddShareMember = require('./order/share/addShareMember');

var SettingsWrapper = require('./order/task/settingsWrapper');
var TaskDetail = require('./order/task/taskDetail');
var TaskDescribe = require('./order/task/taskDescribe');
var TaskSettings = require('./order/task/taskSettings');

var OrderTemplateSetting = require('./order/templates/orderTemplateSetting');

var CreateComment = require('./order/comments/createComment');
var CommentAtPersonList = require('./order/comments/commentAtPersonList');

var InviteMessage = require('./inbox/inviteMessage');
var SysMessage = require('./inbox/sysMessage');
var MessageGroup = require('./inbox/messageGroup');


var CompanyMemberList = require('./contact/companyMemberList');
var CompanySettings = require('./contact/companySettings');
var ContactDetail = require('./contact/contactDetail');
var CreateFactory = require('./contact/createFactory');
var CompanyWelcome = require('./contact/companyWelcome');
var CompanyList = require('./contact/companyList');
var ApplicationList = require('./contact/applicationList');
var CustomerList = require('./contact/customerList');
var CustomerSettings = require('./contact/customerSettings');
var InviteEmployee = require('./contact/inviteEmployee');
var PositionSetting = require('./contact/positionSetting');
var RoleSetting = require('./contact/roleSetting');

var UserAccount = require('./person/userAccount');
var MySettings = require('./person/mySettings');
var Suggest = require('./person/suggest');
var ChangeName = require('./person/changeName');
var ChangePassword = require('./person/changePassword');
var ResetPassword = require('./person/resetPassword');
var SetPassword = require('./person/setPassWord');
var ValidationCode = require('./person/validationCode');

var systemAction = require('../actions/system/systemAction');
var appAction = require('../actions/app/appAction');

var systemStore = require('../stores/system/systemStore');
var loginStore = require('../stores/user/loginStore');
var authTokenStore = require('../stores/user/authTokenStore');
var verifyCodeStore = require('../stores/user/verifyCodeStore');
var authStore = require('../stores/user/authStore');

var appConstants = require('../constants/appConstants');
var asyncStorage = require('../common/storage');
var util = require('../common/util.js');

module.exports = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function () {
        return {};
    },
    componentDidMount: function(){
        this.unlisten = systemStore.listen(this.onChange);
        this.unlistenLogin = loginStore.listen(this.onLoginChange);
        this.unAuthTokenlisten = authTokenStore.listen(this.onAuthTokenChange);
        this.unlistenVerifyCode = verifyCodeStore.listen(this.onVerifyCodeChange);
        this.unlistenAuth = authStore.listen(this.onAuthChange);
    },
    componentWillUnmount: function() {
        this.unlisten();
        this.unlistenLogin();
        this.unAuthTokenlisten();
        this.unlistenVerifyCode();
        this.unlistenAuth();
    },
    onVerifyCodeChange: function(){
        var result = verifyCodeStore.getState();
        if (result.type != 'register') {return};
        if (result.status != 200 && !!result.message) {
            util.toast(result.message);
            return;
        }
        return this.doLogin(result);
    },
    onAuthTokenChange: function(){
        var result = authTokenStore.getState();
        console.log('-----auth token result', result);
        if (result.status != 200 && !!result.message) {
            this.goWelcome();
            return;
        }
        switch(result.type){
            case 'updateToken':
                return this.doLogin(result);
            default: return;
        }
    },
    onAuthChange: function(){
        var result = authStore.getState();
        if (result.status != 200 && !!result.message) {
            util.toast(result.message);
            return;
        }
        switch(result.type){
            case 'reset':
                return this.doLogin(result);
            default: return;
        }
    },
    onLoginChange: function(){
        var result = loginStore.getState();
        if (result.status != 200 && !!result.message) {
            util.alert(result.message);
            return;
        }
        switch(result.type){
            case 'login':
                return this.doLogin(result);
            case 'logout':
                return this.doLogout(result);
            default: return;
        }
    },
    doLogin: function(result){
        appConstants.xAuthToken = result.data.token;
        appConstants.user = result.data.user;
        appConstants.userRights = result.data.userRights;
        asyncStorage.clear();//清空了之后再赋值
        console.log('----doLogin | reset', result);
        asyncStorage.setItem('appConstants', appConstants).done();

        this.setTimeout(function(){
            appAction.init(appConstants);
            this.getAppState();
        }, 350)
    },
    doLogout: function(){
        appConstants = {};
        // console.log('---doLogout');
        asyncStorage.setItem('appConstants', appConstants);
        this.setTimeout(function(){
            appAction.init(appConstants);
            this.goWelcome();
        }, 350)
    },
    getAppState: function(){
        //打开APP初始化操作,获取APP版本、当前登陆用户、所在公司、未读消息、系统时间等
        if (this._timeout) {
            this.clearTimeout(this._timeout);
        };
        console.log('-----do getAppState after login or updateToken');
        this._timeout = this.setTimeout(()=>{
            systemAction.init();
        }, 350);
    },
    onChange: function(){
        var result = systemStore.getState();
        console.log('----before systemStore change', result);

        if (result.type != 'init') { return; };
        if (result.status != 200 && !!result.message) {
            util.alert(result.message);
            return;
        }
        appConstants.unreadMsg = result.data.unreadMsg;
        this.setTimeout(function(){
            /*
                获取了 appConstants 之后，
                要在下一次发fetch数据的时候使用新的token
            */
            appAction.init(appConstants);
        }, 350);
        console.log('----after systemStore change');
        asyncStorage.setItem('appConstants', appConstants)
        .then(()=>{
            this.doLaunch();
        });;

    },
    goWelcome: function(){
        Actions.welcome();
    },
    goLaunch: function(){
        Actions.launch();
    },
    doLaunch: function(){
        if (!appConstants.user) {
            this.goWelcome();
        }else{
            this.goLaunch();
        }
    },
    render: function() {
        return (
            <Router hideNavBar={true}>
                <Schema name="modal" sceneConfig={Navigator.SceneConfigs.FloatFromBottom}/>
                <Schema name="default" sceneConfig={Navigator.SceneConfigs.FloatFromRight}/>
                <Schema name="withoutAnimation"/>

                <Route name="advertisement" initial={true} component={Advertisement} wrapRouter={true} title="Advertisement" hideNavBar={true}/>
                <Route name="launch" component={Launch} title="launch" type="reset" />
                <Route name="welcome" component={Welcome} title="welcome" type="reset" schema="modal"/>
                <Route name="about" component={About} title="关于我们"/>
                <Route name="calendar" component={Calendar} title="设置日期"/>
                <Route name="datePicker" component={DatePicker} title="设置时间"/>
                <Route name="error" component={Error} title="设置"/>
                <Route name="login" component={Login} title="登录" schema="modal"/>
                <Route name="register" component={Register} title="注册" schema="modal"/>
                <Route name="imageSwiperPage" component={ImageSwiperPage} title="图片详情" schema="withoutAnimation"/>

                <Route name="myTask" component={MyTask} title="我的任务"/>
                <Route name="orderSheet" component={OrderSheet} title="报表"/>

                <Route name="userAccount" component={UserAccount} title="我的账号"/>
                <Route name="mySettings" component={MySettings} title="设置"/>
                <Route name="suggest" component={Suggest} title="意见反馈"/>
                <Route name="changeName" component={ChangeName} title="修改姓名"/>
                <Route name="changePassword" component={ChangePassword} title="修改密码"/>
                <Route name="resetPassword" component={ResetPassword} title="重置密码"/>
                <Route name="setPassword" component={SetPassword} title="设置密码"/>
                <Route name="validationCode" component={ValidationCode} title="验证码"/>


                <Route name="orderQuantitySetting" component={OrderQuantitySetting} title="订单数量"/>

                <Route name="recordsList" component={RecordsList} title="进度记录"/>
                <Route name="recordsSetting" component={RecordsSetting} title="记录进度"/>

                <Route name="orderDetail" component={OrderDetail} title="订单详情"/>
                <Route name="orderDetailReplace" component={OrderDetail} title="订单详情" type="replace"/>
                <Route name="orderSettings" component={OrderSettings} title="订单设置" schema="modal"/>
                <Route name="orderSettingsForTemplate" component={OrderSettingsForTemplate} title="订单设置" schema="modal"/>
                <Route name="orderTemplates" component={OrderTemplates} title="选择模版"/>

                <Route name="attachDetail" component={AttachDetail} title="附件详情"/>
                <Route name="attachSetting" component={AttachSetting} title="附件设置" schema="modal"/>
                <Route name="taskAttach" component={TaskAttach} title="任务附件"/>

                <Route name="orderShareSetting" component={OrderShareSetting} title="分享订单进度"/>
                <Route name="addShareMember" component={AddShareMember} title="添加查询人"/>

                <Route name="settingsWrapper" component={SettingsWrapper} title="设置"/>
                <Route name="taskDetail" component={TaskDetail} title="任务详情"/>
                <Route name="taskSettings" component={TaskSettings} title="任务设置" schema="modal"/>
                <Route name="taskDescribe" component={TaskDescribe} title="任务描述"/>
                <Route name="webViewWrapper" component={WebViewWrapper} title="查看"/>


                <Route name="orderTemplateSetting" component={OrderTemplateSetting} title="我的模版" schema="modal"/>

                <Route name="createComment" component={CreateComment} title="发表评论"/>
                <Route name="commentAtPersonList" component={CommentAtPersonList} title="@好友"/>

                <Route name="inviteMessage" component={InviteMessage} title="邀请信息"/>
                <Route name="messageGroup" component={MessageGroup} title="消息列表"/>
                <Route name="sysMessage" component={SysMessage} title="系统信息"/>

                <Route name="companyMemberList" component={CompanyMemberList} title="员工列表"/>
                <Route name="companySettings" component={CompanySettings} title="设置"/>
                <Route name="contactDetail" component={ContactDetail} title="联系人详情"/>
                <Route name="createFactory" component={CreateFactory} title="新建企业"/>
                <Route name="companyWelcome" component={CompanyWelcome} title="新建或加入企业" schema="modal"/>
                <Route name="companyList" component={CompanyList} title="搜索入企业"/>
                <Route name="applicationList" component={ApplicationList} title="申请列表"/>
                <Route name="customerList" component={CustomerList} title="客户列表"/>
                <Route name="customerSettings" component={CustomerSettings} title="客户设置" schema="modal"/>
                <Route name="inviteEmployee" component={InviteEmployee} title="邀请员工"/>
                <Route name="positionSetting" component={PositionSetting} title="设置职位"/>
                <Route name="roleSetting" component={RoleSetting} title="设置角色"/>

            </Router>

        );
    }
});
