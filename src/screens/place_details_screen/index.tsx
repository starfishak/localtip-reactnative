import React from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator, Dimensions} from "react-native";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';
import {colors} from "../../styles/theme";

type Props = {
    navigation : any,
    fetchPlaceDetails : Function
    data: Object,
    image: string,
    isFetching : boolean
};

type Data = {
    data: object,
    image : string
    isFetching: boolean,
    error: any
}

class PlaceDetailsScreen extends React.Component<Props> {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('place_title'),
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'sans-serif-light'
            }
        };
    };

    componentWillMount() {
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id');
        console.log("place_id", place_id);
        this.props.fetchPlaceDetails(place_id);
        this.render();
    }

    render() {
        const {isFetching, navigation, data} = this.props;
        console.log("image:",data.image,isFetching);
        console.log("title:", navigation.getParam('place_title'));
        if(isFetching) {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Image
                        source={{uri:data.image}}
                        style={styles.image}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.place_title}>{data['name']}</Text>
                        {data['categories'].map(item => <Text key={item.id} style={styles.place_category}>{item.title}</Text>)}

                        <Button
                            onPress={() => navigation.navigate('Landing')}
                            title="Home"
                        />
                    </View>
                </View>
            );
        }
    };
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    image: {
        width: win.width,
        height: 250,
    },
    text_container: {
        flex: 1,
    },
    place_title: {
        paddingTop: 10,
        marginLeft: 5,
        marginRight: 5,
        fontFamily: 'sans-serif-light',
        fontSize: 20,
        color: colors.black,
        fontWeight: 'bold',
        lineHeight: 18,
        textAlign: 'left',
    },
    place_category: {
        marginLeft: 5,
        marginRight: 5,
        fontFamily: 'sans-serif-light',
        fontSize: 12,
        color: colors.grey,
        lineHeight: 16,
        textAlign: 'left',
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

const mapStateToProps = (state) => ({
    isFetching: getPlaceDetails(state),
    data: getPlaceDetailsSuccess(state),
    error: getPlaceDetailsError(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPlaceDetails: fetch_place_details
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsScreen)