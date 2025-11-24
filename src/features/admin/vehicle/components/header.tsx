"use client";

import { Input } from "@/components/ui/input";
import { CursorPaginationQueries } from "@/types/pagination";
import { Dispatch, FC, ReactNode, SetStateAction } from "react";

interface HeaderProps {
  title: string;
  setPagination: Dispatch<SetStateAction<CursorPaginationQueries>>;
  components?: ReactNode;
}

const Header: FC<HeaderProps> = ({ title, setPagination, components }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination((prev) => ({ ...prev, search: e.target.value }));
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center justify-between">
        <Input
          className="max-w-[500px]"
          placeholder="Search..."
          onChange={onChange}
        />

        {!!components && components}
      </div>
    </>
  );
};

export default Header;
