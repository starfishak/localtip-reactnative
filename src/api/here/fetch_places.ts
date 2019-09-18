import Cred from './cred'
import {getPlaces, getPlacesFailure, getPlacesSuccess} from "../../redux/actions";
import fetch_image from '../unsplash/unsplash'

export function fetch_places(location : string, radius : string) {
    return (dispatch) => {
        dispatch(getPlaces());
        console.log(`https://places.cit.api.here.com/places/v1/browse?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        fetch(`https://places.cit.api.here.com/places/v1/browse?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        .then(res => res.json())
        .then(async json => {
            console.log("Fetch_places success");
            fetch_image(json.search.context.location.address)
                .then( image_res => {
                        console.log("made it here");
                        console.log(image_res);
                        json.header_image = image_res;
                        return (dispatch(getPlacesSuccess(json)))
                    }
                )
        })
        .catch(err => dispatch(getPlacesFailure(err)))
    }
}

export default fetch_places;