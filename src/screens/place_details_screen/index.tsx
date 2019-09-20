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
    StatusBar, Linking, Platform
} from "react-native";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';
import {colors} from "../../styles/theme";
import {Card} from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                    onPress={() => _openUrl('This is a button!')}
                    title="Navigate"
                    color="#2A5E8D"
                />
            ),
        };
    };

    componentWillMount() {
        const {navigation: navigation} = this.props;
        const place_id = navigation.getParam('id');
        console.log("place_id", place_id);
        this.props.fetchPlaceDetails(place_id);
        this.render();
    }

    _openUrl = (url) => {
        Linking.canOpenURL(url)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle url: " + url);
                } else {
                    return Linking.openURL(url);
                }
            })
            .catch((err) => console.error('An error occurred', err));
    }


    _dialCall = (phone) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${phone}`;
        }
        else {
            phoneNumber = `telprompt:${phone}`;
        }

        Linking.openURL(phoneNumber);
    };

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
            if (data.contacts.hasOwnProperty('phone')) {
                let phone = data.contacts.phone[0].value
                phone_element = <View><TouchableOpacity onPress={() => {this._dialCall(phone)}}><Card style={styles.contact_card}><View style={styles.data_container}><Icon name="call" size={20} color="#2A5E8D" style={styles.data_icon}/><Text>{data.contacts.phone[0].value}</Text></View></Card></TouchableOpacity></View>;
            }
            if (data.contacts.hasOwnProperty('website')) {
                let url = data.contacts.website[0].value;
                website_element = <View><TouchableOpacity onPress={() => {this._openUrl(url)}}><Card style={styles.contact_card}><View style={styles.data_container}><Icon name="web" size={20} color="#2A5E8D" style={styles.data_icon}/><Text>{data.contacts.website[0].value}</Text></View></Card></TouchableOpacity></View>;

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
                        {phone_element}
                        {website_element}
\                    </View>
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
        elevation:0,
        backgroundColor:'#123',
    },
    data_icon: {
        paddingRight: 10
    },
    data_container: {
        flexDirection: 'row'
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