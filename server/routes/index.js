import express from "express";
import {
	getShops,
	addShop,
	updateShop,
	removeShop
} from "../controllers/index.js";
const router = express.Router();

router.route("/api").get(getShops);
router.route("/api").post(addShop);
router.route("/api").patch(updateShop);
router.route("/api").delete(removeShop);

export default router;
