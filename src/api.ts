import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
  auth: process.env.REACT_APP_GIT_AUTH,
});

export interface IResult {
  title: string;
  tags: string[];
}

export const getResultsFor = async (
  query: string
): Promise<{ [key: string]: any }[]> => {
  const queryContent = query.trim() !== "" ? query.trim() : "";
  if (!queryContent) return [];

  try {
    const response = await octokit.request("GET /search/issues", {
      q: queryContent
        ? `repo:facebook/react+${queryContent}`
        : `repo:facebook/react`,
      page: 1,
      per_page: 10,
    });

    return response.data.items;
  } catch (e) {
    console.error(e);
    return [];
  }
};
