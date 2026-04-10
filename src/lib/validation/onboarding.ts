import { z } from "zod";

export const onboardingSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(32, "Username cannot exceed 32 characters.")
    .regex(
      /^[a-z0-9_]+$/,
      "Username can only contain lowercase letters, numbers, and underscore."
    ),
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters.")
    .max(50, "Display name cannot exceed 50 characters."),
  homeCity: z
    .string()
    .trim()
    .min(2, "Home city is required.")
    .max(80, "Home city cannot exceed 80 characters."),
  travelStyle: z
    .string()
    .trim()
    .min(2, "Travel style is required.")
    .max(50, "Travel style cannot exceed 50 characters."),
  interestsCsv: z.string().trim(),
  is18PlusConfirmed: z
    .boolean()
    .refine((value) => value, "You must confirm that you are 18+ to continue."),
  dateOfBirth: z.string().optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
