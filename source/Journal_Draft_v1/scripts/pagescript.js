var objlist = []
let counter = 0
// Examples:
function moodbar () {
  const obj = addobj('moodbar', '110px')
}
function link () {
  const obj = addobj('hyperlink', '180px')
}
function map () {
  const obj = addobj('map', '400px')
}
function todo () {
  const obj = addobj('todo', '180px')
}
function picture () {
  const obj = addobj('picture', '400px')
}
function textbox () {
  const obj = addobj('textbox', '220px')
}

// For testing purposes:
try {
  module.exports = {
    addobj,
    createComp,
    getObjlist,
    getCounter,
    moveUp,
    moveDown,
    removeComp,
    reset
  }
} catch {
  console.log('Modules have been exported for testing.')
}
function getObjlist () {
  return objlist
}
function getCounter () {
  return counter
}

// Please Don't Change Codes Below
var checklist = 0

async function generateJSON () {
  const dict = {}
  dict.pagetitle = document.querySelector('.input-name > input').value
  dict['emoji-holder'] = document.getElementById('emoji-holder').value
  dict['component-order'] = []
  for (let i = 0; i < objlist.length; i++) {
    const idOfComp = objlist[i].id
    dict['component-order'].push(idOfComp)
    const heightOfComp = objlist[i].style.height
    let dataOfComp = await getDataFromObj(objlist[i])
    dict[idOfComp] = [heightOfComp, dataOfComp]
  }
  return dict
}

function loadJSON (dict) {
  loadingState(true)
  // reset objlist and clean container
  objlist = []
  document.getElementById('container').innerHTML = ''
  document.querySelector('.input-name > input').value = dict.pagetitle
  document.getElementById('emoji-holder').value = dict['emoji-holder']
  const list = dict['component-order']
  if (list.length == 0) loadingState(false)
  counter = 0
  checklist = 0
  for (let i = 0; i < list.length; i++) {
    const name = list[i].split('_')[0]
    const component = dict[list[i]]
    const obj = addobj(name, component[0])
    setDataToObj(obj, component[1])
  }
}

function getDataFromObj (obj) {
  const rst = obj.querySelector('.comp-iframe').contentWindow.getData()
  return rst
}

function setDataToObj (obj, data) {
  obj.querySelector('.comp-iframe').onload = function () {
    this.contentWindow.setData(data).then(() => {
      checklist++
      if (checklist == counter) {
        loadingState(false)
        checklist = 0
      }
    })
  }
}

function reset () {
  objlist = []
  counter = 0
  checklist = 0
  try {
    document.querySelector('.input-name > input').value = ''
    document.getElementById('emoji-holder').value = ''
    document.getElementById('container').innerHTML = ''
  } catch (err) {}
  addobj('textbox', '220px')
}

//change style of components:
function changeColors (colorName) {
  let allIframe = document.querySelectorAll('.comp-iframe')
  for (let iframe of allIframe) {
    iframe.contentWindow.document.body.className = colorName
  }
}

// purpose: instantiate template and add into the container
// name: name of the template
// return: the created object
function addobj (name, height) {
  if (name == 'todo') {
    for (let i = 0; i < objlist.length; i++) {
      if (objlist[i].id.includes('todo')) {
        alert('One TODO component in maximum!')
        return
      }
    }
  }
  const container = document.getElementById('container')
  let obj = createComp(name, height)
  try {
    container.appendChild(obj)
  } catch (err) {}
  ordering(obj)
  return obj
}
function createComp (name, height) {
  let comp = document.createElement('div')
  comp.id = name
  comp.className = 'component'
  comp.style.height = height
  comp.innerHTML =
    '<div class="up-down-delete"><div class="buttons"><div class="move-up" onclick="moveUp(this.parentElement.parentElement.parentElement)">&#8657;</div><div class="remove-component" onclick="removeComp(this.parentElement.parentElement.parentElement)">&#128465;</div><div class="move-down" onclick="moveDown(this.parentElement.parentElement.parentElement)">&#8659;</div></div></div><div class="content"></div>'
  let content = comp.querySelector('.content')
  content.innerHTML =
    '<iframe class="comp-iframe" src="components/' +
    name +
    '/' +
    name +
    '_iframe.htm" style="width: 100%;height:' +
    height +
    ';"></iframe>'
  return comp
}
// utility functions for addobj
function refreshID (obj) {
  obj.id = obj.id.split('_')[0] + '_' + obj.style.order
}
function ordering (obj) {
  obj.style.order = counter.toString()
  refreshID(obj)
  objlist.push(obj)
  counter++
}
function moveUp (obj) {
  let ord = obj.style.order
  if (ord == 0) return
  let prevobj = objlist[ord - 1]
  objlist[ord - 1] = obj
  objlist[ord] = prevobj
  prevobj.style.order++
  refreshID(prevobj)
  obj.style.order--
  refreshID(obj)
}

function moveDown (obj) {
  let ord = obj.style.order
  if (ord == counter - 1) return
  let nextObj = objlist[parseInt(ord) + 1]
  objlist[parseInt(ord) + 1] = obj
  objlist[ord] = nextObj
  nextObj.style.order--
  refreshID(nextObj)
  obj.style.order++
  refreshID(obj)
}

function removeComp (obj) {
  let ord = parseInt(obj.style.order) 
  let flag = false 
  try {
    if (obj.id.includes('todo')) { 
      flag = true 
      let date = parent.calendarTools.tools.dateToString(
        parent.calendar._now,
        'DD/MM/yyyy',
        'en'
      )
      let key = date
      delete parent.todoDict[key]
      parent.updateToDoMenuList(parent.todoDict)
    }
  } catch (err) {}
  for (let i = counter - 1; i >= 0; i--)
    if (parseInt(objlist[i].style.order) > parseInt(ord)) {
      objlist[i].style.order--
      refreshID(objlist[i])
    } else if (parseInt(objlist[i].style.order) == parseInt(ord))
      objlist.splice(i, 1)
  obj.remove()
  counter--
  try {
    if (flag) {
      parent.saveFunc() 
    }
  } catch (err) {}
}

function loadingState (isLoading) {
  let obj = document.getElementById('loading-state')
  if (isLoading) obj.className = 'loading'
  else obj.className = 'done'
}
