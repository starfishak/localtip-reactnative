import Cred from './cred'
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsFailure} from "../../redux/actions";

export function fetch_place_info(place_id : string ) {
    return (dispatch) => {
        dispatch(getPlaceDetails());
        console.log(`https://places.cit.api.here.com/places/v1/places/lookup?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing&id=${place_id}`)
        fetch(`https://places.cit.api.here.com/places/v1/places/lookup?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing&id=${place_id}`)
            .then(res => res.json())
            .then(async json => {
                console.log("Fetch_place_details success");
                const image = await get_place_map(json.location.position);
                console.log('***IMAGE: ', image);
                json.image = image;
                return (dispatch(getPlaceDetailsSuccess(json)))
            })
            .catch(err => dispatch(getPlaceDetailsFailure(err)))
    }
}

export function get_place_map(location : string) {
    const locationString = location[0] + "," +location[1] + '';
    return `https://image.maps.api.here.com/mia/1.6/mapview?c=${locationString}&z=16&app_id=${Cred.apiKey}&app_code=${Cred.apiCode}`;
}

export default fetch_place_info;