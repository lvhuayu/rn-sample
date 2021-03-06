'use strict';

var alt = require('../../common/alt');
var taskListAction = require('../../actions/task/taskListAction');
var taskListService = require('../../services/task/taskListService')
var asyncStorage = require('../../common/storage');
var appConstants = require('../../constants/appConstants');
class TaskListStore {
    constructor() {
        this.bindActions(taskListAction);
        this.state = {};
    }

    doCache(responseData){
        asyncStorage.getItem('appConstants')
        .then((data)=>{
            if(!!data){
                appConstants = data;
                appConstants.taskList = responseData.data
                asyncStorage.setItem('appConstants', appConstants);

            }
        }).done();
    }
    onGetDependencesList(data) {
        taskListService.getDependencesList(data)
        .then((responseData) => {
            taskListAction.getDependencesListSuccess(responseData)
        }).done();

        this.preventDefault();
    }
    onGetDependencesListSuccess(responseData){
        if (!responseData) {return false};
        responseData.type = 'getDependencesList'
        this.doCache(responseData);
        this.setState(responseData);
    }
    mergeList(responseData){
        asyncStorage.getItem('appConstants')
        .then((result)=>{
            if (!!result.taskList) {
                responseData.data = result.taskList.concat(responseData.data)
                this.setState(responseData);
            }else{
                this.setState(responseData);
            }
            this.doCache(responseData);
        }).done();
    }

    onDelete(data){
        taskListService.deleteList(data)
        .then((responseData) => {
            taskListAction.deleteSuccess(responseData)
        }).done();

        this.preventDefault();
    }
    onDeleteSuccess(responseData){
        var self = this;
        if (!responseData) {return false};
        responseData.type = 'delete'
        self.setState(responseData);
    }
    onDeleteHomeTask(data){
        taskListService.deleteList(data)
        .then((responseData) => {
            taskListAction.deleteHomeTaskSuccess(responseData)
        }).done();

        this.preventDefault();
    }
    onDeleteHomeTaskSuccess(responseData){
        var self = this;
        if (!responseData) {return false};
        responseData.type = 'deleteHomeTask'
        self.setState(responseData);

    }
    removeItemFromCache(obj, id){
        try{
            for (var i = 0; i < obj.jobVOList.length; i++) {
                if(obj.jobVOList[i].jobDO.id == id){
                    obj.jobVOList.splice(i, 1)
                }
            };
        }catch(err){
            console.log('[NZAOM:]', err)
        }
        return obj;
    }
    onAddDependinces(data){
        this.setState(data);
    }
}

module.exports = alt.createStore(TaskListStore, 'TaskListStore');