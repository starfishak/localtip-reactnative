import {
    FETCHING_PLACES,
    FETCH_PLACES_FAILURE,
    FETCH_PLACES_SUCCESS,
    FETCHING_PLACE_DETAILS,
    FETCH_PLACE_DETAILS_SUCCESS,
    FETCH_PLACE_DETAILS_FAILURE
} from '../constants';

const initialState = {
    landing : {
        data: {},
        isFetching: true,
        error: false
    },
    details : {
        data: {},
        isFetching: true,
        error: false
    }
};

function placesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCHING_PLACES:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PLACES_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case FETCH_PLACES_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

function placeDetailsReducer(state = initialState, action) {
    switch(action.type) {
        case FETCHING_PLACE_DETAILS:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PLACE_DETAILS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.data
            };
        case FETCH_PLACE_DETAILS_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            };
        default:
            return state
    }
}

export default function localtipReducer(state = initialState, action) {
    return {
        landing: placesReducer(state.landing, action),
        details: placeDetailsReducer(state.details, action)
    }
}

export const getPlaces = state => state.landing.isFetching;
export const getPlacesSuccess = state => state.landing.data;
export const getPlacesError = state => state.landing.error;

export const getPlaceDetails = state => state.details.isFetching;
export const getPlaceDetailsSuccess= state => state.details.data;
export const getPlaceDetailsError = state => state.details.error;