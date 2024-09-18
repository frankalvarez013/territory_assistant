const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export function uploadImage(base64Data, fileType = "jpg", width, height) {
  return new Promise((resolve, reject) => {
    // Format the Base64 string as a Data URI
    const dataUri = `data:image/${fileType};base64,${base64Data}`;
    const uploadOptions = {
      crop: "fill",
      width: 400,
      height: 300,
    };
    if (width) uploadOptions.width = width;
    if (height) uploadOptions.height = height;

    cloudinary.uploader.upload(dataUri, uploadOptions, (error, result) => {
      if (error) reject(error);
      resolve(result);
    });
  });
}
