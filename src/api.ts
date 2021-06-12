import { Octokit } from "@octokit/rest";

const octokit = new Octokit();

export interface IResult {
  title: string;
  tags: string[];
}

export const getResultsFor = async (query: string): Promise<{ [key:string]: any }[]> => {
  const queryContent = query.trim() !== "" ? `${encodeURIComponent(query)}` : "";
  if (!queryContent) return [];

  const response = await octokit.request("GET /search/issues", {
    q:
      queryContent ||
      `${encodeURIComponent("repo:facebook/react")}+${queryContent}`,
    page: 1,
    per_page: 10,
  });

  return response.data.items
};
