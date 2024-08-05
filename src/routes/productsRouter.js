import { Router } from "express";
import { __dirname } from "../utils/misc_utils.js";
import productsController from "../controllers/productsController.js";
import { isAdminOrPremium } from "../auth.js";

const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);

productsRouter.get("/mockingproducts", productsController.GetMockProducts);

productsRouter.get("/:pid", productsController.GetProductById);

productsRouter.post("/", isAdminOrPremium,productsController.createProduct);

productsRouter.put("/:pid", isAdminOrPremium, productsController.editProduct);

productsRouter.delete("/:pid", isAdminOrPremium, productsController.deleteProduct);

export default productsRouter;