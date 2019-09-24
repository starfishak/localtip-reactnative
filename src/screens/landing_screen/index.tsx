import React from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    View,
    Animated,
    Platform,
    RefreshControl,
    StatusBar,
    Text, Dimensions
} from "react-native";
import PlaceCard from "../../components/landing/place_card";
import fetch_places from '../../api/here/fetch_places';
import { getPlaces, getPlacesSuccess, getPlacesError } from '../../redux/reducers'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RNChipView } from 'react-native-chip-view'


/*
    Sources: Animated scroll header from Janic Duplessis
    https://medium.com/appandflow/react-native-scrollview-animated-header-10a18cb9469e
*/

type Props = { fetchPlaces : Function, navigation : Navigator, data: Object, isFetching : boolean };
type Data = {results : any}
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;



class LandingScreen extends React.Component<Props> {
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            title: navigation.getParam('place_title'),
            headerRight: (
                <Icon
                onPress={() => navigation.navigate('Interests')}
                name="person"
                color="#fff"
                size={30}
                />
             )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            scrollY: new Animated.Value(
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false
        };
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coords = position.coords.latitude + ',' + position.coords.longitude;
                this.props.fetchPlaces(coords,"3000");
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }

    /**
     * Refresh method for getting new location and
     * @private
     */
    _refresh() {
        this.forceUpdate();
    }

    _renderPlacesList(props) {
        const navigation = props.navigation;
        const data = props.data;
        type Item = {
            id : string
        }
        return (
            <View style={styles.scrollViewContent}>
                <FlatList
                    data={data.results.items}
                    renderItem={({ item }) => <PlaceCard place_data={item} navigation={navigation} />}
                    keyExtractor={(item : Item) => item.id}
                />
            </View>
        )
    }

    _renderFilterChips() {
        return(
            <RNChipView
                title={'Filter'}
                onPress={() => {alert('Works!')}}
                // avatar={<Icon
                //     name="person"
                //     color="#fff"
                // />}
            />
        )
    }

    render() {
        // @ts-ignore
        const {isFetching, data, navigation} = this.props;
        console.log("isFetching: ", isFetching);
        if(isFetching) {
            return(
                <View style={{flex: 1, flexDirplacesReducerection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator size={'large'} />
                </View>
            )
        }
        else {
            console.log("Data success. returning flatlist.")
            const scrollY = Animated.add(
                this.state.scrollY,
                Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
            );
            const headerTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, -HEADER_SCROLL_DISTANCE],
                extrapolate: 'clamp',
            });

            const imageOpacity = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [1, 1, 0],
                extrapolate: 'clamp',
            });
            const imageTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE],
                outputRange: [0, 100],
                extrapolate: 'clamp',
            });

            const titleScale = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [1, 1, 0.8],
                extrapolate: 'clamp',
            });
            const titleTranslate = scrollY.interpolate({
                inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
                outputRange: [0, 0, -8],
                extrapolate: 'clamp',
            });
            return(
                <View style={styles.fill}>
                    <StatusBar
                        translucent
                        barStyle="light-content"
                        backgroundColor="rgba(0, 0, 0, 0.251)"
                    />
                    <Animated.ScrollView
                        style={styles.fill}
                        scrollEventThrottle={1}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                            { useNativeDriver: true },
                        )}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={() => {
                                    this.setState({ refreshing: true });
                                    this._refresh();
                                    setTimeout(() => this.setState({ refreshing: false }), 1000);
                                }}
                                // Android offset for RefreshControl
                                progressViewOffset={HEADER_MAX_HEIGHT}
                            />
                        }
                    >
                        {this._renderPlacesList(this.props)}
                    </Animated.ScrollView>
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.header,
                            { transform: [{ translateY: headerTranslate }] },
                        ]}
                    >
                        <Animated.Image
                            style={[
                                styles.backgroundImage,
                                {
                                    opacity: imageOpacity,
                                    transform: [{ translateY: imageTranslate }],
                                },
                            ]}
                            source={{uri:data.header_image.url}}
                        />
                    </Animated.View>
                    <Animated.View
                        style={[
                            styles.bar,
                            {
                                transform: [
                                    { scale: titleScale },
                                    { translateY: titleTranslate },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.title}>{data.search.context.location.address.district}</Text>
                        <Text style={styles.city_title}>{data.search.context.location.address.city}</Text>
                    </Animated.View>
                </View>
            )
        }
    };
}

const styles = StyleSheet.create({
    fill: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#2A5E8D',
        overflow: 'hidden',
        height: HEADER_MAX_HEIGHT,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        width: null,
        height: HEADER_MAX_HEIGHT,
        resizeMode: 'cover',
    },
    bar: {
        backgroundColor: 'transparent',
        marginTop: Platform.OS === 'ios' ? 28 : 38,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    city_title: {
        color: 'white',
        fontSize: 18,
        marginBottom: 10
    },
    scrollViewContent: {
        // iOS uses content inset, which acts like padding.
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        width: (Dimensions.get('window').width)
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
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
