import { Router } from "express";

import {
  createReview,
  listReviews,
  reviewValidators,
} from "../controllers/review.controller.js";

const reviewRouter = Router();

reviewRouter.get("/", reviewValidators.list, listReviews);
reviewRouter.post("/", ...reviewValidators.create, createReview);

export { reviewRouter };
