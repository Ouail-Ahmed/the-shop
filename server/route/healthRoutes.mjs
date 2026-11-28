import express from "express";

const healthRouter = express.Router();

healthRouter.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default healthRouter;
