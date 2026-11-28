import createProduct from "../../service/products/createProduct.mjs";
import { ValidationError } from "../../model/product.mjs";

export default async function postProduct(httpRequest) {
  try {
    const product = await createProduct(httpRequest.body);
    return { headers: {}, statusCode: 201, body: { product } };
  } catch (err) {
    if (err instanceof ValidationError) {
      return { headers: {}, statusCode: 400, body: { error: err.message } };
    }
    throw err;
  }
}
