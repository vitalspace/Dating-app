import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .trim(),
});

export type FormSchema = z.infer<typeof formSchema>;

