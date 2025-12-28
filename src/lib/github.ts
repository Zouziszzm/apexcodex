import { unstable_cache } from "next/cache";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface YearlyStats {
  year: number;
  count: number;
}


export const getGithubStats = unstable_cache(
  async (username: string): Promise<YearlyStats[]> => {
    if (!GITHUB_TOKEN) {
      console.warn("⚠️ GITHUB_TOKEN is not set in environment variables.");
      return [];
    }
    
    console.log(`Fetching GitHub stats for ${username}...`);

    const query = `
      query($username: String!) {
        user(login: $username) {
          contributionsCollection {
            contributionYears
          }
        }
      }
    `;

    try {
      // 1. Get the list of years
      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables: { username },
        }),
      });

      if (!response.ok) {
        console.error(`GitHub API HTTP Error: ${response.status} ${response.statusText}`);
        const text = await response.text();
        console.error("Response body:", text);
        return [];
      }

      const data = await response.json();

      if (data.errors) {
        console.error("GitHub GraphQL Error (Years):", JSON.stringify(data.errors, null, 2));
        return [];
      }

      const years = data.data.user.contributionsCollection.contributionYears;


      // 2. Fetch counts for each year
      // Note: We could do this in parallel, but rate limits might apply. 
      // GraphQL allows multiple aliases in one query, but dynamically generating it is complex.
      // For a single user, parallel fetch is usually fine.
      
      const yearQueries = years.map((year: number) => {
        const yearQuery = `
          query($username: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $username) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  totalContributions
                }
              }
            }
          }
        `;
        
        return fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: yearQuery,
            variables: { 
              username,
              from: `${year}-01-01T00:00:00Z`,
              to: `${year}-12-31T23:59:59Z`
            },
          }),
        })
        .then(res => res.json())
        .then(res => ({
            year,
            count: res.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0
        }));
      });

      const results = await Promise.all(yearQueries);
      
      // Sort by year descending (newest first)
      return results.sort((a, b) => b.year - a.year);

    } catch (error) {
      console.error("Failed to fetch GitHub stats:", error);
      return [];
    }
  },
  ["github-stats-v2"],
  { revalidate: 3600 * 24 } // Cache for 24 hours
);
