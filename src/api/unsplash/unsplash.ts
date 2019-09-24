import Unsplash from "./cred";

/**
 * Recursive function to retrieve a location based image. Used on the homepage.
 *
 * @param location Position object containing users location details
 * @param useCountryCode default = false, if function recurses, the country code is used in the image query instead of the city
 */
export function fetch_image(location : object, useCountryCode = false) {
    return new Promise(function(resolve, reject) {
        // Define the query term, use city unless otherwise specified
        let query = location.city;
        if (useCountryCode) {
            query = location.country
        }

        // React native promise based fetch system
        fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query}&client_id=${Unsplash.accessKey}&client_secret=${Unsplash.secretKey}`)
            .then(res => res.json())
            .then(async json => {
                // If there are no results, recurse and use country as query
                if (json.total == 0) {
                    return this.fetch_image(location, true);
                }

                // Get parameters from returned image object
                const image_url = json.results[0].urls.regular;
                const photographer = json.results[0].user.name;

                // Define custom object to be combined with the data payload returned to the screen
                let header_image = {
                    url: '',
                    photographer: ''
                };
                header_image.url = image_url;
                header_image.photographer = photographer;

                return resolve(header_image);
            })
    }
    )
}

export default fetch_image;