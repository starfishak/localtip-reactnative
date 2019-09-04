import {Component} from "react";
import {View, Text} from "react-native";
import * as React from "react";
import PropTypes from 'prop-types';

class Greeting extends Component {
    static propTypes = {
        name : PropTypes.string
    }

    render() {
        return (
            <View style={{alignItems: 'center'}}>
        <Text>Hello {this.props.name}!</Text>
        </View>
    );
    }
}

export default Greeting;
