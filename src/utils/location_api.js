// if (area_name) {
//     geolocat(area_name, (error, data) => {
//         if (error) {
//             console.error('Error ', error)
//         }
//     });

// } else {
//     console.error(' location required ')
// }

const request = require('postman-request');

const geo_token = 'pk.eyJ1IjoiZGV2ZWxvcGVyYWsyNCIsImEiOiJja284YTRraWYxMmJ2MnBxdmM4Mmp0eHgyIn0.nTwjOUwfqLVywAqtdguD4g';

geolocat = (area, callback) => {
    const map_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + area + '.json?access_token=' + geo_token + '&limit=1';
    request({ url: map_url, json: true }, (error, response) => {
        if (error) {
            callback(' Unable to connect to location Services!', undefined)
        } else if (response.body.features.length === 0) {
            callback(' Unable to find location. Try another search.', undefined)
        } else {
            var latitude = 0,
                langutude = 0;
            latitude = response.body.features[0].geometry.coordinates[0];
            langutude = response.body.features[0].geometry.coordinates[1];
            location = response.body.features[0].place_name;
            callback(undefined, { 'langutude': langutude, 'latitude': latitude, 'location': location });
        }

    })
}

module.exports = geolocat