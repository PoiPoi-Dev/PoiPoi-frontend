"use client";

import { useEffect, useState } from "react";
import { Leaderboards } from "../_utils/global";

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
          {leaderboard.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Leaderboard;
