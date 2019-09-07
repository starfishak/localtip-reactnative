import { FETCHING_PLACES, FETCH_PLACES_FAILURE, FETCH_PLACES_SUCCESS } from '../../constants';
import Cred from '../../api/here/cred'

export default function fetch_places(location : string, radius : string ) {

    return (dispatch) => {
        dispatch(getPlaces())

        return(fetch('https://places.cit.api.here.com/places/v1/browse/?app_code=' + Cred.apiCode + '&app_id=' + Cred.apiKey + '&in=' + location + 'r=' + radius + '&pretty=true'))
            .then(res => res.json())
            .then(json => {
                return(dispatch(getPlacesSuccess(json)))
            })
            .catch(err => dispatch(getPlacesFailure(err)))
    }
}

function getPlaces() {

    return {
        type: FETCHING_PLACES
    }
}

function getPlacesSuccess(data) {

    return {
        type: FETCH_PLACES_SUCCESS,
        data
    }
}

function getPlacesFailure(error) {
    return {
        type: FETCH_PLACES_FAILURE
    }
}