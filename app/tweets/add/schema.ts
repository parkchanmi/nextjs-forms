import { z } from "zod";
export const tweetSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  tweet: z.string({
    required_error: "Tweet Content is required!!!!!",
  }),
});
export type tweetType = z.infer<typeof tweetSchema>;