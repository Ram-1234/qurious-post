// routes/upload.js  (ES modules)
// npm i express multer sharp cloudinary
import multer from "multer";
import sharp from "sharp";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a Buffer to Cloudinary and return the https URL
function uploadBuffer(buffer, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { public_id: publicId, resource_type: "image", overwrite: true },
        (err, result) => (err ? reject(err) : resolve(result.secure_url))
      )
      .end(buffer);
  });
}

// Compress + resize, upload full image and thumbnail.
// Reused by the migration script too.
export async function processAndUpload(inputBuffer, id, folder = "posts") {
  const base = sharp(inputBuffer, { failOn: "none" }).rotate(); // fixes phone orientation

  const [full, thumb] = await Promise.all([
    base.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(),
    base.clone().resize({ width: 400, withoutEnlargement: true }).webp({ quality: 70 }).toBuffer(),
  ]);

  const [image, thumbnail] = await Promise.all([
    uploadBuffer(full, `${folder}/${id}`),
    uploadBuffer(thumb, `${folder}/${id}-thumb`),
  ]);

  return { image, thumbnail };
}

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
  fileFilter: (req, file, cb) =>
    file.mimetype.startsWith("image/") ? cb(null, true) : cb(new Error("Only images allowed")),
});

//const router = express.Router();

// Add your auth middleware here, e.g. router.post("/", requireAuth, upload.single("image"), ...)
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No image uploaded" });
//     const result = await processAndUpload(req.file.buffer, crypto.randomUUID());
//     res.json(result); // { image: "https://...", thumbnail: "https://..." }
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

//export default router;