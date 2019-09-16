import {
    FETCHING_PLACES,
    FETCH_PLACES_FAILURE,
    FETCH_PLACES_SUCCESS,
    FETCHING_PLACE_DETAILS,
    FETCH_PLACE_DETAILS_SUCCESS,
    FETCH_PLACE_DETAILS_FAILURE
} from '../../constants';

const initialState = {
    data: {results:{items:[]}},
    isFetching: true,
    error: false
};

export default function placesReducer(state = initialState, action) {
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
        case FETCHING_PLACE_DETAILS:
            console.log("Fetching Reducers");
            return {
                ...state,
                isFetching: true
            };
        case FETCH_PLACE_DETAILS_SUCCESS:
            console.log("Success Reducers");
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

// function placeDetailsReducer(state = initialState, action) {
//     switch(action.type) {
//
//         default:
//             return state
//     }
// }

export const getPlaces = state => state.isFetching;
export const getPlacesSuccess = state => state.data;
export const getPlacesError = state => state.error;

export const getPlaceDetails = state => state.isFetching;
export const getPlaceDetailsSuccess= state => state.data;
export const getPlaceDetailsError = state => state.error;