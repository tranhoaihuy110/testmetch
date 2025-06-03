import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  deleteCommonMetadataApi,
  getCommonMetadataApi,
  getTotalCommonMetadataApi,
  patchCommonMetadataApi,
  postCommonMetadataApi,
  searchCommonMetadataApi,
  sortCommonMetadataApi,
} from "../../../services";
import { ICommonMetaDataTableProps,columns } from "./index";
import { ICommonMetadataGetApi } from "../../../models";
import {
  CommonMetadataFormModal,
  DeleteCommonMetadataConfirmationModal,
} from "../index";


export const CommonMetadataTable: React.FC<ICommonMetaDataTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: ICommonMetadataGetApi = {
    id: "",
    meta_key: "",
    meta_values: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "meta_key", label: "Key", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICommonMetadataGetApi,
    key: "meta_key" as keyof ICommonMetadataGetApi,
    createdAt: "created_at" as keyof ICommonMetadataGetApi,
  };

  const mapToForm = (data: ICommonMetadataGetApi): ICommonMetadataGetApi => ({
    id: data.id || "",
    meta_key: data.meta_key || "",
    meta_values: data.meta_values || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: ICommonMetadataGetApi
  ): Partial<ICommonMetadataGetApi> => ({
    id: data.id,
    meta_key: data.meta_key,
    meta_values: data.meta_values,
  });

  const mapResponse = (response: any): { data: ICommonMetadataGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        meta_key: item.meta_key || "", 
        meta_values: item.meta_values || "",
        created_at: item.created_at || "",
      })),
    };
  };

  const wrappedDeleteCommonMetadataApi = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteCommonMetadataApi(id);
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
    ICommonMetadataGetApi,
    ICommonMetadataGetApi,
    { page: number; size: number; id?: string; meta_key?: string },
    { id?: string; meta_key?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      meta_key?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      id,
      meta_key,
    }: {
      page: number;
      size: number;
      id?: string;
      meta_key?: string;
    }) => {
      const response = await getCommonMetadataApi({
        page,
        size,
        id: id || "",
        meta_key: meta_key || "",
      });
      console.log("getCommonMetadataApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      meta_key,
      from,
      to,
    }: {
      id?: string;
      meta_key?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalCommonMetadataApi({
        id,
        meta_key,
        from,
        to,
      });
      console.log("getTotalCommonMetadataApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      meta_key,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      meta_key?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchCommonMetadataApi({
        page,
        size,
        id,
        meta_key,
        from,
        to,
      });
      console.log("searchCommonMetadataApi response:", response);
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
      const response = await sortCommonMetadataApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCommonMetadataApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCommonMetadataApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getCommonMetadataApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postCommonMetadataApi,
    updateData: patchCommonMetadataApi,
    deleteData: wrappedDeleteCommonMetadataApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchKeyTerm =
    filters.meta_key !== undefined && filters.meta_key !== null
      ? String(filters.meta_key)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchKeyTerm = (value: string) =>
    setFilter("meta_key", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("meta_key");

  

  console.log("CommonMetadataTable state:", {
    isModalOpen,
    modalMode,
    currentItem,
  });

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
          searchNameTerm={searchKeyTerm}
          setSearchNameTerm={setSearchKeyTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchKey}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Key"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchKeyTerm}
          setSearchUsernameTerm={setSearchKeyTerm}
          handleClearSearchPhone={handleClearSearchKey}
          handleClearSearchUsername={handleClearSearchKey}
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
              No Metadata found for the selected filters.
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

      <CommonMetadataFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteCommonMetadataConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

      {children}
    </>
  );
};