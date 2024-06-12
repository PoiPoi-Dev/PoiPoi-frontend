"use client";

import { useEffect, useState } from "react";
import { Leaderboards } from "../_utils/global";
import Link from "next/link";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLeaderboard, MdAccountCircle } from "react-icons/md";
import { ButtonIconCircle } from "../_components/ui/MenuIconCircle";
import { BsCollectionFill } from "react-icons/bs";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../_components/ui/table";

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

      {/* MENU */}
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
