import React from "react";

interface MovieListHeaderProps {
  title: string;
  headerRight?: React.ReactNode;
}

const MovieListHeader = ({ title, headerRight }: MovieListHeaderProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-2xl">{title}</h2>
        <div className="flex items-center">{headerRight}</div>
      </div>
    </div>
  );
};

export default MovieListHeader;
