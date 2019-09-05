import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import Greeting from '../../components/Greeting';
import PlaceCard from "../../components/landing/place/place_card";

class LandingScreen extends React.Component {
    render() {
        const {navigation: navigation} = this.props;
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={{
                        flex: 1,
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%'
                    }}
                    data={this.state.data}
                    keyExtractvor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                marginTop: 25,
                                width: '50%'
                            }}
                        >
                            <PlaceCard name={item.title} place_address={item.vicinity} />
                        </View>
                    )}
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