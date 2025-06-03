/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getPotentialLeadHistorySearchApi,
  getTotalPotentialLeadHistorySearchApi,
  searchPotentialLeadHistorySearchApi,
  sortPotentialLeadHistorySearchApi,
  postPotentialLeadHistorySearchApi,
  patchPotentialLeadHistorySearchApi,
  deletePotentialLeadHistorySeachApi,
} from "../../../services";
import { IPotentialLeadHistorySearchTableProps } from "./index";
import { IPotentialLeadHistorySearchGetApi,IPotentialLeadHistorySearchPatchApi } from "../../../models";
import {
  PotentialLeadHistorySearchFormModal,
  DeletePotentialLeadHistorySearchConfirmationModal,
} from "../index";

export const PotentialLeadHistorySearchTable: React.FC<IPotentialLeadHistorySearchTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IPotentialLeadHistorySearchGetApi = {
    id: "",
    username: "",
    keysearch: "",
    status_search: "",
    json_data: {},
    create_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: " id ", type: "text" },
    { key: "username", label: "User Name", type: "text" },
    { key: "keysearch", label: "key search", type: "text" },
    { key: "status_search", label: "status search", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IPotentialLeadHistorySearchGetApi,
    name: "username" as keyof IPotentialLeadHistorySearchGetApi,
    type: "keysearch" as keyof IPotentialLeadHistorySearchGetApi,
    createdAt: "create_at" as keyof IPotentialLeadHistorySearchGetApi,
  };

  const mapToForm = (data: IPotentialLeadHistorySearchGetApi): IPotentialLeadHistorySearchGetApi => ({
        id: data.id || "",
        username: data.username|| "",
        keysearch: data.keysearch|| "",
        status_search: data.status_search || "",
        json_data: data.json_data|| {},
        create_at: data.create_at || "",
  });

  const mapFromForm = (data: IPotentialLeadHistorySearchGetApi): Partial<IPotentialLeadHistorySearchPatchApi> => {
    return {
      id: data.id,
      username: data.username,
      keysearch: data.keysearch,
      status_search: data.status_search || "",
      json_data: data.json_data,
    };
  };

  const mapResponse = (response: any ): { data: IPotentialLeadHistorySearchGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return { data: response.data };
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    
    itemsPerPageOptions,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    startDate,
    
    endDate,
    
    timeFilter,
    handleTimeFilter,
    handleItemsPerPageChange,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleSearch,
    handleReset,
    handleSort,
    openAddModal,
    openEditModal,
    openDetailModal,
    closeModal,
    openDeleteModal,
    closeDeleteModal,
    handleAddItem,
    handleEditItem,
    handleDeleteItem,
    paginatedData,
    effectiveTotalItems,
    sortConfig,
    loading,
    error,
  } = useTableData<
    IPotentialLeadHistorySearchGetApi,
    IPotentialLeadHistorySearchGetApi,
    { page: number; size: number; id?: string },
    { id?: string; from?: string; to?: string },
    { page: number; size: number; id?: string; username?: string; keysearch?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      id,
    }: {
      page: number;
      size: number;
      id?: string;
    }) => {
      const response = await getPotentialLeadHistorySearchApi({
        page,
        size,
        id: id || "",
      });
      console.log("get potential lead history search Api response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      from,
      to,
      username,
    }: {
      id?: string;
      from?: string;
      to?: string;
      username?:string;
    }) => {
      const response = await getTotalPotentialLeadHistorySearchApi({
        id,
        from,
        to,
        username,
      });
      console.log("get Total potential lead history search Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      username,
      keysearch,
      status_search,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      username?: string;
      keysearch?: string;
      status_search?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPotentialLeadHistorySearchApi({
        page,
        size,
        id,
        username,
        keysearch,
        status_search,
        from,
        to,
      });
      console.log("search potential lead history search Api response:", response);
      return response;
    },
    sortData: async ({
      page,
      size,
      sort,
    }: {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    }) => {
      const response = await sortPotentialLeadHistorySearchApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort potential lead history search Api response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getPotentialLeadHistorySearchApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("get potential lead history search Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" potential lead history search not found");
      }
      return response.data[0];
    },
    addData: postPotentialLeadHistorySearchApi,
    updateData: patchPotentialLeadHistorySearchApi,
    deleteData: deletePotentialLeadHistorySeachApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null
      ? String(filters.id)
      : "";
  const searchEmailTerm =
    filters.username !== undefined && filters.username !== null
      ? String(filters.username)
      : "";
  const searchAddressTerm =
    filters.keysearch !== undefined && filters.keysearch !== null
      ? String(filters.keysearch)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("username", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("keysearch", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchEmail = () => handleClearFilter("username");
  const handleClearSearchAddress = () => handleClearFilter("keysearch");

  const columns = [
  { key: "id" as keyof IPotentialLeadHistorySearchGetApi, header: "id" },
  { key: "username" as keyof IPotentialLeadHistorySearchGetApi, header: "User Name" },
  { key: "keysearch" as keyof IPotentialLeadHistorySearchGetApi, header: "key search" },
  {
    key: "create_at" as keyof IPotentialLeadHistorySearchGetApi,
    header: "create_at",
  },
  { key: "actions" as keyof IPotentialLeadHistorySearchGetApi, header: "Actions" },
];

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <FilterSection
          startDate={startDate}
          setStartDate={handleStartDateChange}
          endDate={endDate}
          setEndDate={handleEndDateChange}
          timeFilter={timeFilter}
          handleTimeFilter={handleTimeFilter}
          searchIdTerm={searchIdTerm}
          setSearchIdTerm={setSearchIdTerm}
          searchNameTerm={searchEmailTerm}
          setSearchNameTerm={setSearchNameTerm}
          searchPhoneTerm={searchAddressTerm}
          setSearchUsernameTerm={setSearchTypeTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchEmail}
          handleClearSearchPhone={handleClearSearchAddress}
          setSearchPhoneTerm={setSearchTypeTerm}
          handleClearSearchUsername={handleClearSearchId}
          searchUsernameTerm={searchEmailTerm}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by User Name"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Loading...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No lead PotentialLeadHistorySearch found for the selected filters.
            </div>
          ) : (
            <TableComponent
              data={paginatedData}
              columns={columns}
              onEdit={openEditModal}
              onDelete={openDeleteModal}
              onDetail={openDetailModal}
              sortConfig={sortConfig}
              handleSort={handleSort}
            />
          )}
        </div>

        <PaginationSection
          totalItems={effectiveTotalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          itemsPerPageOptions={itemsPerPageOptions}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <PotentialLeadHistorySearchFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeletePotentialLeadHistorySearchConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};