import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
console.log( 'here name ',process.env.CLOUD_NAME);

export const uploadCloud = async (image) => {
  const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());

  const uploadImage = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "Ecojute" }, (error, uploadResult) => {
        if (error) return reject(error);
        return resolve(uploadResult);
      })
      .end(buffer);
  });
  return uploadImage;
};
