// Close button
const nodeList = document.getElementsByTagName('LI')
for (let i = 0; i < nodeList.length; i++) {
  const span = document.createElement('SPAN')
  const closeBtn = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(closeBtn)
  nodeList[i].appendChild(span)
}

const close = document.getElementsByClassName('close')
for (let i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    const div = this.parentElement
    div.parentNode.removeChild(div)
  }
}

// Check after a task is done
const list = document.querySelector('ul')
list.addEventListener(
  'click',
  function (ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('done')
    }
  },
  false
)

// Create a new task
function newElement () {
  const parentNode = document.getElementById('parent')
  const childNode = document.getElementById('inputValue')
  const li = document.createElement('li')
  const myInput = document.getElementById('inputValue').value
  const txtNode = document.createTextNode(myInput)

  li.appendChild(txtNode)
  if (myInput === '') {
    alert('The input is empty!')
  } else {
    parentNode.insertBefore(li, childNode)
  }

  document.getElementById('inputValue').value = ''
  const span = document.createElement('SPAN')
  const closeBtn = document.createTextNode('\u00D7')
  span.className = 'close'
  span.appendChild(closeBtn)
  li.appendChild(span)

  for (let i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      const div = this.parentElement
      div.parentNode.removeChild(div)
    }
  }
}

async function getData () {
  const inputField = document.getElementsByTagName('li')
  const inputValue = []
  for (let i = 0; i < inputField.length; i++) {
    inputValue.push(inputField[i].firstChild.textContent)
    inputValue.push(inputField[i].className)
  }
  return inputValue
}

async function setData (data) {
  const parentNode = document.getElementById('parent')
  let childs = parentNode.getElementsByTagName('li')
  for (let i = childs.length - 1; i >= 0; i--) {
    parentNode.removeChild(childs[i])
  }

  const childNode = document.getElementById('inputValue')

  for (let i = 0; i < data.length / 2; i++) {
    const li = document.createElement('li')
    li.className = data[2 * i + 1]
    const myInput = data[2 * i]
    const txtNode = document.createTextNode(myInput)

    li.appendChild(txtNode)
    if (myInput === '') {
      alert('The input is empty!')
    } else {
      parentNode.insertBefore(li, childNode)
    }

    document.getElementById('inputValue').value = ''
    const span = document.createElement('span')
    const closeBtn = document.createTextNode('\u00D7')
    span.className = 'close'
    span.appendChild(closeBtn)
    li.appendChild(span)

    for (let j = 0; j < close.length; j++) {
      close[j].onclick = function () {
        const div = this.parentElement
        div.parentNode.removeChild(div)
      }
    }
  }
}
