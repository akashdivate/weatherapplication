const request = require('postman-request');

// weather call asper the lan and lat location
// weather_call(data, (error, data) => {
//     if (error) {
//         console.error('Error ', error)
//     } else {
//         console.log(data)
//     }
// })

const weather_token = 'db015b0346c57aa553ab92933ac0d3f4';

// using callback function

weather_call = (data, callback) => {
    weather_url = 'http://api.weatherstack.com/current?access_key=' + weather_token + '&query=' + data.langutude + ',' + data.latitude;
    request({ url: weather_url, json: true }, (error, data_weather) => {
        if (error) {
            callback('site can not reach ', undefined)
        } else {
            // location_data = data_weather.body.location.contry + ' region: ' + data_weather.body.location.contry + ' utc_offset:' + data_weather.body.location.utc_offset;
            current_data = 'Current Temperature: ' + data_weather.body.current.temperature + ' Weather Descriptions:' + data_weather.body.current.weather_descriptions;
            img = data_weather.body.current.weather_icons[0];
            callback(undefined, {
                // 'location': location_data,
                'current': current_data,
                'img': img,
                "geo_location": data.location
            })
        }
    })
}


area_name = process.argv[2] // encodeURIComponent() //('pune') ;
    // get area

module.exports = weather_call;