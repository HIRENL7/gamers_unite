import type { Request, Response } from "express";
import { z } from "zod";

import { asyncHandler } from "../../../shared/utils/async-handler.js";
import { requireAuth, validateRequest } from "../../../shared/middleware/validate.js";
import { ApiError } from "../../../shared/utils/api-error.js";
import { uploadService } from "../services/upload.service.js";

const uploadBodySchema = z.object({
  target: z.enum(["avatar", "cafe"]).default("avatar"),
  cafeSlug: z.string().optional(),
});

export const uploadImage = asyncHandler(async (request: Request, response: Response) => {
  if (!request.file) {
    throw new ApiError(400, "Image file is required");
  }

  const body = uploadBodySchema.parse(request.body);

  if (body.target === "avatar") {
    const user = await uploadService.uploadAvatar(request.auth!.sub, request.file.buffer);
    response.status(201).json({
      success: true,
      data: {
        imageUrl: user.avatarUrl,
        user,
      },
    });
    return;
  }

  if (!body.cafeSlug) {
    throw new ApiError(400, "cafeSlug is required for cafe uploads");
  }

  const imageUrl = await uploadService.uploadCafeImage(body.cafeSlug, request.file.buffer);
  response.status(201).json({
    success: true,
    data: { imageUrl },
  });
});

export const uploadValidators = {
  image: [requireAuth],
};
