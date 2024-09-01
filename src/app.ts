import express from "express"
import router from "./http/routes"
import cors from "cors"

export const app = express()

app.use(cors());

app.use(express.json());

app.use("/api", router)