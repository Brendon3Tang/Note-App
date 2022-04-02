async function getData () {
  const inputField = document.querySelector('input')
  return inputField.value
}

async function setData (data) {
  const inputField = document.querySelector('input')
  inputField.value = data
  happiness(data)
}
