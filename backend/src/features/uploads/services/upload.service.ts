import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

import { env } from "../../../shared/config/env.js";
import { ApiError } from "../../../shared/utils/api-error.js";
import { cafeRepository } from "../../cafes/repositories/cafe.repository.js";
import { userRepository } from "../../users/repositories/user.repository.js";
import { mapUserToPublic } from "../../users/utils/map-user.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_request, file, callback) => {
    if (!file.mimetype.startsWith("image/")) {
      callback(new ApiError(400, "Only image uploads are supported"));
      return;
    }

    callback(null, true);
  },
});

function ensureCloudinaryConfigured() {
  if (!env.cloudinaryCloudName || !env.cloudinaryApiKey || !env.cloudinaryApiSecret) {
    throw new ApiError(
      503,
      "Image uploads are not configured. Set Cloudinary environment variables.",
    );
  }

  cloudinary.config({
    cloud_name: env.cloudinaryCloudName,
    api_key: env.cloudinaryApiKey,
    api_secret: env.cloudinaryApiSecret,
  });
}

export const uploadService = {
  middleware: upload.single("image"),

  async uploadImage(buffer: Buffer, folder: string) {
    ensureCloudinaryConfigured();

    return new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `gamesunite/${folder}`,
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result?.secure_url) {
            reject(new ApiError(500, "Image upload failed"));
            return;
          }

          resolve(result.secure_url);
        },
      );

      stream.end(buffer);
    });
  },

  async uploadAvatar(userId: string, buffer: Buffer) {
    const imageUrl = await this.uploadImage(buffer, "avatars");
    const user = await userRepository.updateAvatar(userId, imageUrl);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return mapUserToPublic(user);
  },

  async uploadCafeImage(cafeSlug: string, buffer: Buffer) {
    const imageUrl = await this.uploadImage(buffer, "cafes");
    const cafe = await cafeRepository.updateImageUrl(cafeSlug, imageUrl);

    if (!cafe) {
      throw new ApiError(404, "Cafe not found");
    }

    return imageUrl;
  },
};
