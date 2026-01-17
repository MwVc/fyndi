import cors from "cors";

const allowedOrigins = ["http://localhost:5173"];

const corsOptions: cors.CorsOptions = {
  // allow req with no origin like api clients(dev mode only)
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
