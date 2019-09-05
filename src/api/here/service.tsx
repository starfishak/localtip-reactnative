import React, { Component } from 'react';

import Here from './config';
import {FlatList, View} from 'react-native';
import PlaceCard from "../../components/landing/place/place_card";

export default class PlacesService extends Component {
    state = {
        data: [],
        page: 1,
        loading: true,
        error: null
    };

    componentDidMount() {
        this._fetchPlaces();
    }

    _fetchPlaces = () => {
        const {page} = this.state;
        // const URL = `?app_code=${Here.apiCode}&app_id=${Here.apiKey}&in=${encodeURI(location)};r=${search_radius}&pretty=true&cat=${query}`;
        const URL = `?app_code=${Here.apiCode}&app_id=${Here.apiKey}&in=-41.2993048,174.7732759;r=2000&pretty=true`;

        Here
            .request({
                url: URL,
                method: 'GET'
            })
            .then(response => {
                this.setState((prevState, nextProps) => ({
                    data:
                        page === 1
                            ? Array.from(response.results.items)
                            : [...this.state.data, ...response.results.items],
                    loading: false
                }));
            })
            .catch(error => {
                this.setState({error, loading: false});
            });
    };
}