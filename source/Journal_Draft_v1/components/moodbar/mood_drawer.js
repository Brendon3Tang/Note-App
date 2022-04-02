function happiness (value) {
  value = parseInt(value)
  const shower = document.querySelector('.face-shower')
  const path = shower.querySelector('path')
  const st_x = 17
  const ed_x = 49
  let y = 45
  const alph = 2.4
  y = y - alph + (alph * (100 - value)) / 50
  const r = (ed_x - st_x) * 0.4
  const agl = (Math.PI / 100) * value - Math.PI / 2
  const adj1_x = Math.round(st_x + Math.cos(agl) * r)
  const adj1_y = Math.round(y + Math.sin(agl) * r)
  const adj2_x = Math.round(ed_x - Math.cos(agl) * r)
  const adj2_y = adj1_y
  path.setAttribute(
    'd',
    'M ' +
      st_x.toString() +
      ' ' +
      y.toString() +
      ' C ' +
      adj1_x.toString() +
      ' ' +
      adj1_y.toString() +
      ', ' +
      adj2_x.toString() +
      ' ' +
      adj2_y.toString() +
      ', ' +
      ed_x.toString() +
      ' ' +
      y.toString()
  )
}
