import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers/place_details";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';
import {getPlaceDetailsFailure} from "../../redux/actions/actions";

const Props = {
    navigation : navigator,
    fetchPlaceInfo : Function
};

class PlaceDetailsScreen extends React.Component<Props> {
    componentWillMount(): void {
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id');
        console.log("place_id", place_id);
        this.props.fetchPlaceDetails(place_id);
    }

    render() {
        // @ts-ignore
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id');
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

const mapStateToProps = (state) => ({
    isFetching: getPlaceDetails(state),
    data: getPlaceDetailsSuccess(state),
    error: getPlaceDetailsFailure(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPlaceDetails: fetch_place_details
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailsScreen)