let img
let canvas
let ctx
let inputimage
try {
  img = new Image()
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d')
  inputimage = document.getElementById('image-input')
} catch (err) {
}

// Fires whenever the img object loads a new image (such as with img.src =)
img.addEventListener('load', () => {
  // TODO
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const dimensions = getDimmensions(
    canvas.width,
    canvas.height,
    img.width,
    img.height
  )
  ctx.drawImage(
    img,
    dimensions.startX,
    dimensions.startY,
    dimensions.width,
    dimensions.height
  )

  // Some helpful tips:
  // - Fill the whole Canvas with black first to add borders on non-square images, then draw on top
  // - Clear the form when a new image is selected
  // - If you draw the image to canvas here, it will update as soon as a new image is selected
})
try {
  inputimage.addEventListener('change', () => {
    img.src = URL.createObjectURL(inputimage.files[0])
    img.alt = inputimage.files[0].name
  })
} catch (err) {
}

function getBase64Image (img1) {
  var canvas = document.createElement('canvas')
  canvas.width = img1.width
  canvas.height = img1.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img1, 0, 0)
  return canvas.toDataURL('image/png')
}

try {
  module.exports = { getDimmensions }
} catch {
  console.log('Modules have been exported for testing.')
}

/**
 * Takes in the dimensions of the canvas and the new image, then calculates the new
 * dimensions of the image so that it fits perfectly into the Canvas and maintains aspect ratio
 * @param {number} canvasWidth Width of the canvas element to insert image into
 * @param {number} canvasHeight Height of the canvas element to insert image into
 * @param {number} imageWidth Width of the new user submitted image
 * @param {number} imageHeight Height of the new user submitted image
 * @returns {Object} An object containing four properties: The newly calculated width and height,
 * and also the starting X and starting Y coordinate to be used when you draw the new image to the
 * Canvas. These coordinates align with the top left of the image.
 */
function getDimmensions (canvasWidth, canvasHeight, imageWidth, imageHeight) {
  let aspectRatioC, aspectRatioI, height, width, startX, startY

  // Get the aspect ratio, used so the picture always fits inside the canvas
  aspectRatioI = imageWidth / imageHeight
  aspectRatioC = canvasWidth / canvasHeight

  // If the apsect ratio is less than 1 it's a verical image
  if (aspectRatioI < aspectRatioC) {
    // Height is the max possible given the canvas
    height = canvasHeight
    // Width is then proportional given the height and aspect ratio
    width = canvasHeight * aspectRatioI
    // Start the Y at the top since it's max height, but center the width
    startY = 0
    startX = (canvasWidth - width) / 2
    // This is for horizontal images now
  } else {
    // Width is the maximum width possible given the canvas
    width = canvasWidth
    // Height is then proportional given the width and aspect ratio
    height = canvasWidth / aspectRatioI
    // Start the X at the very left since it's max width, but center the height
    startX = 0
    startY = (canvasHeight - height) / 2
  }

  return { width: width, height: height, startX: startX, startY: startY }
}
