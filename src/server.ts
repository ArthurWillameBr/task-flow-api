import { Request, Response } from "express";
import { app } from "./app";

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("🚀 HTTP Server Running!")
})