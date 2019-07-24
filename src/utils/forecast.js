const request = require('request')

const forecast = (latitude, longitude, callback) => {
  // EncodeURIComponent is to encode special characters. For example: ? becomes %3F.
  const url = `https://api.darksky.net/forecast/cd1b749c9cf4a8999f7f80055933e443/${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}?units=si&lang=en`

  // First argument is an options object, outlining what we'd like to do, the second is a function to run
  // when we have the response.
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const currently = body.currently
      callback(undefined,
        body.daily.data[0].summary + ` It is currently ${currently.temperature} degrees out in ${body.timezone}. There is a ${currently.precipProbability}% chance of rain.`)
    }
  })
}

module.exports = forecast
