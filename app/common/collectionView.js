/**
* 使用listview实现oc里的collectionView
* https://github.com/lucholaf/react-native-grid-view
*/
'use strict';
var React = require('react-native');

var {
    AppRegistry,
    View,
    StyleSheet,
    ListView,
} = React;

var CollectionView = React.createClass({
    groupItems: function (items, itemsPerRow) {
        var itemsGroups = [];
        var group = [];
        items.forEach(function (item) {
            if (group.length === itemsPerRow) {
                itemsGroups.push(group);
                group = [item];
            } else {
                group.push(item);
            }
        });

        if (group.length > 0) {
            for (var i = group.length; i < itemsPerRow; i++) {
                group.push(null);
            };
            itemsGroups.push(group);
        }

        return itemsGroups;
    },
    getInitialState: function () {
        return {
            items: [],
            renderItem: null,
            style: undefined,
            itemsPerRow: 1,
            onEndReached: undefined
        };
    },
    renderGroup: function (group) {
        var that = this;
        var items = group.map(function (item, index) {
            return that.props.renderItem(item, index);
        });
        return (
            <View style={styles.group}>
          {items}
        </View>
        );
    },
    render: function () {
        var groups = this.groupItems(this.props.items, this.props.itemsPerRow);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        return (<ListView
          dataSource={ds.cloneWithRows(groups)}
          renderRow={this.renderGroup}
          style={this.props.style}
          onEndReached={this.props.onEndReached}
          scrollEnabled={this.props.scrollEnabled}
          pageSize={this.props.pageSize | 1} />);
    },
});


var styles = StyleSheet.create({
    group: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

module.exports = CollectionView;