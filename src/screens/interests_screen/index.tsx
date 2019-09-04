import React from "react";
import {StyleSheet, Text, View} from "react-native";

class InterestsScreen extends React.Component {
    render() {
        const {navigation: navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>Interest Screen</Text>
            </View>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default InterestsScreen;