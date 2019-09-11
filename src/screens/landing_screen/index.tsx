import React, {Props} from "react";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import PlaceCard from "../../components/landing/place/place_card";
import fetch_places from '../../api/here/fetch_places';
import { getPlaces, getPlacesSuccess, getPlacesError } from '../../redux/reducers/places'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

type Props = { fetchPlaces : Function, navigation : Navigator, data: Object, isFetching : boolean };

class LandingScreen extends React.Component<Props> {

    constructor(props) {
        super(props);
        // this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        console.log("about to fetch");
        this.props.fetchPlaces("-41.2907079,174.771661","1000");
    }

    // shouldComponentRender() {
    //     const fetchPlaces = this.props;
    //     return fetchPlaces !== false;
    // }

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
            console.log("Data success. returning flatlist")
            type Item = {
                id : string
            }

            return(
                <FlatList
                    data={data.results.items}
                    renderItem={({ item }) => <PlaceCard place_data={item} navigation={this.props.navigation} />}
                    keyExtractor={(item : Item) => item.id}
                />
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
