import { z } from "zod";

export const authEmailSchema = z.email().trim().toLowerCase();

export const loginSchema = z.object({
  email: authEmailSchema,
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export const signupSchema = loginSchema.extend({
  confirmPassword: z.string().min(8),
}).refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match.",
});

export const forgotPasswordSchema = z.object({
  email: authEmailSchema,
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
