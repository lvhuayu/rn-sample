'use strict';
var React = require('react-native')
var TimerMixin = require('react-timer-mixin');
var {
    Text,
    TextInput,
    View,
    ListView,
    Image,
    Navigator,
    TouchableOpacity,
    ActivityIndicatorIOS,
    StyleSheet
} = React

var taskListAction = require('../../../actions/task/taskListAction');
var taskListStore = require('../../../stores/task/taskListStore');
var taskStore = require('../../../stores/task/taskStore');

var util = require('../../../common/util');
var commonStyle = require('../../../styles/commonStyle');
var styles = require('../../../styles/order/orderDetail');
var TaskItem = require('./taskItem');

/*
target: 表示从哪里打开任务列表 enum
{

    1: 'createOrder',
    2: 'normal'
}
*/

module.exports = React.createClass({
    mixins: [TimerMixin],
    displayName: 'taskList',
    getInitialState: function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}) // assumes immutable objects
            // return {dataSource: ds.cloneWithRows(ArticleStore.all())}
        return {
            taskStatus: this.props.data.taskStatus || 1,
            lastIdList: this.props.data.lastIdList || [],
            loaded : false,
            list: [],
            dataSource: ds
        }
    },
    componentDidMount: function(){
        this.unlisten = taskListStore.listen(this.onChange);
        this.unlistenTaskChange = taskStore.listen(this.onTaskChange)
        if (this._timeout) {
            this.clearTimeout(this._timeout)
        };
        this._timeout = this.setTimeout(this.fetchData, 350)
    },
    componentWillUnmount: function() {
        this.unlisten();
        this.unlistenTaskChange();
    },
    onTaskChange: function(){
        var result = taskStore.getState();
        if (result.status != 200 && !!result.message) {
            util.alert(result.message);
            return;
        }
        if (result.type == 'create') {
            this.setTimeout(this.fetchData, 350)
            // this.fetchData();
        };
        if (result.type == 'update') {
            this.setTimeout(this.fetchData, 350)
            // this.fetchData();
        };
    },
    handleGet: function(result){
        if (result.status != 200 && !!result.message) {
            this.setState({
                loaded: true,
                list: []
            })
            return;
        }
        var list = this.transfromDataList(result.data.jobVOList);
        this.setState({
            dataSource : this.state.dataSource.cloneWithRows(list),
            list: list,
            loaded     : true,
            total: result.total
        });
    },
    transfromDataList: function(list){
        if (!list) { return []};
        for (var i = 0; i < this.state.lastIdList.length; i++) {
            for (var j = 0; j < list.length; j++) {
                if(this.state.lastIdList[i] == list[j].jobDO.id){
                    list[j].isCheck = true;
                }
            };

        };
        return list;
    },
    handleDelete: function(result){
        if (result.status != 200 && !!result.message) {
            return;
        }
        this.setTimeout(this.fetchData, 350)
    },
    onChange: function() {
        var result = taskListStore.getState();
        if (result.status != 200 && !!result.message) {
            return;
        }
        switch(result.type){
            case 'get':
                return this.handleGet(result);
            case 'delete':
                return this.handleDelete(result);
        }
    },
    fetchData: function() {
        if (this.state.taskStatus == 2) {
            taskListAction.getDependencesList({
                orderId: this.props.data.orderId
            });

        }else{
            taskListAction.getList({
                orderId: this.props.data.id
            });
        }
    },
    renderRow: function(rowData, sectionID, rowID) {
        return (
            <TaskItem
            rowData={rowData}
            sectionID={sectionID}
            rowID={rowID}
            target={this.props.target}
            onPressRow={this.props.onPressRow} />
            )
    },
    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }
        return this.renderListView();
    },
    renderListView: function(){
        return (
            <ListView
              style={commonStyle.container}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
            )
    },
    renderLoadingView: function(){
        return (
            <View style={commonStyle.header}>
                <Text style={commonStyle.headerText}>User List</Text>
                <View style={commonStyle.container}>
                    <ActivityIndicatorIOS
                        animating={!this.state.loaded}
                        style={[commonStyle.activityIndicator, {height: 80}]}
                        size="large" />
                </View>
            </View>
        );
    }
});