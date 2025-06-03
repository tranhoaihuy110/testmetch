import { ChevronLeft, ChevronRight } from "lucide-react";

import { IPaginationProps } from "./index";

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: IPaginationProps) => {
  const totalPages = Math.ceil((totalItems || 0) / (itemsPerPage || 1));
  console.log("Rendering Pagination - totalItems:", totalItems, "itemsPerPage:", itemsPerPage, "currentPage:", currentPage, "totalPages:", totalPages);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      console.log("Previous clicked, new page:", currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      console.log("Next clicked, new page:", currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      console.log("Page clicked, new page:", page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow && startPage > 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/[0.1]"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && handlePageClick(page)}
          className={`px-3 py-1 rounded-full text-sm ${
            page === currentPage
              ? "bg-blue-900 text-white"
              : typeof page === "number"
              ? "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/[0.1]"
              : "text-gray-500 cursor-default"
          }`}
          disabled={typeof page !== "number"}
          aria-label={
            typeof page === "number" ? `Go to page ${page}` : "Ellipsis"
          }
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
        className={`p-2 rounded-full ${
          currentPage === totalPages || totalPages === 0
            ? "text-gray-300 dark:text-gray-600 cursor-not-allowed"
            : "text-gray-500 hover:bg-gray-100 dark:hover:bg-white/[0.1]"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};