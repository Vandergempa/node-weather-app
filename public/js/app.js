const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const locationButton = document.getElementById('locationbutton')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

const changeTextContentBefore = (e) => {
  e.preventDefault()
  messageOne.textContent = "Fetching data..."
  messageTwo.textContent = ""
  messageThree.textContent = ""
}

const changeTextContentAfter = (data) => {
  if (data.error) {
    messageOne.textContent = data.error
  } else {
    messageOne.textContent = data.latLong
    messageTwo.textContent = data.location
    messageThree.textContent = data.forecast
  }
}

weatherForm.addEventListener('submit', (e) => {

  changeTextContentBefore(e)

  fetch(`/weather?address=${input.value}`).then((response) => {
    response.json().then((data) => {
      changeTextContentAfter(data)
    })
  })
})

locationButton.addEventListener('click', (e) => {

  changeTextContentBefore(e)

  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    fetch(`/weather?latitude=${latitude}&longitude=${longitude}`).then((response) => {
      response.json().then((data) => {
        changeTextContentAfter(data)
      })
    })

  }, null, { enableHighAccuracy: true })
})