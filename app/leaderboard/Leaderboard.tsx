"use client";

import { useEffect, useState } from "react";
import { Leaderboards } from "../_utils/global";
import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLeaderboard, MdAccountCircle } from "react-icons/md";
import { ButtonIconCircle } from "../_components/ui/MenuIconCircle";
import { BsCollectionFill } from "react-icons/bs";

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
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-0 left-0 w-full flex gap-2 h-16 bg-white rounded-t-3xl justify-center items-end">
        <div className="flex justify-between min-w-[360px] max-w-full">
          <Link href="/map">
            <ButtonIconCircle text="Map">
              <FaMapLocationDot size={24} />
            </ButtonIconCircle>
          </Link>

          <Link href={"/map"}>
            <ButtonIconCircle text="collection">
              <BsCollectionFill size={24} />
            </ButtonIconCircle>
          </Link>

          <Link href="/leaderboard">
            <ButtonIconCircle variant={"active"} text="leaderboard">
              <MdLeaderboard size={24} />
            </ButtonIconCircle>
          </Link>

          <Link href={"/map"}>
            <ButtonIconCircle text="account" onClick={() => alert("account")}>
              <MdAccountCircle size={24} />
            </ButtonIconCircle>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Leaderboard;
