import {AsyncStorage} from 'react-native';
import Categories from "./categories";
import {getInterests, getInterestsSuccess, getInterestFailure} from "../../redux/actions";

/**
 * NB: This feature did not work as expected by the project deadline.
 * The code is here but has no effect on the final application.
 */

/**
 * Checks if a user is new, i.e. is user never opened app before
 * @return boolean if the user is new
 */
export function newUser() {
    // checks if user is new
    return AsyncStorage.getAllKeys().then(
        res => {
            console.log(res);
            return !(res.length > 0);
        }
    )
}

/**
 * Called if the user is new. Initiates the users preferences to the default settings.
 */
export function initUser() {
    let kv_pairs = [];
    for (let [key, value] of Object.entries(Categories)) {
        kv_pairs.push([key, value])
    }
    console.log(kv_pairs);
    AsyncStorage.multiSet(kv_pairs);
    console.log('init complete')
}

/**
 * Gets the users current known preferences and dispatches them to screen via redux
 */
export function getPreferenceList() {
    return async (dispatch) => {
        dispatch(getInterests());
        await initUser();
        const preference_list = [];
        console.log("in the then statement");
        Promise.all([
                AsyncStorage.getAllKeys()
                    .then(keys => {
                        console.log("keys", keys);
                            keys.map(key => {
                                console.log(key);
                                    AsyncStorage.getItem(key).then(
                                        value => {
                                            preference_list.push([key, value])
                                            console.log(preference_list)
                                        }
                                    )
                                }
                            )
                        }
                    )
            ]
        ).then(
            () => {return preference_list;}
        )
    }
}

export default getPreferenceList;

