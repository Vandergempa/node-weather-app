const request = require('request')

const geocode = (address, callback) => {
  // EncodeURIComponent is to encode special characters. For example: ? becomes %3F.
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmFuZGVyZ2VtcGEiLCJhIjoiY2p5MWtibGkwMGRvNTNkbXE5aWVjdmt5cyJ9.SwBjZ83TWpIqHEo81AR8nA`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to location services!', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location! Try again with a different search term!', undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geocode