'use strict';

var React = require('react-native');
var NavigationBar = require('react-native-navbar');
var SearchBar = require('react-native-search-bar');
var {
    View,
    Text,
    Image,
    Navigator,
    ListView,
    ScrollView,
    TouchableOpacity,
    ActionSheetIOS,
    StyleSheet
} = React;
// rowdata: { bgColor: '#b2cee6',
        //   bgColorId: 9,
        //   avatar: null,
        //   userId: 4,
        //   userName: '大白二货',
        //   simpleUserName: '二货',
        //   pinyin: 'DABAIERHUO',
        //   group: 1,
        //   mobiles: [ '15071414335' ] }
var contactsStyle = require('../../styles/contact/contactsItem');

module.exports = React.createClass({
    getInitialState: function(){
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds
        }
    },
    componentWillReceiveProps: function(nextProps){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(nextProps.data)
        });
    },
    renderAvatar: function(data){
        if (data.avatar) {
            return(
                <Image
                  style={contactsStyle.contactsItemCircle}
                  source={{uri: data.avatar}} />
                );
        }else{
            var circleBackground = {
                backgroundColor: data.bgColor
            }
            return(
                <View style={[contactsStyle.contactsItemCircle, circleBackground]}>
                    <Text style={contactsStyle.contactsItemTitle}>{data.simpleUserName}</Text>
                </View>
                )
        }
    },
    renderRow: function(data){
        return(
            <TouchableOpacity style={contactsStyle.contactsItem}
            onPress={()=>{this.props.onPressRow(data)}}>
                {this.renderAvatar(data)}
                <Text style={contactsStyle.contactsItemDetail}>{data.userName}</Text>
            </TouchableOpacity>
            );
    },
    render: function(){
        return(
            <ListView
              style={contactsStyle.scrollView}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow} />
            );
    }
});