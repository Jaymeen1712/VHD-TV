import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface RatingProps {
  stop?: number;
}

const Rating = ({ stop = 0 }: RatingProps) => {
  return (
    <div className="flex items-center space-x-1">
      {Array(Math.round(stop / 2))
        .fill(0)
        .map((_, index) => (
          <FaStar key={index} size={20} className="text-white" />
        ))}
      {Array(5 - Math.round(stop / 2))
        .fill(0)
        .map((_, index) => (
          <FaRegStar key={index} size={20} className="text-white/50"/>
        ))}
    </div>
  );
};

export default Rating;
