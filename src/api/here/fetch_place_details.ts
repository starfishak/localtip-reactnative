import Cred from './cred'
import {getPlaceDetails, getPlaceDetailsSuccess, getPlaceDetailsFailure} from "../../redux/actions";
import {func} from "prop-types";

export function fetch_place_info(place_id : string ) {
    return (dispatch) => {
        dispatch(getPlaceDetails());
        console.log(place_id);
        console.log(`https://places.cit.api.here.com/places/v1/places/lookup?id=${place_id}&app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing`);
        fetch(`https://places.cit.api.here.com/places/v1/places/lookup?app_code=${Cred.apiCode}&app_id=${Cred.apiKey}&source=sharing&id=${place_id}`)
            .then(res => res.json())
            .then(async json => {
                console.log("Fetch_place_details success");
                const image = await get_place_map(json.location.position);
                const nearby_list = await get_nearby_places(json.related.recommended.href);
                json.isTransit = false;
                json.departures = [];
                if (json.related.hasOwnProperty('public-transport')) {
                    console.log("Prop exists");
                    json.transit = await get_transit_nearby(json.related['public-transport'].href);
                }
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
                json.image = image;
                json.nearby = nearby_list;
                return (dispatch(getPlaceDetailsSuccess(json)))
            })
            .catch(err => dispatch(getPlaceDetailsFailure(err)))
    }
}

export function get_place_map(location : string) {
    const locationString = location[0] + "," +location[1] + '';
    return `https://image.maps.api.here.com/mia/1.6/mapview?c=${locationString}&z=16&app_id=${Cred.apiKey}&app_code=${Cred.apiCode}`;
}

export function get_nearby_places(href: string) {
    return fetch(href)
        .then(res => res.json())
        .then(res => {
            return res.items
        })
}

export function get_transit_nearby(href: string) {
    return fetch(href)
        .then(res => res.json())
        .then(res => {
            return res.items
        })
}

export default fetch_place_info;