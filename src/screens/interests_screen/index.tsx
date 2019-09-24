import React from "react";
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, View} from "react-native";
import InterestCard from "../../components/interests/interest_card";
import {getPreferenceList, newUser, initUser} from "../../api/interest/interests"

class InterestsScreen extends React.Component {

    async _renderInterestList(props) {
        const navigation = props.navigation;
        let data = [];
        // newUser().then(
        //     async res => {
        //         if (res) {
        //             console.log("New User");
        //             await initUser()
        //         }
        //     }
        // ).then(
        //     async res => {
        //         console.log("getting data");
        //         data = await getPreferenceList();
        //     }
        // );

        data = await getPreferenceList().then(
            res => {
                console.log("res2",res);
            }
        );

        type Item = {
            id : string,
            image : string,
            title : string,
            photographer : string,
            active : boolean
        }
        return (
            <View style={styles.scrollViewContent}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => <InterestCard data={item}/>}
                    keyExtractor={(item : Item) => item.id}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    render() {
        const {navigation: navigation} = this.props;
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this._renderInterestList(this.props)}
                </ScrollView>
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
    scrollViewContent : {
        width: (Dimensions.get('window').width)
    }
});

export default InterestsScreen;