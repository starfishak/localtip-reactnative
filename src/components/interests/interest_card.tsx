import React from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity, WebView, Dimensions} from 'react-native';
import {ButtonGroup, Card} from "react-native-elements";
import {colors} from "../../styles/theme";
import Icon from 'react-native-vector-icons/MaterialIcons';

const InterestCard = ({ data }) => {
    const buttons = ['Yes', 'No'];
    let selected = 0;
    if (!data.active) {
        selected = 1;
    }
    return (
        <Card title={data.title}>
            <View style={styles.info_view}>
                <ButtonGroup
                    onPress={this.updateIndex}
                    selectedIndex={selected}
                    buttons={buttons}
                    containerStyle={{height: 50, flex:1}}
                />
            </View>
        </Card>
    );
};

export default InterestCard;

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