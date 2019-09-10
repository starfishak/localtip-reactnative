import Cred from '../../api/here/cred'
import {getPlaces, getPlacesFailure, getPlacesSuccess} from "./actions";

export function fetch_places(location : string, radius : string ) {
    return (dispatch) => {
        dispatch(getPlaces());
        fetch(`https://places.cit.api.here.com/places/v1/browse/?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        .then(res => res.json())
        .then(json => {
            console.log("Fetch_places success")
            return (dispatch(getPlacesSuccess(json)))
        })
        .catch(err => dispatch(getPlacesFailure(err)))
    }
}

export default fetch_places;