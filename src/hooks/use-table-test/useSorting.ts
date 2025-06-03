/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { toast } from "react-toastify";
import { IUseTableDataProps } from "./index";

export const useSorting = <T>() => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSort = async (
    key: keyof T,
    sortData: IUseTableDataProps<T, any>["sortData"],
    page: number,
    itemsPerPage: number
  ) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    try {
      const sortField = String(key);
      const data = await sortData({
        page,
        size: itemsPerPage,
        sort: { field: sortField, direction },
      } as any);
      return data;
    } catch (err) {
      const error = err as { message: string };
      toast.error(error.message);
      throw err;
    }
  };

  return {
    sortConfig,
    setSortConfig,
    handleSort,
  };
};
