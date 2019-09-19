import React from "react";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Dimensions,
    FlatList,
    WebView,
    TouchableOpacity,
    StatusBar
} from "react-native";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';
import {colors} from "../../styles/theme";
import {Card} from "react-native-elements";

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
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            title: navigation.getParam('place_title'),
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
            headerRight: (
                <Button
                    onPress={() => alert('This is a button!')}
                    title="Info"
                    color="#2A5E8D"
                />
            ),
            // headerLeft: (
            //     <Button
            //         onPress={() => setTimeout(navigation.goBack, 0)}
            //         title="Back"
            //         color="#2A5E8D"
            //     />
            // )
        };
    };

        // static navigationOptions = ({ navigation }) => {
    //     return {
    //         title: navigation.getParam('place_title'),
    //         headerTitleStyle: {
    //             fontWeight: 'bold',
    //             fontFamily: 'sans-serif-light'
    //         },
    //         // headerLeft: <TouchableOpacity onPress={() => navigation.goBack(null)}><Image source={require('./close.png')} style={{marginTop: 10, marginLeft:10}} /></TouchableOpacity>
    //     };
    // };

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
            // Render Other Components
            let phone_element = null;
            let website_element = null;
            let hours_element = null;
            // if (data.contacts.length > 0) {
            if (data.contacts.hasOwnProperty('phone')) {
                phone_element = <Card title={data.contacts.phone[0].value} style={styles.contact_card}><View><Text>{data.contacts.phone[0].value}</Text></View></Card>;
            }
            if (data.contacts.hasOwnProperty('website')) {
                website_element = <Card title={data.contacts.website[0].value} style={styles.contact_card}><View><Text>{data.contacts.website[0].value}</Text></View></Card>;
            }
            // }
            if (data.hasOwnProperty('extended')) {
                if(data.extended.hasOwnProperty('openingHours')) {
                    hours_element = <Card><WebView source={{html: `${data.extended.openingHours.text}`}} /></Card>;
                }
            }
            return (
                <View style={styles.container}>
                    <StatusBar style={styles.status_bar}></StatusBar>
                    <Image
                        source={{uri:data.image}}
                        style={styles.image}
                        PlaceholderContent={<ActivityIndicator/>}
                    />
                    <View style={styles.text_container}>
                        <Text style={styles.place_title}>{data['name']}</Text>
                        {data['categories'].map(item => <Text key={item.id} style={styles.place_category}>{item.title}</Text>)}
                        {/*<Card><WebView source={{html: `${data.location.address.text}`}} /></Card>*/}
                        {phone_element}
                        {website_element}
                        {/*{hours_element}*/}
                    </View>
                </View>
            );
        }
    };
}

const win = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    status_bar: {
        height: 0,
        marginTop: 0,
        paddingTop: 10,
        paddingBottom: 30,
    },
    contact_card: {
        elevation:0
    },
    image: {
        width: win.width,
        height: 250,
    },
    text_container: {
        flex: 1,
        paddingRight: 10,
        paddingLeft: 10
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
        lineHeight: 12,
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