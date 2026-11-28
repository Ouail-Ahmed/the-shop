import express from "express";
import handleExpress from "../handleExpress.mjs";
import getProducts from "../controller/products/getProducts.mjs";
import getProduct from "../controller/products/getProduct.mjs";
import postProduct from "../controller/products/postProduct.mjs";

const productRouter = express.Router();

productRouter.get("/", handleExpress(getProducts));
productRouter.get("/:id", handleExpress(getProduct));
productRouter.post("/", handleExpress(postProduct));

export default productRouter;
