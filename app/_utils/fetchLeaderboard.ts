import { Leaderboards } from "./global";

export async function getLeaderboardData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/api/leaderboards`, {
      credentials: "include",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const resData: Leaderboards[] = (await response.json()) as Leaderboards[];
    console.log(resData);
    return resData;
  } catch (error) {
    alert(error);
  }
}
