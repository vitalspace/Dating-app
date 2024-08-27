import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(8, {
      message: "Name must be at least 8 characters",
    })
    .trim(),
  age: z
    .number()
    .gte(18, {
      message: "Age must be at least 18",
    })
    .int(),
    geneder: z.enum(["male", "female"]),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .trim(),
});

export type FormSchema = z.infer<typeof formSchema>;

