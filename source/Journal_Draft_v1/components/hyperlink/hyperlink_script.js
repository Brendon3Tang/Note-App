function gotoPage () {
  let input = document.querySelector('input')
  let url = input.value
  if (!url.match(/^https?:\/\//i)) {
    url = 'http://' + url
  }
  window.open(url, '_blank').focus()
}

async function getData () {
  const inputField = document.querySelector('input')
  const textField = document.querySelector('textarea')
  return [inputField.value, textField.value]
}

async function setData (data) {
  const inputField = document.querySelector('input')
  const textField = document.querySelector('textarea')
  inputField.value = data[0]
  textField.value = data[1]
  document.body.className = 'color-' + parent.parent.main_theme
}
