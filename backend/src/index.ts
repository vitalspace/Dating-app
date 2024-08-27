import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import db from "./db/db";
import { userRouter } from "./routes/user.routes";

db();

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  )
  .group("/api/v1", (app) => app.use(userRouter))
  .listen("3000");

console.log("Server on port: ", app.server?.port);
