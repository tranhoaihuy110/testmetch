
import { useState } from "react";
import { toast } from "react-toastify";
import { IUseTableDataProps } from "./index";

export const useDataOperations = <
  T,
  FormT,
  FetchParams,
  TotalParams,
  SearchParams,
  SortParams,
  FetchByIdParams = string
>({
  fetchData,
  fetchTotal,
  searchData,
  sortData,
  fetchById,
  addData,
  updateData,
  deleteData,
  mapToForm,
  mapFromForm,
  mapResponse,
}: IUseTableDataProps<
  T,
  FormT,
  FetchParams,
  TotalParams,
  SearchParams,
  SortParams,
  FetchByIdParams
>) => {
  const [tableData, setTableData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDateRange = (
    filter: string,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    const now = new Date();
    let  from: string,  to: string;

    switch (filter) {
      case "today": {
        const todayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
        const tomorrowStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0,
            0,
            0
          )
        );
         from = todayStart.toISOString().slice(0, 19).replace("T", " ");
         to = tomorrowStart.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "yesterday": {
        const yesterdayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 1,
            0,
            0,
            0
          )
        );
        const todayStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
         from = yesterdayStart.toISOString().slice(0, 19).replace("T", " ");
         to = todayStart.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "last7days": {
        const last7daysStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 7,
            0,
            0,
            0
          )
        );
        const today = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate(),
            0,
            0,
            0
          )
        );
         from = last7daysStart.toISOString().slice(0, 19).replace("T", " ");
         to = today.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "thisweek": {
        const thisWeekStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - ((now.getUTCDay() + 6) % 7),
            0,
            0,
            0
          )
        );
        const nextWeekStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - ((now.getUTCDay() + 6) % 7) + 7,
            0,
            0,
            0
          )
        );
         from = thisWeekStart.toISOString().slice(0, 19).replace("T", " ");
         to = nextWeekStart.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "last30days": {
        const last30daysStart = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() - 30,
            0,
            0,
            0
          )
        );
        const todayEnd = new Date(
          Date.UTC(
            now.getUTCFullYear(),
            now.getUTCMonth(),
            now.getUTCDate() + 1,
            0,
            0,
            0
          )
        );
         from = last30daysStart.toISOString().slice(0, 19).replace("T", " ");
         to = todayEnd.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "thismonth": {
        const firstDayOfMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
        );
        const firstDayOfNextMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0)
        );
         from = firstDayOfMonth.toISOString().slice(0, 19).replace("T", " ");
         to = firstDayOfNextMonth.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "lastmonth": {
        const firstDayOfLastMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1, 0, 0, 0)
        );
        const firstDayOfThisMonth = new Date(
          Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1, 0, 0, 0)
        );
         from = firstDayOfLastMonth.toISOString().slice(0, 19).replace("T", " ");
         to = firstDayOfThisMonth.toISOString().slice(0, 19).replace("T", " ");
        return {  from,  to };
      }
      case "custom":
        if (startDate && endDate) {
          const adjustedStartDate = new Date(
            startDate.getTime() - startDate.getTimezoneOffset() * 60000
          );
          const adjustedEndDate = new Date(
            endDate.getTime() - endDate.getTimezoneOffset() * 60000
          );
           from = adjustedStartDate.toISOString().slice(0, 19).replace("T", " ");
           to = adjustedEndDate.toISOString().slice(0, 19).replace("T", " ");
          return {  from,  to };
        }
        throw new Error("Start date or end date is not set for custom filter.");
      default:
        return { from: "", to: "" };
    }
  };

  const loadData = async (
    currentPage: number,
    itemsPerPage: number,
    timeFilter: string | null,
    startDate: Date | null,
    endDate: Date | null,
    sortConfig: { key: keyof T | null; direction: "asc" | "desc" },
    appliedFilters: Record<string, string | number | null> = {} // Sử dụng appliedFilters
  ) => {
    setLoading(true);
    try {
      const size = itemsPerPage;
      const page = currentPage;
      let data: T[] = [];
      let total: number = 0;

      const hasTimeFilter = timeFilter;
      const hasFilters = Object.values(appliedFilters).some(
        (value) => value !== null
      );

      if (hasTimeFilter || hasFilters) {
        const { from, to } = hasTimeFilter
          ? getDateRange(timeFilter || "", startDate, endDate)
          : { from: "", to: "" };

        const searchParams = {
          page,
          size,
          ...appliedFilters,
          ...(from && to ? { from, to } : {}),
        } as SearchParams;

        total = await fetchTotal({
          ...appliedFilters,
          ...(from && to ? { from, to } : {}),
        } as TotalParams);
        setTotalItems(total);
        data = await searchData(searchParams);
      } else if (sortConfig.key) {
        const sortField = String(sortConfig.key);
        data = await sortData({
          page,
          size,
          sort: { field: sortField, direction: sortConfig.direction },
        } as SortParams);
        total = await fetchTotal({} as TotalParams);
      } else {
        total = await fetchTotal({} as TotalParams);
        setTotalItems(total);
        const response = await fetchData({ page, size } as FetchParams);
        data = response.data;
      }

      setTableData(data);
      setFilteredData(data);
      setError(null);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemById = async (id: FetchByIdParams): Promise<FormT> => {
    try {
      const itemData = await fetchById(id);
      return mapToForm(itemData);
    } catch (err) {
      const error = err as { message: string };
      toast.error(`Failed to fetch item: ${error.message}`);
      throw err;
    }
  };

  const handleAddItem = async (item: FormT, itemsPerPage: number) => {
    try {
      const formattedItem = mapFromForm(item);
      await addData(formattedItem);
      const response = await fetchData({
        page: 1,
        size: itemsPerPage,
      } as FetchParams);
      const mapped = mapResponse(response);
      setTableData(mapped.data);
      setFilteredData(mapped.data);
      setTotalItems(await fetchTotal({} as TotalParams));
    } catch (err) {
      const error = err as {
        message: string;
        statusCode?: number;
        error?: string;
      };
      toast.error(
        `Failed to add item: ${error.message || error.error || "Unknown error"}`
      );
    }
  };

  const handleEditItem = async (
    item: FormT,
    currentPage: number,
    itemsPerPage: number
  ) => {
    try {
      const formattedItem = mapFromForm(item);
      await updateData(formattedItem);
      const response = await fetchData({
        page: currentPage,
        size: itemsPerPage,
      } as FetchParams);
      const mapped = mapResponse(response);
      setTableData(mapped.data);
      setFilteredData(mapped.data);
      setTotalItems(await fetchTotal({} as TotalParams));
    } catch (err) {
      const error = err as { message: string; error?: string };
      toast.error(
        `Failed to update item: ${
          error.message || error.error || "Unknown error"
        }`
      );
    }
  };

  const handleDeleteItem = async (
    itemToDelete: any,
    currentPage: number,
    itemsPerPage: number
  ) => {
    if (!itemToDelete) return;
    try {
      setLoading(true);
      await deleteData(String(itemToDelete.id));
      const response = await fetchData({
        page: 1,
        size: itemsPerPage,
      } as FetchParams);
      const mapped = mapResponse(response);
      setTableData(mapped.data);
      setFilteredData(mapped.data);
      setTotalItems(await fetchTotal({} as TotalParams));
    } catch (err) {
      const error = err as { message: string; error?: string };
      toast.error(
        `Failed to delete item: ${
          error.message || error.error || "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (
    currentPage: number,
    itemsPerPage: number,
    filters: Record<string, string | number | null>
  ) => {
    setLoading(true);
    try {
      const data = await searchData({
        page: currentPage,
        size: itemsPerPage,
        ...filters,
      } as SearchParams);
      const total = await fetchTotal({ ...filters } as TotalParams);
      setTableData(data);
      setFilteredData(data);
      setTotalItems(total);
      setError(null);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    tableData,
    filteredData,
    totalItems,
    loading,
    error,
    setTableData,
    setFilteredData,
    setTotalItems,
    setError,
    loadData,
    fetchItemById,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    handleSearch,
    getDateRange,
  };
};