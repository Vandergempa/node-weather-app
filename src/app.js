const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const path = require('path');
const hbs = require('hbs')

const app = express()
const publicPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');
const port = process.env.PORT || 3000;

// Used to set up a key and value pair for a given express setting
// We are setting up handlebars here:
app.set('view engine', 'hbs')
// In case we would like to change the views directory:
app.set('views', viewsPath)
// Setting up partials:
hbs.registerPartials(partialsPath)

// Serving up static directory:
app.use(express.static(publicPath))

// Render is used to render views (first argument is the name of the file in the views folder,
// second is an object containing the values we want that view to be able to access)
app.get('', (req, res) => {
  res.render('index', {
    message: 'Use this website to get your weather!',
    title: 'Weather App',
    name: 'Tom B'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    message: 'Some info about myself',
    title: 'About Me',
    name: 'Tom B'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Contact me if you have any questions!',
    title: 'Help',
    name: 'Tom B'
  })
})

// app.get('*', (req, res) => {
//   res.sendFile(path.join(publicPath, 'index.html'));
// });

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    res.send({
      error: 'You must provide an address!'
    })
  } else {

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }

        res.send({
          latLong: `Latitude/longitude: ${latitude}/${longitude}`,
          forecast: forecastData,
          location: location,
          address: req.query.address
        })
      })
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found!'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found!'
  })
})

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`)
})
