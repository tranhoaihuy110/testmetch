/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect,useState } from "react";
import { IUseTableDataProps, IUseTableDataReturn } from "./index";
import { usePagination } from "./usePagination";
import { useFilters } from "./useFilters";
import { useSorting } from "./useSorting";
import { useModal } from "./useModal";
import { useDataOperations } from "./useDataOperations";

export const useTableData = <
  T,
  FormT,
  FetchParams = { page: number; size: number },
  TotalParams = any,
  SearchParams = any,
  SortParams = any,
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
  initialFormData,
  mapResponse,
  filterConfig = [],
  fieldMapping,
}: IUseTableDataProps<
  T,
  FormT,
  FetchParams,
  TotalParams,
  SearchParams,
  SortParams,
  FetchByIdParams
>): IUseTableDataReturn<T, FormT> => {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    handleItemsPerPageChange,
  } = usePagination();

  const {
    filters,
    setFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    timeFilter,
    setTimeFilter,
    isFilterActive,
    setIsFilterActive,
    handleTimeFilter,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleReset,
  } = useFilters(filterConfig);

  const { sortConfig, setSortConfig, handleSort } = useSorting<T>();

  const {
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    openAddModal,
    openEditModal: openEditModalBase,
    openDetailModal: openDetailModalBase,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
  } = useModal<FormT>(initialFormData);

  const {
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
  } = useDataOperations<
    T,
    FormT,
    FetchParams,
    TotalParams,
    SearchParams,
    SortParams,
    FetchByIdParams
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
    initialFormData,
    fieldMapping,
  });

  
  const [appliedFilters, setAppliedFilters] = useState<
    Record<string, string | number | null>
  >({});

  useEffect(() => {
    loadData(
      currentPage,
      itemsPerPage,
      timeFilter,
      startDate,
      endDate,
      sortConfig,
      appliedFilters 
    );
  }, [currentPage, itemsPerPage, timeFilter, startDate, endDate, sortConfig]); 

  useEffect(() => {
    const hasFilter =
      !!timeFilter || Object.values(filters).some((value) => value !== null);
    setIsFilterActive(hasFilter);
    setFilteredData(tableData);
  }, [tableData, timeFilter, filters, setIsFilterActive, setFilteredData]);

  const wrappedHandleSort = async (key: keyof T) => {
    setCurrentPage(1);
    const hasFilters = Object.values(appliedFilters).some(
      (value) => value !== null
    );

    if (hasFilters || timeFilter) {
      const {  from,  to } = timeFilter
        ? getDateRange(timeFilter, startDate, endDate)
        : {  from: "",  to: "" };

      const searchParams = {
        page: 1,
        size: itemsPerPage,
        ...appliedFilters, 
        ...( from &&  to ? {  from,  to } : {}),
      } as SearchParams;

      const data = await searchData(searchParams);
      setTableData(data);
      setFilteredData(data);
      setTotalItems(
        await fetchTotal({
          ...appliedFilters,
          ...( from &&  to ? {  from,  to } : {}),
        } as TotalParams)
      );
    } else {
      const data = await handleSort(key, sortData, 1, itemsPerPage);
      setTableData(data);
      setFilteredData(data);
      setTotalItems(await fetchTotal({} as TotalParams));
    }
    setError(null);
  };

  const wrappedHandleSearch = async () => {
    setTimeFilter(null);
    setStartDate(null);
    setEndDate(null);
    setAppliedFilters(filters); 
    await handleSearch(currentPage, itemsPerPage, filters); 
    setIsFilterActive(Object.values(filters).some((value) => value !== null));
  };

  const wrappedHandleReset = () => {
    handleReset();
    setSortConfig({ key: null, direction: "asc" });
    setCurrentPage(1);
    setAppliedFilters({}); 
  };

  const paginatedData = filteredData;
  const effectiveTotalItems = totalItems;

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    tableData,
    filteredData,
    totalItems,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    sortConfig,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    timeFilter,
    setTimeFilter,
    loading,
    error,
    isFilterActive,
    handleTimeFilter,
    handleItemsPerPageChange,
    handleStartDateChange,
    handleEndDateChange,
    openAddModal,
    openEditModal: (item: T) =>
      openEditModalBase(
        fetchItemById as (id: string) => Promise<FormT>,
        String(item[fieldMapping.id])
      ),
    closeModal,
    openDetailModal: (item: T) =>
      openDetailModalBase(
        fetchItemById as (id: string) => Promise<FormT>,
        String(item[fieldMapping.id])
      ),
    openDeleteModal: (item: T) =>
      openDeleteModal({ ...item, id: String(item[fieldMapping.id]) }),
    closeDeleteModal,
    handleAddItem: (item: FormT) => handleAddItem(item, itemsPerPage),
    handleEditItem: (item: FormT) =>
      handleEditItem(item, currentPage, itemsPerPage),
    handleDeleteItem: () =>
      handleDeleteItem(itemToDelete, currentPage, itemsPerPage),
    handleSearch: wrappedHandleSearch,
    handleReset: wrappedHandleReset,
    handleSort: wrappedHandleSort,
    handleClearFilter,
    paginatedData,
    effectiveTotalItems,
  };
};