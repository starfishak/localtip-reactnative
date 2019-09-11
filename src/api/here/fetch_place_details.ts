import Cred from './cred'
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsFailure} from "../../redux/actions/actions";

export function fetch_place_info(place_id : string ) {
    return (dispatch) => {
        dispatch(getPlaceDetails());
        fetch(`https://places.cit.api.here.com/places/v1/places/lookup?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing&id=${place_id}`)
            .then(res => res.json())
            .then(json => {
                console.log("Fetch_place_details success")
                return (dispatch(getPlaceDetailsSuccess(json)))
            })
            .catch(err => dispatch(getPlaceDetailsFailure(err)))
    }
}

export default fetch_place_info;