import React from "react";
import {ActivityIndicator, Dimensions, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import InterestCard from "../../components/interests/interest_card";
import getPrefList from "../../api/interest/interests"
import {
    getInterests,
    getInterestsError,
    getInterestsSuccess
} from "../../redux/reducers";
import {bindActionCreators} from "redux";
import { connect } from 'react-redux';

/**
 * NB: This screen did not work as expected by the project deadline.
 * More information is available under src/api/interests/interests.ts
 */

class InterestsScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Data retrieval from get Preference List in the Interest API
     */
    componentWillMount() {
        this.props.getPrefList()

    }

    /**
     * Screen Render Method
     */
    render() {
        // Type for expected card type and properties
        type Item = {
            id : string,
            image : string,
            title : string,
            photographer : string,
            active : boolean
        }

        const {data, isFetching} = this.props;
        // If loading, return spinner view
        if (isFetching) {
            return(
                <View style={styles.spinner}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <ScrollView>
                        <FlatList
                            data={data}
                            renderItem={(item) => <InterestCard data={item}/>}
                            keyExtractor={(item: Item) => item.id}
                            scrollEnabled={false}
                        />
                    </ScrollView>
                </View>
            );
        }
    };
}

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent : {
        width: (Dimensions.get('window').width)
    },
    spinner : {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

/**
 * Redux: Is called whenever the store updates with a new state
 * https://react-redux.js.org/using-react-redux/connect-mapstate
 * Used as a parameter in the connect method below
 *
 * @param state supplied from the store
 */
const mapStateToProps = (state) => ({
    isFetching: getInterests(state),
    data: getInterestsSuccess(state),
    error: getInterestsError(state)
});

/**
 * Redux: Method used to dispatch actions to the store
 * Used as a parameter in the connect method below
 * https://react-redux.js.org/using-react-redux/connect-mapdispatch
 *
 * @param dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    getPrefList: getPrefList
}, dispatch);

/**
 * Connect supplied via Redux
 */
export default connect(mapStateToProps, mapDispatchToProps)(InterestsScreen)
