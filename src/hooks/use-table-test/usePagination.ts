import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const itemsPerPageOptions = [3, 5, 10, 15];

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    handleItemsPerPageChange,
  };
};
