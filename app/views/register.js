'use strict';

var React = require('react-native');
var {View, Text, StyleSheet} = React;
var Button = require('../common/button.js');

class Register extends React.Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Register page</Text>
                <Button >Home</Button>
                <Button >Back</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

module.exports = Register;