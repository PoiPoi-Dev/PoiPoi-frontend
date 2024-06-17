import { Leaderboards } from "../_utils/global";
import { getLeaderboardData } from "../_utils/fetchLeaderboard";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../_components/ui/table";
import FooterMenu from "../_components/FooterMenu";
import { revalidatePath } from "next/cache";

export default async function Leaderboard() {
  const LeaderboardData: Leaderboards[] | undefined =
    await getLeaderboardData();

  if (!LeaderboardData) {
    alert("Leaderboard currently unavailble");
    return;
  }

  revalidatePath("/api/leaderboard");

  return (
    <>
      {/* LEADERBOARD */}
      <div className="animate-fade fade-in">
        <h1 className="text-center text-2xl font-bold text-primary bg-secondary py-4 my-0">
          Leaderboard
        </h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {LeaderboardData.map((player, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{player.username}</TableCell>
                <TableCell>{player.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MENU */}
      <FooterMenu variant="leaderboard" />
    </>
  );
}
