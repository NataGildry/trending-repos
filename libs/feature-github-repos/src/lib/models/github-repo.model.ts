import { z } from 'zod';

export const GithubOwnerSchema = z.object({
  login: z.string(),
  avatar_url: z.string().url(),
});

export const GithubRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stargazers_count: z.number(),
  open_issues_count: z.number(),
  html_url: z.string().url(),
  owner: GithubOwnerSchema,
  created_at: z.string().datetime(),
});

export const GithubSearchResponseSchema = z.object({
  items: z.array(GithubRepoSchema),
  total_count: z.number(),
  incomplete_results: z.boolean(),
});

export type GithubRepo = z.infer<typeof GithubRepoSchema>;
export type GithubSearchResponse = z.infer<typeof GithubSearchResponseSchema>;
