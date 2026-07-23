import { Router } from "express";

import { search, searchValidators } from "../controllers/search.controller.js";

const searchRouter = Router();

searchRouter.get("/", searchValidators.query, search);

export { searchRouter };
