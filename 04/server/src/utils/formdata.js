const busboy = require("busboy")
const cloudinary = require("cloudinary").v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
})

// const bodyData = {
//   username: "Jhon Doe",
//   file_1: {},
//   file_2: {},
// }

formData = (req, res, next) => {
  let uploadingFile = false
  let uploadingCount = 0

  const done = () => {
    if (uploadingFile) return
    if (uploadingCount > 0) return
    next()
  }

  const bb = busboy({ headers: req.headers })
  req.body = {}

  // Captura de partes que no son un archivo
  bb.on("field", (key, val) => {
    req.body[key] = val
  })

  // Capturas partes que son archivo
  bb.on("file", (key, stream) => {
    uploadingFile = true
    uploadingCount++
    const cloud = cloudinary.uploader.upload_stream(
      { upload_preset: process.env.CLOUDINARY_PRESET,
        resource_type: 'auto' 
      },// needs setup
      (err, res) => {
        if (err) throw new Error(`Error in file capture: ${err}`)

        req.body[key] = res.secure_url
        uploadingFile = false
        uploadingCount--
        done()
      }
    )

    stream.on("data", (data) => {
      cloud.write(data)
    })

    stream.on("end", () => {
      cloud.end()
    })
  })

  bb.on("finish", () => {
    done()
  })

  req.pipe(bb)
}

module.exports = formData
