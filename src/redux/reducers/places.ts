import { FETCHING_PLACES, FETCH_PLACES_FAILURE, FETCH_PLACES_SUCCESS } from '../../constants';

const initialState = {
    data: {},
    isFetching: true,
    error: false
};

export default function placesReducer(state = initialState, action) {
    switch(action.type) {
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

export const getPlaces = state => state.isFetching;
export const getPlacesSuccess = state => state.data;
export const getPlacesError = state => state.error;