import { jwt } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { Signin, Signup, Update, Profile } from "../controllers/user.controlle";

export const userRouter = new Elysia({
  detail: {
    tags: ["User"],
  },
})
  .use(jwt({ name: "jwt", secret: process.env.JWT || "test" }))
  .post("/signup", Signup, {
    body: t.Object({
      name: t.String({
        minLength: 8,
      }),
      age: t.Number({
        min: 18,
      }),
      password: t.String({
        minLength: 8,
      }),
      email: t.String({
        format: "email",
      }),
    }),
  })
  .post("/signin", Signin, {
    body: t.Object({
      email: t.String({
        format: "email",
      }),
      password: t.String({
        minLength: 8,
      }),
    }),
  })
  .patch("/update", Update, {
    body: t.Object({
      avatar: t.String(),
      name: t.String({
        minLength: 8,
      }),
      age: t.Number({
        min: 18,
      }),
      password: t.String({
        minLength: 8,
      }),
      email: t.String({
        format: "email",
      }),
    }),
  })
  .get("/profile", Profile);
