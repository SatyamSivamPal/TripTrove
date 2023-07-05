'use client';

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "@/app/types";
import useFavorite from "../Hooks/useFavorite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const {hasFavorited, toggleFavorite} = useFavorite({
    listingId,
    currentUser
  })
  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute top-[2px] right-[5px]"
      />
      <AiFillHeart
        size={24}
        className={
          `absolute top-[4px] right-[7px]
          ${hasFavorited ? 'fill-blue-500' : 'fill-neutral-500/70'} `}
      />
    </div>
  );
};

export default HeartButton;
