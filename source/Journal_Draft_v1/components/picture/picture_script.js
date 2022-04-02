async function getData () {
  if (canvas.toDataURL('image/png').includes('base64')) {
    return canvas.toDataURL('image/png')
  }
  // didn't get used
  url = getBase64Image(img)
  return url
}

async function setData (base64) {
  var image = new Image()
  image.src = base64

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  image.onload = function () {
    const imgWidth = image.width
    const imgHeight = image.height

    const dimensions = getDimmensions(
      canvas.width,
      canvas.height,
      imgWidth,
      imgHeight
    )
    ctx.drawImage(
      image,
      dimensions.startX,
      dimensions.startY,
      dimensions.width,
      dimensions.height
    )
  }
}
