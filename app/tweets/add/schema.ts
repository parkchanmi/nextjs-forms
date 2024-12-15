import { z } from "zod";
export const tweetSchema = z.object({
  photo: z.string({
    required_error: "Photo is required",
  }),
  content: z.string({
    required_error: "Tweet Content is required!!!!!",
  }),
});
export type TweetType = z.infer<typeof tweetSchema>;