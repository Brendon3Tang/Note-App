var todoDict = {}
let videoLoaded = false

var main_theme = ''
function changeColorsInPage (colorName) {
  document.querySelector('.pg').contentWindow.changeColors(colorName)
  setTheme('theme-' + colorName.split('-')[1])
  storeByTheme(colorName)
}

// code for navigation bar
window.onload = function () {
  displayAllKeys()
  let navigation = document.getElementById('nav')

  navigation.addEventListener('click', () => {
    document.getElementById('wrapper-display').style.display = 'grid'
    updateToDoMenuList(todoDict)
  })
  let hide_button = document.querySelector('.hide')
  hide_button.addEventListener('click', () => {
    document.getElementById('wrapper-display').style.display = 'none'
  })

  let help = document.getElementById('help')
  help.addEventListener('click', () => {
    openHelp()
  })

  let settings = document.getElementById('settings')
  settings.addEventListener('click', () => {
    openSettings()
  })
}

function openHelp () {
  document.getElementById('helpWindow').style.width = '100%'
  if(videoLoaded)
    return
  loadAllHelpVideos()
  videoLoaded = true
}

function closeHelp () {
  document.getElementById('helpWindow').style.width = '0%'
}

function closeSettings () {
  document.getElementById('settingsWindow').style.width = '0%'
}

function openSettings () {
  document.getElementById('settingsWindow').style.width = '100%'
}

function saveFunc () {
  document
    .querySelector('.pg')
    .contentWindow.generateJSON()
    .then(dict => {
      let date = jsCalendar.tools.dateToString(
        calendar._now,
        'DD/MM/yyyy',
        'en'
      )
      refreshInMenu(dict, date, 'save')

      storeByDate(date, dict)

      updateToDoMenuList(todoDict)
    })
}

function delFunc () {
  document
    .querySelector('.pg')
    .contentWindow.generateJSON()
    .then(dict => {
      let date = jsCalendar.tools.dateToString(
        calendar._now,
        'DD/MM/yyyy',
        'en'
      )
      refreshInMenu(dict, date, 'delete')

      deleteByDate(date)

      updateToDoMenuList(todoDict)
    })
}

function loadingState (isLoading) {
  document.querySelector('.pg').contentWindow.loadingState(isLoading)
}

function refreshInMenu (dict, date, status) {
  // get TODO components from dict
  // todoDict[key] = todo value
  const list = dict['component-order']
  for (let i = 0; i < list.length; i++) {
    const name = list[i].split('_')[0]
    if (name == 'todo') {
      if (status == 'save') {
        todoDict[date] = dict[list[i]]
      } else if (status == 'delete') {
        delete todoDict[date]
      }
    }
  }
}

// update indexeddb from todoDict
function updateStatus (checkbox) {
  let li = checkbox.parentElement
  let key = li.id
  let arr = []
  let todoInMenu = document.querySelectorAll(".list .list-item");

  for (let i = 0; i < todoInMenu.length; i++) {
    if (todoInMenu[i].id == key) {
      arr.push(todoInMenu[i].querySelector(".check--label-text").innerHTML) 
      let status = todoInMenu[i].querySelector(".hidden-box").checked
      if (status == true) {
        status = 'done'
      } else {
        status = ''
      } 
      arr.push(status)
    }
  }
  todoDict[key][1] = arr
  refreshIndexedDB(key)
  syncPage(li.id)
}

function syncPage (id) {
  let date = jsCalendar.tools.dateToString(calendar._now, 'DD/MM/yyyy', 'en')
  // let date_id = id.split('+')[0]
  // let comp_id = id.split('+')[1].split('-')[0]
  let entryPg = document.querySelector('.pg').contentWindow
  if (date == id) {
    for (let i = 0; i < entryPg.objlist.length; i++) {
      if (entryPg.objlist[i].id.includes("todo")) {
        let refreshTo = todoDict[id]
        entryPg.objlist[i].querySelector('.comp-iframe').contentWindow.setData(refreshTo[1])
      }
    }
  }
}

function refreshIndexedDB (id) {
  // id -> date + component_id
  // dict = db[date]
  // dict[component_id] = todo_dict[id]
  // db[date] = dict
  // let date_id = id.split('+')[0]
  // let comp_id = id.split('+')[1]
  let dict = {}

  // load entry page dict from db
  let request = window.indexedDB.open('journalDataBase', 1),
    db,
    tx,
    store,
    index

  request.onupgradeneeded = function (e) {
    let db = request.result,
      store = db.createObjectStore('journalStore', { keyPath: 'date' })
  }

  request.onerror = function (e) {
    console.log('Error: ' + e.target.errorCode)
  }

  request.onsuccess = function (e) {
    db = request.result
    tx = db.transaction('journalStore', 'readwrite')
    store = tx.objectStore('journalStore')
    let entry = store.get(id)
    entry.onsuccess = function () {
      let result = entry.result
      dict = result.dict
      for (key in dict) {
        if (key.includes("todo")) {
          dict[key] = todoDict[id]
        }
      }
      storeByDate(id, dict)
      store.put({ date: id, dict: dict })
    }
    tx.oncomplete = function () {
      db.close()
    }
  }
}

function loadAllHelpVideos(){
  let video_titles = ['Creating a new journal entry',
  'Using the text component',
  'Using the mood slider component',
  'Using the hyperlink component',
  'Using the map component',
  'Using the TODO component',
  'Using the picture component',
  'Using the emoji indicator',
  'Using the TODO list for the navigation bar',
  'Using functional arrows to navigate the journal',
  'Viewing today\'s journal entry',
  'Changing the color theme from settings']
  let video_srcs = ['https://www.youtube.com/embed/0CjsLdv-rKQ',
  'https://www.youtube.com/embed/dyleEoFKuZg',
  'https://www.youtube.com/embed/7svSHzg3WTE',
  'https://www.youtube.com/embed/8cyHOyGQ6kI',
  'https://www.youtube.com/embed/cUWIX47RHIk',
  'https://www.youtube.com/embed/xVyu7TFwymY',
  'https://www.youtube.com/embed/iM2Q1LUuVBs',
  'https://www.youtube.com/embed/0xN5plnyU-w',
  'https://www.youtube.com/embed/hA5--U1QVhI',
  'https://www.youtube.com/embed/jbmjeVBUSTk',
  'https://www.youtube.com/embed/km-QwbvN33g',
  'https://www.youtube.com/embed/ikGyYxoyoXQ']
  function addHelpVideos(title,src){
    let help_iframe = document.createElement('iframe')
    help_iframe.src = src
    help_iframe.title = 'YouTube video player'
    help_iframe.width = '560'
    help_iframe.height = '315'
    help_iframe.frameborder = '0'
    help_iframe.allowfullscreen = true
    let video_title = document.createElement('h2')
    video_title.innerHTML = title
    document.querySelector('.overlay-content-help').appendChild(video_title)
    document.querySelector('.overlay-content-help').appendChild(help_iframe)
  }
  for (let i = 0; i < 12; i++){
    addHelpVideos(video_titles[i],video_srcs[i])
  }
}