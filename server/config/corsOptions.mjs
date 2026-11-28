// Only these browser origins may call the API. Requests without an Origin
// header (curl, server to server) are allowed because CORS is a browser rule.
const whiteList = ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

export default corsOptions;
