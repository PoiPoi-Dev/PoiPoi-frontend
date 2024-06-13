import { Leaderboards } from "./global";

export async function getLeaderboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const cacheBuster = Date.now();
    const response = await fetch(
      `${baseUrl}/api/leaderboards?_=${cacheBuster}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      }
    );
    const resData: Leaderboards[] = (await response.json()) as Leaderboards[];
    console.log(resData);
    return resData;
  } catch (error) {
    alert(error);
  }
}
