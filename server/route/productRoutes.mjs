import express from "express";
import handleExpress from "../handleExpress.mjs";
import getProducts from "../controller/products/getProducts.mjs";
import getProduct from "../controller/products/getProduct.mjs";

const productRouter = express.Router();

productRouter.get("/", handleExpress(getProducts));
productRouter.get("/:id", handleExpress(getProduct));

export default productRouter;
