/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
export * from "./useTableData";
export interface FilterConfig {
  key: string;
  label: string;
  type: "text" | "number" | "select";
  options?: { value: string; label: string }[];
}

export interface FieldMapping<T> {
  id: keyof T;
  name?: keyof T;
  createdAt?: keyof T;
}

export interface IUseTableDataProps<
  T,
  FormT,
  FetchParams = { page: number; size: number },
  TotalParams = any,
  SearchParams = any,
  SortParams = any,
  FetchByIdParams = string
> {
  fetchData: (params: FetchParams) => Promise<any>;
  fetchTotal: (params: TotalParams) => Promise<number>;
  searchData: (params: SearchParams) => Promise<T[]>;
  sortData: (params: SortParams) => Promise<T[]>;
  fetchById: (params: FetchByIdParams) => Promise<any>;
  addData?: (data: Partial<FormT>) => Promise<any>;
  updateData?: (data: Partial<FormT>) => Promise<any>;
  deleteData?: (id: string) => Promise<any>;
  mapToForm: (data: T) => FormT;
  mapFromForm: (data: FormT) => Partial<FormT>;
  initialFormData: FormT;
  mapResponse: (response: any) => { data: T[]};
  filterConfig?: FilterConfig[];
  fieldMapping: FieldMapping<T>;
}

export interface IUseTableDataReturn<T, FormT> {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (size: number) => void;
  itemsPerPageOptions: number[];
  tableData: T[];
  filteredData: T[];
  totalItems: number;
  isModalOpen: boolean;
  modalMode: "add" | "edit" | "detail";
  currentItem: FormT | null;
  isDeleteModalOpen: boolean;
  itemToDelete: T | null;
  filters: Record<string, string | number | null>;
  setFilter: (key: string, value: string | number | null) => void;
  sortConfig: { key: keyof T | null; direction: "asc" | "desc" };
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  timeFilter: "today" | "yesterday" | "last7days" | "thisweek" | "last30days" | "thismonth" | "lastmonth" | "custom" | null;
  setTimeFilter: (filter: "today" | "yesterday" | "last7days" | "thisweek" | "last30days" | "thismonth" | "lastmonth" | "custom" | null) => void;
  loading: boolean;
  error: string | null;
  isFilterActive: boolean;
  handleTimeFilter: (filter: "today" | "yesterday" | "last7days" | "thisweek" | "last30days" | "thismonth" | "lastmonth" | "custom") => void;
  handleItemsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleStartDateChange: (date: Date | null) => void;
  handleEndDateChange: (date: Date | null) => void;
  openAddModal: () => void;
  openEditModal: (item: T) => Promise<void>;
  closeModal: () => void;
  openDeleteModal: (item: T) => void;
  openDetailModal: (item: T) => void;
  closeDeleteModal: () => void;
  handleAddItem: (item: FormT) => Promise<void>;
  handleEditItem: (item: FormT) => Promise<void>;
  handleDeleteItem: () => Promise<void>;
  handleSearch: () => Promise<void>;
  handleReset: () => void;
  handleSort: (key: keyof T) => Promise<void>;
  handleClearFilter: (key: string) => void;
  paginatedData: T[];
  effectiveTotalItems: number;
}