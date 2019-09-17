import Cred from './cred'
import {getPlaces, getPlacesFailure, getPlacesSuccess} from "../../redux/actions";

export function fetch_places(location : string, radius : string) {
    return (dispatch) => {
        dispatch(getPlaces());
        console.log(`https://places.cit.api.here.com/places/v1/browse?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        fetch(`https://places.cit.api.here.com/places/v1/browse?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        .then(res => res.json())
        .then(json => {
            console.log("Fetch_places success")
            return (dispatch(getPlacesSuccess(json)))
        })
        .catch(err => dispatch(getPlacesFailure(err)))
    }
}

export default fetch_places;