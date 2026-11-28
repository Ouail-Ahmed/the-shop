import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./database/connection.mjs";
import corsOptions from "./config/corsOptions.mjs";
import healthRouter from "./route/healthRoutes.mjs";
import productRouter from "./route/productRoutes.mjs";
import authRouter from "./route/authRoutes.mjs";
import { assertJwtConfig } from "./helper/jwtHelper.mjs";

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

const v1Router = express.Router();
v1Router.use("/health", healthRouter);
v1Router.use("/products", productRouter);
v1Router.use("/auth", authRouter);
app.use("/v1", v1Router);

// Runs when no route above matched.
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// Express recognizes an error handler by its four arguments, so keep `next`.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed" });
  }
  if (err.type === "entity.too.large") {
    return res.status(413).json({ error: "Request body too large" });
  }
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body" });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

// Listen only after the database is ready, so no request reaches a dead store.
try {
  assertJwtConfig();
  await connectDb();
  console.log("Connected to MongoDB");
} catch (err) {
  console.error(`Could not start: ${err.message}`);
  console.error("Check MONGO_URI and JWT_SECRET in server/.env, and that MongoDB is running");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
