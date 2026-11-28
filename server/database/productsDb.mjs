import Product from "./schemas/productSchema.mjs";

// Same function names as the file store from lessons 18 and 19, so routes,
// controllers and services did not need any change.
// find() returns Mongoose documents. lean() would skip our toJSON cleanup,
// so we convert with toJSON() ourselves.
async function findAll() {
  const products = await Product.find().sort({ _id: 1 });
  return products.map((product) => product.toJSON());
}

async function findById(id) {
  // String() blocks query objects such as { "$ne": null } in the URL or body.
  const product = await Product.findOne({ id: String(id) });
  return product ? product.toJSON() : null;
}

async function insert(product) {
  const created = await Product.create(product);
  return created.toJSON();
}

const productsDb = Object.freeze({ findAll, findById, insert });

export default productsDb;
