import { Pagination } from "../../common";

import {IPaginationSectionProps} from './index'

export const PaginationSection: React.FC<IPaginationSectionProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  itemsPerPageOptions,
  onPageChange,
  onItemsPerPageChange,
}) => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 dark:border-white/[0.05]">
      <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <span>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}{" "}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          items
        </span>
        <select
          value={itemsPerPage}
          onChange={onItemsPerPageChange}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-white/[0.1] dark:bg-white/[0.03] dark:text-gray-400"
          aria-label="Select items per page"
        >
          {itemsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option} per page
            </option>
          ))}
        </select>
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};
