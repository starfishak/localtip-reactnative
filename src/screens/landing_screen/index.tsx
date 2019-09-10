import React from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native";
import Greeting from '../../components/Greeting';
import PlaceCard from "../../components/landing/place/place_card";
import fetch_places from '../../redux/actions/fetch_places';
import { getPlaces, getPlacesSuccess, getPlacesError } from '../../redux/reducers/places'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LandingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        console.log("about to fetch");
        this.props.fetchPlaces("-41.2907079,174.771661","1000");
        // fetch_places();
    }

    shouldComponentRender() {
        const fetchPlaces = this.props;
        return fetchPlaces !== false;

    }

    render() {
        // @ts-ignore
        const {isFetching, data} = this.props;
        console.log("isFetching: ", isFetching);
        if(isFetching) {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }
        else {
            return(
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Text>{data.search.context.location.address.text}</Text>
                </View>
            )
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
    isFetching: getPlaces(state),
    data: getPlacesSuccess(state),
    error: getPlacesError(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchPlaces: fetch_places
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
