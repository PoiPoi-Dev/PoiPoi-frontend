"use client";

import { useEffect, useState } from "react";
import { Leaderboards } from "../_utils/global";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../_components/ui/table";
import FooterMenu from "../_components/FooterMenu";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboards[]>([]);

  useEffect(() => {
    return () => {
      void getLeaderboard();
    };
  }, []);

  const getLeaderboard = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/leaderboards`, {
        credentials: "include",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const resData: Leaderboards[] = (await response.json()) as Leaderboards[];
      setLeaderboard(resData);
    } catch (error) {
      console.error(error);
    }
  };

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
            {leaderboard.map((player, index) => (
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
};

export default Leaderboard;
