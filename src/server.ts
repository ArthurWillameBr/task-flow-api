import { Request, Response } from "express";
import { app } from "./app";
import { env } from "./env";

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.listen(env.PORT, () => {
    console.log(`🚀 HTTP Server Running on Port ${env.PORT}`)
})