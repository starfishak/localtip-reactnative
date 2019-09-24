import {
    FETCH_PLACES_FAILURE,
    FETCH_PLACES_SUCCESS,
    FETCHING_PLACES,
    FETCHING_PLACE_DETAILS,
    FETCH_PLACE_DETAILS_SUCCESS,
    FETCH_PLACE_DETAILS_FAILURE,
    FETCH_INTERESTS,
    FETCH_INTERESTS_SUCCESS,
    FETCH_INTERESTS_FAILURE
} from "../constants";

/**
 * Redux Actions, 9 actions for each API element: places, places-details, and interests
 */

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
        data: data,
        isFetching: false
    }
}

export function getPlaceDetailsFailure(error) {
    return {
        type: FETCH_PLACE_DETAILS_FAILURE,
        error: error
    }
}

export function getInterests() {
    return {
        type: FETCH_INTERESTS,
        isFetching: true
    }
}

export function getInterestsSuccess(data) {
    return {
        type: FETCH_INTERESTS_SUCCESS,
        data: data,
        isFetching: false
    }
}

export function getInterestFailure(error) {
    return {
        type: FETCH_INTERESTS_FAILURE,
        error: error
    }
}