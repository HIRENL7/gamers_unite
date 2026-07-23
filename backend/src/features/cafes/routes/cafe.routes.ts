import { Router } from "express";

import { cafeValidators, getCafeById, listCafes } from "../controllers/cafe.controller.js";

const cafeRouter = Router();

cafeRouter.get("/", cafeValidators.list, listCafes);
cafeRouter.get("/:id", cafeValidators.byId, getCafeById);

export { cafeRouter };
