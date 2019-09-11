import {FETCH_PLACES_FAILURE, FETCH_PLACES_SUCCESS, FETCHING_PLACES, FETCHING_PLACE_DETAILS, FETCH_PLACE_DETAILS_SUCCESS, FETCH_PLACE_DETAILS_FAILURE} from "../../constants";

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
        type: FETCH_PLACES_FAILURE,
        error: error
    }
}

export function getPlaceDetails() {
    return {
        type: FETCHING_PLACE_DETAILS,
        isFetching: true
    }
}

export function getPlaceDetailsSuccess(data) {
    return {
        type: FETCH_PLACE_DETAILS_SUCCESS,
        data: data
    }
}

export function getPlaceDetailsFailure(error) {
    return {
        type: FETCH_PLACE_DETAILS_FAILURE,
        error: error
    }
}