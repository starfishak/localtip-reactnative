import React from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native";
import Greeting from '../../components/Greeting';
import PlaceCard from "../../components/landing/place/place_card";
import fetch_places from '../../redux/actions/fetch_places';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class LandingScreen extends React.Component {

    componentDidMount() {
        this.props.fetch_places("-41.2907079,174.771661","1000")
    }

    render() {
        const { data, isFetching } = this.props.data
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
                    <Text>data.results</Text>
                </View>
            )
        }

            {/*<View style={styles.container}>*/}
            {/*    <FlatList*/}
            {/*        contentContainerStyle={{*/}
            {/*            flex: 1,*/}
            {/*            flexDirection: 'column',*/}
            {/*            height: '100%',*/}
            {/*            width: '100%'*/}
            {/*        }}*/}
            {/*        data={this.state.data}*/}
            {/*        keyExtractvor={item => item.id.toString()}*/}
            {/*        renderItem={({ item }) => (*/}
            {/*            <View*/}
            {/*                style={{*/}
            {/*                    marginTop: 25,*/}
            {/*                    width: '50%'*/}
            {/*                }}*/}
            {/*            >*/}
            {/*                <PlaceCard name={item.title} place_address={item.vicinity} />*/}
            {/*            </View>*/}
            {/*        )}*/}
            {/*    />*/}
            {/*</View>*/}
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

export default LandingScreen;