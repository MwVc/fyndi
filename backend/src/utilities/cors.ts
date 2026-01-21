import cors from "cors";

const allowedOrigins = ["https://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  // allow req with no origin like api clients(dev mode only)
  origin: (origin: any, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Blocked by CORS"));
      console.log("Blocking a request");
    }
  },
  credentials: true,
};

export default cors(corsOptions);
