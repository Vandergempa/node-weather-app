const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')


weatherForm.addEventListener('submit', (e) => {

  e.preventDefault()
  messageOne.textContent = "Fetching data..."
  messageTwo.textContent = ""
  messageThree.textContent = ""

  fetch(`/weather?address=${input.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        messageOne.textContent = data.latLong
        messageTwo.textContent = data.location
        messageThree.textContent = data.forecast
      }
    })
  })
})