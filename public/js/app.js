// console.log('Client side javascript file is loaded!')

const form_element = document.querySelector('form')
const place_location = document.querySelector('#place_location')
const weather_details = document.querySelector('#weather_details')
const weather_img = document.querySelector('#weather_img')

form_element.addEventListener('submit', (event) => {
    event.preventDefault();
    // console.log("form submit")

    place_location.textContent = 'seaching';
    const input = document.getElementById('searchtxt').value; //document.querySelector('input')
    // console.log(input)
    // if (input) {
    fetch('/weather?area=' + input).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    console.log(data.error)

                    place_location.textContent = 'location can not fetch '

                } else {
                    // response = JSON.parse(JSON.stringify(data))
                    // console.log(response.body.geo_location)
                    // console.log(JSON.parse(response))

                    // console.log(data)
                    // console.log(response.img)

                    place_location.textContent = data.body.geo_location
                    weather_details.textContent = data.body.current
                    weather_img.src = data.body.img;
                    // console.log((data.geo_location))
                    // console.log(JSON.stringify(data.current))
                    // console.log(JSON.stringify(data.img))
                    // console.log(JSON.stringify(data))
                }
            })
        })
        // }

})