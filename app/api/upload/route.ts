// app/api/upload/route.ts
import { uploadImage } from "../../utils/cloudinary";
import { Buffer } from "buffer";
import fs from "fs";
import path from "path";
export const config = {
  api: {
    bodyParser: false,
  },
};
function makeid(length = 10) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function ensureDirectoryExists(dirPath) {
  try {
    await fs.promises.access(dirPath, fs.constants.F_OK);
  } catch (e) {
    await fs.promises.mkdir(dirPath, { recursive: true });
  }
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("image");
    if (!file) {
      throw new Error("File not found in the form data");
    }
    console.log("form data", form, "file", file);

    let namefile = makeid(10);
    const uploadDir = path.join(process.cwd(), "app", "public", "upload");

    // Ensure the upload directory exists
    await ensureDirectoryExists(uploadDir);
    console.log(uploadDir);
    // Read the file data as a Buffer
    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);

    // Convert the buffer to Base64 and save the image
    const base64Data = buffer.toString("base64");
    uploadImage(base64Data, "jpg")
      .then(async (imageData) => {
        console.log("Image uploaded successfully:", imageData);
        const result = await prisma.image.create({
          data: {
            publicId: imageData.public_id,
            format: imageData.format,
            version: imageData.version.toString(),
          },
        });
        return new Response(JSON.stringify({ success: "Successful" }));
      })
      .catch((error) => {
        console.error("Failed to upload image:", error);
        return new Response(JSON.stringify({ error: "Server Side Error !" }), {
          status: 500,
        });
      });
    return new Response(JSON.stringify({ success: "Successful" }));
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Server Side Error !" }), {
      status: 500,
    });
  }
}
