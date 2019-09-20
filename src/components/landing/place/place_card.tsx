import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, WebView, Dimensions} from 'react-native';
import {Card} from "react-native-elements";
import {colors} from "../../../styles/theme";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PlaceCard = ({ place_data, navigation }) => {
    return (
        <TouchableOpacity style={styles.place_card} onPress={() => {
            navigation.navigate('Details',
                {id: place_data.id, place_title:place_data.title})
        }}>
            <Card title={place_data.title}>
                <View style={styles.info_view}>
                    <View style={styles.data_view}>
                        <Icon name="directions" size={20} color="#2A5E8D" />
                        <Text style={styles.info_text}>{place_data.distance} m</Text>
                    </View>
                    <View style={styles.data_view}>
                        <Icon name="label" size={20} color="#2A5E8D" />
                        <Text style={styles.info_text}>{place_data.category.title}</Text>
                    </View>
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
    },
    info_view : {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    data_view : {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    icons : {
        // paddingLeft: 5,
        // paddingRight: 5,
        justifyContent: 'center'
    },
    info_text: {
        // alignSelf: 'flex-start',
        // justifyContent: 'center'
        paddingLeft: 15
    }
});