"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../_components/ui/table";
import FooterMenu from "../_components/FooterMenu";
import { Leaderboards } from "../_utils/global";

interface LeaderboardProps {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const [storedName, setStoredName] = useState<string | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<Leaderboards[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const name = localStorage.getItem("username");
      setStoredName(name);
    }
  }, []);

  const getLeaderboardData = async () => {
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
      setLeaderboardData(resData);
    } catch (error) {
      alert("Leaderboard currently unavailable");
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    void getLeaderboardData();
  }, []);

  return (
    <>
      {/* LEADERBOARD */}
      <div className="animate-fade fade-in">
        <h1 className="text-center text-2xl font-bold text-primary bg-secondary py-4 my-0">
          Leaderboard
        </h1>
        <Table className="table-fixed w-full">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table className="table-fixed w-full">
            <TableBody>
              {leaderboardData.map((player, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    className={
                      player.username === storedName ? "bg-yellow-100" : ""
                    }
                  >
                    {player.username}
                  </TableCell>
                  <TableCell>{player.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* MENU */}
      <FooterMenu variant="leaderboard" />
    </>
  );
};

export default Leaderboard;
