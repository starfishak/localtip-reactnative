import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ActivityIndicator,
    Dimensions,
    Linking,
    Platform,
    ScrollView,
} from "react-native";
import {Card, ListItem} from "react-native-elements";
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsError} from "../../redux/reducers";
import {bindActionCreators} from "redux";
import fetch_place_details from "../../api/here/fetch_place_details";
import { connect } from 'react-redux';
import {colors} from "../../styles/theme";
import Icon from 'react-native-vector-icons/MaterialIcons';
import FAB from 'react-native-fab'


type Props = {
    navigation : any,
    fetchPlaceDetails : Function
    data: Object,
    image: string,
    isFetching : boolean
};

// type Data = {
//     data: object,
//     image : string
//     isFetching: boolean,
//     error: any
// }

class PlaceDetailsScreen extends React.Component<Props> {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            title: navigation.getParam('place_title'),
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,

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
    };


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

    _open_navigation = (position) => {
        let url = "https://www.google.com/maps/search/?api=1&query=" + position[0] + ',' + position[1];
        this._openUrl(url);
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
            let transit_departing = null;
            console.log("Data: ",data.extended);
            if (data.hasOwnProperty('contacts')) {
                // If location has phone number
                if (data.contacts.hasOwnProperty('phone')) {
                    phone_element = <ListItem
                        title={data.contacts.phone[0].value}
                                              leftElement={<Icon name="call" size={20} color="#2A5E8D"/>}
                                              onPress={() => {
                                                  this._dialCall(data.contacts.phone[0].value)
                                              }}><Text>{data.contacts.phone[0].value}</Text></ListItem>
                }
                // If location has website
                if (data.contacts.hasOwnProperty('website')) {
                    website_element = <ListItem
                        title={data.contacts.website[0].value}
                                                leftElement={<Icon name="web" size={20} color="#2A5E8D"/>}
                                                onPress={() => {
                                                    this._openUrl(data.contacts.website[0].value)
                                                }}><Text>{data.contacts.website[0].value}</Text></ListItem>
                }
            }

            // Create Address Card
            const address_str = data.location.address.street + ', ' + data.location.address.city + ' ' + data.location.address.postalCode;
            let address_element = <ListItem
                                    title={address_str}
                                    leftElement={<Icon name="directions" size={20} color="#2A5E8D"/>}
                                    onPress={() => {this._open_navigation(data.location.position)}}><Text>{address_str}</Text></ListItem>;

            // Transit
            if (data.isTransit) {
                transit_departing = <Text style={styles.place_title}>Departing Soon</Text>
            }

            return (
                <View style={styles.container}>
                    <ScrollView>
                        <View>
                            <Image
                                source={{uri:data.image}}
                                style={styles.image}
                                PlaceholderContent={<ActivityIndicator/>}
                            />
                            <FAB buttonColor="#2A5E8D" iconTextColor="white" onClickAction={() => {this._open_navigation(data.location.position)}} visible={true} iconTextComponent={<Icon name="directions"/>} />
                        </View>
                        <View style={styles.text_container}>
                            <Text style={styles.place_title}>{data['name']}</Text>
                            {data['categories'].map(item => <Text key={item.id} style={styles.place_category}>{item.title}</Text>)}
                            {address_element}
                            {phone_element}
                            {website_element}
                            {transit_departing}
                            {
                                data['departures'].map((item) => (
                                    <ListItem title={item.direction}
                                              subtitle={'Line ' + item.line}
                                              rightElement={<Text>{item.time}</Text>}
                                    />
                                ))
                            }
                            <Text style={styles.place_title}>Recommended Nearby</Text>
                                {
                                    data['nearby'].map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={item.title}
                                            subtitle={item.category.title + ' | ' + item.distance + ' m'}
                                            onPress={() => {
                                                navigation.push('Details',
                                                    {id: item.id, place_title:item.title})
                                            }}
                                            rightIcon={
                                                <Icon name="play-arrow" color="#2A5E8D" />
                                            }
                                        />
                                    ))
                                }
                            <Text style={styles.place_title}>Transit Nearby</Text>
                                {
                                    data['transit'].map((item) => (
                                        <ListItem
                                            key={item.id}
                                            title={item.title}
                                            subtitle={item.category.title + ' | ' + item.distance + ' m'}
                                            onPress={() => {
                                                navigation.push('Details',
                                                    {id: item.id, place_title:item.title})
                                            }}
                                            rightIcon={
                                                <Icon name="play-arrow" color="#2A5E8D" />
                                            }
                                        />
                                    ))
                                }
                        </View>
                    </ScrollView>
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
    },
    nearby_card : {
        elevation:0,
        width: win.width
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