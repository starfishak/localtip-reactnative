import React from "react";
import {Button,StyleSheet, Text, View} from "react-native";

class PlacesDetialsScreen extends React.Component {
    render() {
        // @ts-ignore
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id', '123');
        return (
            <View style={styles.container}>
                <Text>Place Details Page</Text>
                <Text>{place_id}</Text>
                <Button
                    onPress={() => navigation.navigate('Landing')}
                    title="Home"
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

export default PlacesDetialsScreen;