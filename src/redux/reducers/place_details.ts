import {FETCHING_PLACE_DETAILS, FETCH_PLACE_DETAILS_SUCCESS, FETCH_PLACE_DETAILS_FAILURE} from '../../constants';

const initialState = {
    data: {},
    isFetching: true,
    error: false
};

export default function placeDetailsReducer(state = initialState, action) {
    switch(action.type) {
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

export const getPlaceDetails = state => state.isFetching;
export const getPlaceDetailsSuccess= state => state.data;
export const getPlaceDetailsError = state => state.error;
