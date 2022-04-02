//import css
// function to set a given theme/color-scheme
function setTheme (themeName) {
  localStorage.setItem('theme', themeName)
  document.documentElement.className = themeName
  let entryPg = document.querySelector('.pg')
  if (entryPg)
    entryPg.contentWindow.document.documentElement.className = themeName
  main_theme = themeName.split('-')[1]
}
// function to toggle between light and dark theme
function toggleTheme () {
  if (localStorage.getItem('theme') === 'theme-red-test') {
    setTheme('theme-original-test')
  } else {
    setTheme('theme-red-test')
  }
}
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem('theme') === 'theme-red-test') {
    setTheme('theme-red-test')
  } else {
    setTheme('theme-original-test')
  }
})()
setTheme('theme-spring')
