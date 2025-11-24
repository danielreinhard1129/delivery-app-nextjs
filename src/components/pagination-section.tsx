"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  CursorPaginationQueries,
  OffsetPaginationMeta,
  PageableResponseCursor,
} from "@/types/pagination";
import { Dispatch, FC, SetStateAction } from "react";

interface OffsetPaginationSectionProps {
  meta: OffsetPaginationMeta;
  onChangePage: (page: number) => void;
}

export const OffsetPaginationSection: FC<OffsetPaginationSectionProps> = ({
  meta,
  onChangePage,
}) => {
  const { page, take, total } = meta;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / take); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5;
  const pageNumLimit = Math.floor(maxPageNum / 2);

  let activePages = pageNumbers.slice(
    Math.max(0, page - 1 - pageNumLimit),
    Math.min(page - 1 + pageNumLimit + 1, pageNumbers.length),
  );

  const totalPages = Math.ceil(total / take);

  const handlePrevPage = () => {
    if (page > 1) {
      onChangePage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onChangePage(page + 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem key={idx}>
        <PaginationLink
          onClick={() => onChangePage(page)}
          className="border"
          isActive={page === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          className="border"
          onClick={() => onChangePage(activePages[0] - 1)}
        />,
      );
    }

    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          className="border"
          onClick={() => onChangePage(activePages[activePages.length - 1] + 1)}
        />,
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevPage} className="border" />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext onClick={handleNextPage} className="border" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

interface CursorPaginationSectionProps {
  response: PageableResponseCursor<any>;
  setPagination: Dispatch<SetStateAction<CursorPaginationQueries>>;
  className?: string;
}

export const CursorPaginationSection: FC<CursorPaginationSectionProps> = ({
  response,
  setPagination,
  className,
}) => {
  const { data, meta } = response;

  const { isFirstPage, hasMore } = meta;

  const handleNextPage = () => {
    if (!data || data.length === 0) return;
    if (hasMore) {
      setPagination((prev) => ({
        ...prev,
        cursor: data[data.length - 1].id,
        isPrevious: false,
      }));
    }
  };

  const handlePrevPage = () => {
    if (!data || data.length === 0) return;
    if (!isFirstPage) {
      setPagination((prev) => ({
        ...prev,
        cursor: data[0].id,
        isPrevious: true,
      }));
    }
  };

  return (
    <div>
      <Pagination className={className}>
        <PaginationContent className="cursor-pointer">
          {/* Prev button */}
          <PaginationItem>
            <PaginationPrevious className="border" onClick={handlePrevPage} />
          </PaginationItem>

          {/* Next button */}
          <PaginationItem>
            <PaginationNext className="border" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
