import Unsplash from "./cred";

export function fetch_image(location : object, useCountryCode = false) {
    return new Promise(function(resolve, reject) {
        let query = location.city;
        if (useCountryCode) {
            query = location.country
        }
        console.log(query);
        console.log(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query.city}&client_id=${Unsplash.accessKey}&client_secret=${Unsplash.secretKey}`);
        fetch(`https://api.unsplash.com/search/photos?page=1&per_page=1&query=${query}&client_id=${Unsplash.accessKey}&client_secret=${Unsplash.secretKey}`)
            .then(res => res.json())
            .then(async json => {
                if (json.total == 0) {
                    return this.fetch_image(location, true);
                }
                const image_url = json.results[0].urls.regular;
                const photographer = json.results[0].user.name;
                console.log("Fetch Unsplash Image success");
                console.log('Unsplash Image: ', image_url);
                let header_image = {
                    url: '',
                    photographer: ''
                };
                header_image.url = image_url;
                header_image.photographer = photographer;
                return resolve(header_image);
            })
            .catch(
                // var reason : Error = new Error('GET Error');
                // reject(reason);
            )
    }
    )
}

export default fetch_image;