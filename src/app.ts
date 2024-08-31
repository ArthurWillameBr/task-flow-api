import express from "express"
import router from "./http/routes"
import cors from "cors"

export const app = express()

app.use(cors({
    origin: ["https://task-flow-web-97vz.vercel.app/auth/sign-up"]
}))
app.use(express.json());

app.use("/api", router)