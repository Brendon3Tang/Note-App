var element = document.getElementById("my-calender")
var calendarTools = jsCalendar
var calendar = jsCalendar.new(element)

// Initialization: load the current page 
setTimeout(function () {
    let temp_date = jsCalendar.tools.dateToString(calendar._now, 'DD/MM/yyyy', 'en')
    setByDate(temp_date)
    setByTheme()
    populateTODOList()
}, 300)

// Initialization: initialize selection in Theme
function selectThemeChoice(theme) {
    let type = theme.split('-')[1]
    let choices = document.querySelectorAll('input[type="radio"]')
    for (let choice of choices) {
        if (choice.id.split('_')[0] == type)
            choice.checked = true
    }
}

// Initialization: set theme for web page 
function setByTheme() {
    let request = window.indexedDB.open("themeDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("themeStore", { keyPath: "color" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("themeStore", "readwrite")
        store = tx.objectStore("themeStore")
        let entry = store.get("color")
        entry.onsuccess = function () {
            let result = entry.result
            if (result == null) {
                console.log("No preferred theme")
                changeColorsInPage('color-spring')
                selectThemeChoice('color-spring')
            } else {
                let theme = result.theme
                console.log(theme)
                changeColorsInPage(theme)
                selectThemeChoice(theme)
            }
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}

function storeByTheme(colorName) {
    let request = window.indexedDB.open("themeDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("themeStore", { keyPath: "color" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("themeStore", "readwrite")
        store = tx.objectStore("themeStore")
        store.put({ color: "color", theme: colorName })
        tx.oncomplete = function () {
            db.close()
        }
    }
}

// new code for data base here!!!
// setter will set the current journal page according to date.
function setByDate(date) {
    let request = window.indexedDB.open("journalDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("journalStore", { keyPath: "date" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("journalStore", "readwrite")
        store = tx.objectStore("journalStore")
        let entry = store.get(date)
        entry.onsuccess = function () {
            let result = entry.result
            if (result == null) {
                console.log('No info in date :' + date)
                document.querySelector(".pg").contentWindow.reset()
                document.querySelector(".pg").contentWindow.loadingState(false)
            } else {
                let dict = result.dict
                document.querySelector(".pg").contentWindow.loadJSON(dict)
            }
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}

// setter will store the object {date:date, dict:dict} to the database
function storeByDate(date, dict) {
    let request = window.indexedDB.open("journalDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("journalStore", { keyPath: "date" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("journalStore", "readwrite")
        store = tx.objectStore("journalStore")
        store.put({ date: date, dict: dict })
        let all = store.getAll();
        all.onsuccess = function () {
            updateNavList(all)
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}

function deleteByDate(date) {
    let request = window.indexedDB.open("journalDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("journalStore", { keyPath: "date" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("journalStore", "readwrite")
        store = tx.objectStore("journalStore")
        store.delete(date)
        document.querySelector(".pg").contentWindow.reset()
        let all = store.getAll()
        all.onsuccess = function () {
            updateNavList(all)
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}


//get all keys for the data base
function displayAllKeys() {
    let request = window.indexedDB.open("journalDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("journalStore", { keyPath: "date" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("journalStore", "readwrite")
        store = tx.objectStore("journalStore")
        let all = store.getAll()
        all.onsuccess = function () {
            updateNavList(all)
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}

function updateNavList(all) {
    let ol = document.getElementById('listMode')
    ol.innerHTML = null
    calendar.clearselect()
    let result = all.result
    for (let i = 0; i < result.length; i++) {
        let currMon = jsCalendar.tools.dateToString(calendar._now, 'MM', 'en')
        let entryMon = result[i].date.substring(3, 5)
        if (currMon == entryMon) {
            let li = document.createElement("li")
            let emoji = result[i].dict['emoji-holder']
            if (result[i].dict['emoji-holder'] == "") {
                li.innerHTML = result[i].date + " " + "😃" + "<br />" + result[i].dict.pagetitle
            } else {
                li.innerHTML = result[i].date + " " + result[i].dict['emoji-holder'] + "<br />" + result[i].dict.pagetitle
            }
            li.className = 'listItem'
            li.onclick = function (e) {
                let dateNav = e.target.innerHTML
                calendar.set(jsCalendar.tools.parseDate(dateNav.substring(0, 10)))
                setByDate(dateNav.substring(0, 10))
            }
            ol.appendChild(li)
        }
        calendar.select(jsCalendar.tools.parseDate(result[i].date))
    }
}


// // new code for database ends here !!!



// switch to the selected date
calendar.onDateClick(function (event, date) {
    date = jsCalendar.tools.dateToString(date, 'DD/MM/yyyy', 'en')
    calendar.set(jsCalendar.tools.parseDate(date))
    console.log(jsCalendar.tools.parseDate(date))
    setByDate(date)
    displayAllKeys()
})

calendar.onMonthChange(function (event, date) {
    date = jsCalendar.tools.dateToString(date, 'DD/MM/yyyy', 'en')
    console.log("Month changed:" + date)
    calendar.set(jsCalendar.tools.parseDate(date))
    setByDate(date)
    displayAllKeys()
})


// define navBack and navNext
var navPrev = document.querySelector(".previousRound")
navPrev.addEventListener("click", navBack)

function navBack() {
    temp = new Date(calendar._now)
    temp.setDate(calendar._now.getDate() - 1)
    calendar.set(temp)
    date = jsCalendar.tools.dateToString(calendar._now, 'DD/MM/yyyy', 'en')
    setByDate(date)
    displayAllKeys()
}

var navNext = document.querySelector(".nextRound")
navNext.addEventListener("click", navForward)

function navForward() {
    temp = new Date(calendar._now)
    temp.setDate(calendar._now.getDate() + 1)
    calendar.set(temp)
    date = jsCalendar.tools.dateToString(calendar._now, 'DD/MM/yyyy', 'en')
    setByDate(date)
    displayAllKeys()
}

// new entry button (navigate to the current date) 
var newEntry = document.querySelectorAll(".nav-grid-container a")[1]
newEntry.addEventListener("click", () => {
    calendar.set(new Date())
    date = jsCalendar.tools.dateToString(calendar._now, 'DD/MM/yyyy', 'en')
    setByDate(date)
    displayAllKeys()
})

function getToDoHTML(key, id, text, checked) {
    if (checked)
        checked = ' checked'
    else
        checked = ''
    let rst = '<li class="list-item" id="' + key + '">\
                <input type="checkbox" onclick="updateStatus(this)" class="hidden-box" id="check-box-'+ id + '"' + checked + '/>\
                <label for="check-box-'+ id + '" class="check--label">\
                <span class="check--label-box"></span>\
                <span class="check--label-text">'+ text + '</span>\
                </label>\
            </li>'
    return rst
}

function updateToDoMenuList(todoDict) {
    let todoInMenu = document.querySelector(".list")
    todoInMenu.innerHTML = ""
    let counter = 0
    for (var key in todoDict) {
        let obj = todoDict[key][1]
        for (let i = 0; i < obj.length; i += 2) {
            todoInMenu.innerHTML += getToDoHTML(key, counter, obj[i], obj[i + 1] != '')
            counter++
        }
    }
} 

function populateTODOList() {
    let request = window.indexedDB.open("journalDataBase", 1),
        db,
        tx,
        store,
        index

    request.onupgradeneeded = function (e) {
        let db = request.result,
            store = db.createObjectStore("journalStore", { keyPath: "date" })
    }

    request.onerror = function (e) {
        console.log("Error: " + e.target.errorCode)
    }

    request.onsuccess = function (e) {
        db = request.result
        tx = db.transaction("journalStore", "readwrite")
        store = tx.objectStore("journalStore")
        let allKeys = store.getAllKeys()
        allKeys.onsuccess = function () {
            let result = allKeys.result
            for (let i = 0; i < result.length; i++) {
                let entry = store.get(result[i])
                entry.onsuccess = function () {
                    let result = entry.result
                    refreshInMenu(result.dict, result.date, "save")
                }
            }
        }
        tx.oncomplete = function () {
            db.close()
        }
    }
}

document.querySelector('.change-V').addEventListener('click', () => {
    let wrapper = document.getElementById('wrapper-display')
    if (wrapper.className == 'listView') {
        wrapper.className = 'calendarView'
    } else {
        wrapper.className = 'listView'
    }
})

        