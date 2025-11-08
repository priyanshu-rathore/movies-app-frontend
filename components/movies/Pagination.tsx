import React from "react";
import Button from "../base-comp/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        variant="secondary"
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="!px-4 !py-1"
      >
        Prev
      </Button>
      {[...Array(totalPages)].map((_, idx) => {
        const page = idx + 1;
        return (
          <Button
            key={page}
            variant={page === currentPage ? "primary" : "secondary"}
            type="button"
            disabled={page === currentPage}
            onClick={() => onPageChange(page)}
            className="!px-4 !py-1"
          >
            {page}
          </Button>
        );
      })}
      <Button
        variant="secondary"
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="!px-4 !py-1"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
