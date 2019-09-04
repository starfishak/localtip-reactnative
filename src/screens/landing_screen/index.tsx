import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import Greeting from '../../components/Greeting';

class LandingScreen extends React.Component {
    render() {
        const {navigation: navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text>hi</Text>
                <Text>hi</Text>
                <Greeting name="brice"></Greeting>
                <Button
                    onPress={() => navigation.navigate('Interests', {
                        id : "some-id"
                    })}
                    title="Press Me"
                />
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

export default LandingScreen;