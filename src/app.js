const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// api calls
const weather_call = require("../src/utils/weather_api")
const geolocat = require('../src/utils/location_api')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Akash'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Akash '
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Akash'
    })
})

app.get('/weather', (req, res) => {
    // if (!req.query.address) {
    //     return res.send({
    //         error: 'You must provide an address!'
    //     })
    // }

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })

    if (req.query.area) {
        geolocat(req.query.area = 'pune', (error, data) => {
            if (!error) {
                weather_call(data, (weather_error, body) => {
                    if (!weather_error) {
                        // return body;
                        console.log(body.geo_location)
                        console.log(body.current)
                        console.log(body.img)
                        res.send({
                            title: 'weather',
                            area: 'pune',
                            body
                            // img : body.current.weather_icons[0],
                        })
                    }
                });
            }
        });
    } else {
        res.render({ 'error': ' location required ' })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.' + port)
})