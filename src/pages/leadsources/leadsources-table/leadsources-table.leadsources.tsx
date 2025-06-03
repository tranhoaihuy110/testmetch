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
  getLeadsourcesApi,
  getTotalLeadsourcesApi,
  searchLeadsourcesApi,
  sortLeadsourcesApi,
  postLeadsourcesApi,
  patchLeadsourcesApi,
  deleteLeadsourcesApi,
} from "../../../services";
import { ILeadsourcesTableProps } from "./index";
import { ILeadsourcesGetApi,ILeadsourcesPatchApi } from "../../../models";
import {
  LeadsourcesFormModal,
  DeleteLeadsourcesConfirmationModal,
} from "../index";

export const LeadsourcesTable: React.FC<ILeadsourcesTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadsourcesGetApi = {
    source_id: "",
    source_name: "",
    description: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "source_id", label: " source id ", type: "text" },
    { key: "source_name", label: "source Name", type: "text" },
    { key: "description", label: "description", type: "text" },
  ];

  const fieldMapping = {
    id: "source_id" as keyof ILeadsourcesGetApi,
    name: "source_name" as keyof ILeadsourcesGetApi,
    type: "description" as keyof ILeadsourcesGetApi,
  };

  const mapToForm = (data: ILeadsourcesGetApi): ILeadsourcesGetApi => ({
        source_id: data.source_id || "",
        source_name: data.source_name|| "",
        description: data.description|| "",
  });

  const mapFromForm = (data: ILeadsourcesGetApi): Partial<ILeadsourcesPatchApi> => {
    return {
      source_id: data.source_id,
      source_name: data.source_name,
      description: data.description,
    };
  };

  const mapResponse = (response: any ): { data: ILeadsourcesGetApi[] } => {
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
    ILeadsourcesGetApi,
    ILeadsourcesGetApi,
    { page: number; size: number; source_id?: string },
    { source_id?: string; source_name?: string; description?: string },
    { page: number; size: number; source_id?: string; username?: string; keysearch?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      source_id,
    }: {
      page: number;
      size: number;
      source_id?: string;
    }) => {
      const response = await getLeadsourcesApi({
        page,
        size,
        source_id: source_id || "",
      });
      console.log("get Lead sources Api response:", response);
      return response;
    },
    fetchTotal: async ({
      source_id,
      source_name,
    }: {
      source_id?: string;
      source_name?:string;
    }) => {
      const response = await getTotalLeadsourcesApi({
        source_id,
        source_name,
      });
      console.log("get Total Lead sources Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      source_id,
      source_name,
      description,
    }: {
      page: number;
      size: number;
      source_id?: string;
      source_name?: string;
      description?: string;
    }) => {
      const response = await searchLeadsourcesApi({
        page,
        size,
        source_id,
        source_name,
        description,
      });
      console.log("search Lead sources Api response:", response);
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
      const response = await sortLeadsourcesApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Lead sources Api response:", response);
      return response;
    },
    fetchById: async (source_id: string) => {
      const response = await getLeadsourcesApi({
        page: 1,
        size: 1,
        source_id,
      });
      console.log("get Lead sources Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Lead sources not found");
      }
      return response.data[0];
    },
    addData: postLeadsourcesApi,
    updateData: patchLeadsourcesApi,
    deleteData: deleteLeadsourcesApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.source_id !== undefined && filters.source_id !== null
      ? String(filters.source_id)
      : "";
  const searchEmailTerm =
    filters.source_name !== undefined && filters.source_name !== null
      ? String(filters.source_name)
      : "";
  const searchAddressTerm =
    filters.description !== undefined && filters.description !== null
      ? String(filters.description)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("source_id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("source_name", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("description", value || null);

  const handleClearSearchId = () => handleClearFilter("source_id");
  const handleClearSearchEmail = () => handleClearFilter("source_name");
  const handleClearSearchAddress = () => handleClearFilter("description");

  const columns = [
  { key: "source_id" as keyof ILeadsourcesGetApi, header: "source id" },
  { key: "source_name" as keyof ILeadsourcesGetApi, header: "source Name" },
  { key: "description" as keyof ILeadsourcesGetApi, header: "description" },
  { key: "actions" as keyof ILeadsourcesGetApi, header: "Actions" },
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
          firstSearchLabel="Search by source_id"
          secondSearchLabel="Search by source name"
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
              No lead Leadsources found for the selected filters.
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
      <LeadsourcesFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadsourcesConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};