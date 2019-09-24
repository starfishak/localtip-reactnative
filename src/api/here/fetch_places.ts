import Cred from './cred'
import {getPlaces, getPlacesFailure, getPlacesSuccess} from "../../redux/actions";
import fetch_image from '../unsplash/unsplash'

/**
 * Fetch Places is called from landing screen and retrieves a list of places nearby with consideration to a location and radius in meters
 * Calls Unsplash API "fetch_image" from ../unsplash/unsplash.ts file to retrieve the header image
 *
 * @param location string object with the following formatting: LAT,LOG
 * @param radius stringified number representing a radius in meters from the above position
 */
export function fetch_places(location : string, radius : string) {
    return (dispatch) => {
        dispatch(getPlaces());
        fetch(`https://places.cit.api.here.com/places/v1/discover/explore?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&in=${location};r=${radius}&pretty=true`)
        .then(res => res.json())
        .then(async json => {
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