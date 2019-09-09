import React from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native";
import Greeting from '../../components/Greeting';
import PlaceCard from "../../components/landing/place/place_card";
import fetch_places from '../../redux/actions/fetch_places';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LandingScreen extends React.Component {

    componentDidMount() {
        console.log("made it here")
        let info = fetch_places("-41.2907079,174.771661","1000")
        console.log("INFO")
        console.log(info)
        this.setState(info)
    }

    render() {
        // console.log("props: ", this.props)
        const { data, isFetching } = this.props
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
                    <Text>{data}</Text>
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

function mapStateToProps(state) {
    return {
        data: state.data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        ...bindActionCreators({ fetch_places }, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
