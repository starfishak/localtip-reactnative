import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from "react-native-elements";
import {colors} from "../../styles/theme";

const PlaceTitleCard = ({ place_data }) => {
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Details',
                {id: place_data.id, place_title:place_data.title})
        }}>
            <Card title={place_data.title}>
                <View style={styles.place_card}>
                    {/*<Image*/}
                    {/*    style={styles.header_image}*/}
                    {/*    resizeMode="cover"*/}
                    {/*    source={{ uri: `https://images.unsplash.com/photo-1442483221814-59f7d8b22739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80`  }} // call place*/}
                    {/*/>*/}
                    <Text style={styles.place_address}>{place_data.vicinity}</Text>
                </View>
            </Card>
        </TouchableOpacity>
    );
};

export default PlaceTitleCard;

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
        alignSelf: 'center'
    }
});