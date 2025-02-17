import express from "express";
import { gadgetController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();
router.post("/", authMiddleware, gadgetController.createGadget);
router.get("/", authMiddleware, gadgetController.getGadgets);
router.patch("/:id", authMiddleware, gadgetController.updateGadget);
router.delete("/:id", authMiddleware, gadgetController.removeGadget);
router.post("/:id/self-destruct", authMiddleware, gadgetController.destroyGadget);
export default router;
