import {FETCH_PLACES_FAILURE, FETCH_PLACES_SUCCESS, FETCHING_PLACES} from "../../constants";

export function getPlaces() {
    return {
        type: FETCHING_PLACES,
        isFetching: true
    }
}

export function getPlacesSuccess(data) {
    return {
        type: FETCH_PLACES_SUCCESS,
        data: data
    }
}

export function getPlacesFailure(error) {
    return {
        type: FETCH_PLACES_FAILURE
    }
}