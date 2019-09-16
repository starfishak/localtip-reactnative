import React from "react";
import {Button, StyleSheet, Text, View, Image, ActivityIndicator} from "react-native";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers/places";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';

type Props = {
    navigation : any,
    fetchPlaceDetails : Function
    data: Object,
    image: string,
    isFetching : boolean
};

class PlaceDetailsScreen extends React.Component<Props> {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id');
        console.log("place_id", place_id);
        this.props.fetchPlaceDetails(place_id);
        this.render();
    }

    render() {
        const {data, isFetching, navigation} = this.props;
        const place_id = navigation.getParam('id');
        console.log("isFetching:",isFetching, "Image:", data['image']);
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
                        style={{width: 200, height: 300}}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <Text>Place Details Page</Text>
                    <Text>{data['name']}</Text>
                    <Button
                        onPress={() => navigation.navigate('Landing')}
                        title="Home"
                    />
                </View>
            );
        }
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

const mapStateToProps = (state) => ({
    isFetching: getPlaceDetails(state),
    data: getPlaceDetailsSuccess(state),
    error: getPlaceDetailsError(state),
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPlaceDetails: fetch_place_details
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsScreen)