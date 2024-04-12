const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export function uploadImage(base64Data, fileType = "jpg") {
  return new Promise((resolve, reject) => {
    // Format the Base64 string as a Data URI
    const dataUri = `data:image/${fileType};base64,${base64Data}`;

    cloudinary.uploader.upload(
      dataUri,
      { width: 400, height: 300, crop: "fill" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    console.log("Added!");
  });
}
