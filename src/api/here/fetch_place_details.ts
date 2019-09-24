import Cred from './cred'
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsFailure} from "../../redux/actions";

/**
 * Get place detials by provided ID, dispatch results to screens via Redux
 *
 * @param place_id HERE API place ID provided as navigation input into Places-Details screen
 */
export function fetch_place_info(place_id : string ) {
    return (dispatch) => {
        dispatch(getPlaceDetails());
        fetch(`https://places.cit.api.here.com/places/v1/places/lookup?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing&id=${place_id}`)
            .then(res => res.json())
            .then(async json => {
                // Get the map image
                const image = await get_place_map(json.location.position);

                // Get the nearby recommended places
                const nearby_list = await get_nearby_places(json.related.recommended.href);

                // Check if City has transit, if so, get nearby stops
                json.isTransit = false;
                json.departures = [];
                if (json.related.hasOwnProperty('public-transport')) {
                    json.transit = await get_transit_nearby(json.related['public-transport'].href);
                }

                // Check if the place is a transit stop. If so, get transit information, including departure times
                if (json.categories[0].id == 'public-transport') {
                    console.log("is public transit", json.extended);
                    if (json.hasOwnProperty("extended")) {
                        console.log("extended info", json.extended);
                        if (json.extended.hasOwnProperty("departures")) {
                            json.isTransit = true;
                            for (let dep of json.extended.departures.schedule.items) {
                                let dep_time = new Date(dep.scheduled.departure).toLocaleTimeString();
                                let line = {
                                    direction: dep.direction,
                                    line: dep.line,
                                    time: dep_time
                                };
                                json.departures.push(line)
                            }
                        }
                    }
                }

                // Store these values in data payload
                json.image = image;
                json.nearby = nearby_list;
                // Dispatch to redux actions
                return (dispatch(getPlaceDetailsSuccess(json)))
            })
            .catch(err => dispatch(getPlaceDetailsFailure(err)))
    }
}

/**
 * Gets a map image based on coordinates
 *
 * @param location position array in this form: [LAT, LONG]
 */
export function get_place_map(location : Object) {
    const locationString = location[0] + "," +location[1] + '';
    return `https://image.maps.api.here.com/mia/1.6/mapview?c=${locationString}&z=16&app_id=${Cred.apiKey}&app_code=${Cred.apiCode}`;
}

/**
 * Gets a list of nearby places. HERE API provides the URL to retrieve this information
 *
 * @param href url to retrieve information
 */
export function get_nearby_places(href: string) {
    return fetch(href)
        .then(res => res.json())
        .then(res => {
            return res.items
        })
}

/**
 * Gets a list of nearby transit stops
 *
 * @param href url to retrieve information
 */
export function get_transit_nearby(href: string) {
    return fetch(href)
        .then(res => res.json())
        .then(res => {
            return res.items
        })
}

export default fetch_place_info;