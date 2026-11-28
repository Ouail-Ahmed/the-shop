import express from "express";
import handleExpress from "../handleExpress.mjs";
import getProducts from "../controller/products/getProducts.mjs";
import getProduct from "../controller/products/getProduct.mjs";
import postProduct from "../controller/products/postProduct.mjs";
import verifyJwt from "../middleware/verifyJwt.mjs";
import verifyRole from "../middleware/verifyRole.mjs";

const productRouter = express.Router();

productRouter.get("/", handleExpress(getProducts));
productRouter.get("/:id", handleExpress(getProduct));
productRouter.post(
  "/",
  verifyJwt,
  verifyRole("admin"),
  handleExpress(postProduct),
);

export default productRouter;
