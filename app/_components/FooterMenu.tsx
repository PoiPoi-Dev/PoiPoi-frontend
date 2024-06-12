import Link from "next/link";
import { BsCollectionFill } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdLeaderboard, MdAccountCircle } from "react-icons/md";
import { ButtonIconCircle } from "./ui/MenuIconCircle";

export default function FooterMenu({
  variant,
}: {
  variant: "map" | "collection" | "leaderboard" | "account" | "none";
}) {
  return (
    <div className="fixed bottom-0 left-0 w-full flex gap-2 h-16 bg-white rounded-t-3xl justify-center items-end">
      <div className="flex justify-between min-w-[360px] max-w-full">
        <Link href="/map">
          <ButtonIconCircle
            variant={variant === "map" ? "active" : "default"}
            text="Map"
          >
            <FaMapLocationDot size={24} />
          </ButtonIconCircle>
        </Link>

        <Link href={"/map"}>
          <ButtonIconCircle
            variant={variant === "collection" ? "active" : "default"}
            text="collection"
          >
            <BsCollectionFill size={24} />
          </ButtonIconCircle>
        </Link>

        <Link href="/leaderboard">
          <ButtonIconCircle
            variant={variant === "leaderboard" ? "active" : "default"}
            text="leaderboard"
          >
            <MdLeaderboard size={24} />
          </ButtonIconCircle>
        </Link>

        <Link href={"/login"}>
          <ButtonIconCircle
            text="account"
            variant={variant === "account" ? "active" : "default"}
          >
            <MdAccountCircle size={24} />
          </ButtonIconCircle>
        </Link>
      </div>
    </div>
  );
}
