import { Leaderboards } from "../_utils/global";
import { getLeaderboardData } from "../_utils/fetchLeaderboard";

export default async function LeaderboardServer() {
  const LeaderboardData: Leaderboards[] | undefined =
    await getLeaderboardData();

  if (!LeaderboardData) {
    alert("Leaderboard currently unavailble");
    return;
  }

  return (
    <>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {LeaderboardData.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
