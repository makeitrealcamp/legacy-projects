const busboy = require("busboy");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUD,
  api_secret: process.env.CLUD_SECRET,
});

const formData = (req,res,next)=>{
    let img = [];
    let location = {
      coordinates: {
        lat: "",
        lng: "",
      },
      city: "",
    };
    let amenities = [];
    let uploadingFile = false;
    let uploadingCount = 0;
  
    const done = () => {
      if (uploadingFile) return;
      if (uploadingCount > 0) return;
      next();
    };
  
    const bb = busboy({ headers: req.headers });
    req.body = {};
  
    bb.on("field", (key, val) => {
      if (key === "location") {
        const valSplit = val.split(",");
        location.coordinates.lat = parseFloat(
          valSplit[0].slice(1, valSplit[0].length)
        );
        location.coordinates.lng = parseFloat(
          valSplit[1].slice(0, valSplit[1].length - 1)
        );
      } else if (key === "city" || key ==='country') {
        location.city = location.city+' '+val;
      } else if (key === 'amenities') {
          const valSplit = val.split(',')
          valSplit.forEach(item=>amenities.push(item))
          req.body.amenities = amenities
      } else if(key === 'price') {
          const price = parseFloat(val.split(' ')[1].replace(',',''))
          req.body.price = price
      } else if (key === 'capacity' || key === 'rooms') {
          req.body[key] = parseFloat(val)        
      } else {
          req.body[key] = val;
      }
    });
  
    req.body.location = location;
  
    bb.on("file", (key, stream) => {
      uploadingFile = true;
      uploadingCount++;
      const cloud = cloudinary.uploader.upload_stream(
        { upload_preset: "top24" },
        (err, res) => {
          if (err) {
            next(err);
          }
  
          // req.body[key] = res.secure_url
          delete req.body[key];
          img.push(res.secure_url);
          req.body.images = img;
          uploadingFile = false;
          uploadingCount--;
          done();
        }
      );
  
      stream.on("data", (data) => {
        cloud.write(data);
      });
  
      stream.on("end", () => {
        cloud.end();
      });
    });
  
    bb.on("finish", () => {
      done();
    });
  
    req.pipe(bb);
}

module.exports = formData