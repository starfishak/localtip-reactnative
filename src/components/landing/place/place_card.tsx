import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, WebView, Dimensions} from 'react-native';
import {Card} from "react-native-elements";
import {colors} from "../../../styles/theme";

const PlaceCard = ({ place_data, navigation }) => {
    return (
        <TouchableOpacity style={styles.place_card} onPress={() => {
            navigation.navigate('Details',
                {id: place_data.id, place_title:place_data.title})
        }}>
            <Card title={place_data.title}>
                <View >
                    <WebView source={{html: `${place_data.vicinity}`}} />
                    {/*<Text>Test</Text>*/}
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default PlaceCard;

const win = Dimensions.get('window').width;
const styles = StyleSheet.create({
    place_title: {
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: colors.black,
        lineHeight: 18,
        textAlign: 'left',
        alignSelf: 'center'
    },
    place_address: {
        fontFamily: 'sans-serif-light',
        fontSize: 12,
        color: colors.black,
        lineHeight: 16,
        textAlign: 'left',
        alignSelf: 'center'
    },
    place_card : {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        color: colors.black,
        lineHeight: 16,
        textAlign: 'left',
        alignSelf: 'center',
        width: win*.8
    }
});