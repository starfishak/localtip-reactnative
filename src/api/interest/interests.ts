import {AsyncStorage} from 'react-native';
import Categories from "./categories";

/**
 * Checks if a user is new, i.e. is user never opened app before
 * @return boolean if the user is new
 */
export function newUser() {
    // checks if user is new
    return AsyncStorage.getAllKeys().then(
        res => {
            console.log(res)
            // return !(length(res) > 0);
        }
    )
}


export function initUser() {
    for (let category in Categories) {
        console.log("Setting", category);
        AsyncStorage.setItem(Categories[category].id, Categories[category])
    }
}

export async function getPreferenceList() {
    await initUser();
    const preference_list = [];

    console.log(AsyncStorage);

     return AsyncStorage.getAllKeys((err, keys) => {
        console.log(keys);
        AsyncStorage.multiGet(keys, (err, stores) => {
            stores.map((result, i, store) => {
                let key = result[i][0];
                console.log(key)
                let value = result[i][1];
                preference_list.push(value);
            });
        }).then(
            (res) => {
                console.log("res,",res);
                return preference_list
            }
        );
    });
}


