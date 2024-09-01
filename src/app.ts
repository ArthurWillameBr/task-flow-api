import express from "express"
import router from "./http/routes"
import cors from "cors"

export const app = express()

const corsOptions = {
    origin: "https://task-flow-web-delta.vercel.app/", 
    optionsSuccessStatus: 200 
  };
  
app.use(cors(corsOptions));

app.use(express.json());

app.use("/api", router)