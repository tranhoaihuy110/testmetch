import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCommonMetadataFinalApi,
  getTotalCommonMetadataFinalApi,
  searchCommonMetadataFinalApi,
  sortCommonMetadataFinalApi,
  postCommonMetadataFinalApi,
  patchCommonMetadataFinalApi,
  deleteCommonMetadataFinalApi,
} from "../../../services";
import {
  ICommonMetadataFinalGetApi,
  ICommonMetadataFinalPostApi,
  ICommonMetadataFinalPatchApi,
} from "../../../models";
import {
  DeleteCommonMetadataFinalConfirmationModal,
  CommonMetadataFinalFormModal
} from "../index";

import { ICommonMetadataFinalTableProps } from "./index";

export const CommonMetadataFinalTable: React.FC<
  ICommonMetadataFinalTableProps
> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICommonMetadataFinalGetApi = {
    id: "",
    meta_key: "",
    meta_values: "",
    created_at: "",
    meta_values_display: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "Id", type: "text" },
    { key: "meta_key", label: "Key", type: "text" },
{ key: "meta_values", label: "Values", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICommonMetadataFinalGetApi,
    key: "meta_key" as keyof ICommonMetadataFinalGetApi,
    values: "meta_values" as keyof ICommonMetadataFinalGetApi,
    createdAt: "created_at" as keyof ICommonMetadataFinalGetApi,
  };

  const mapToForm = (
    data: ICommonMetadataFinalGetApi
  ): ICommonMetadataFinalGetApi => ({
    id: data.id || "",
    meta_key: data.meta_key || "",
    meta_values: data.meta_values || "",
    created_at: data.created_at || "",
    meta_values_display: data.meta_values_display || "",
  });

  const mapFromForm = (
    data: ICommonMetadataFinalGetApi
  ): Partial<ICommonMetadataFinalPatchApi> => ({
    id: data.id,
    meta_key: data.meta_key,
    meta_values: data.meta_values,
    meta_values_display: data.meta_values_display,
  });

  const mapResponse = (
    response: any
  ): { data: ICommonMetadataFinalGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        meta_key: item.meta_key || "",
        meta_values: item.meta_values || "",
        created_at: item.created_at || "",
        meta_values_display: item.meta_values_display || "",
      })),
    };
  };

  const wrappedDeleteCommonMetadataFinalApi = async (
    id: string
  ): Promise<any> => {
    return await deleteCommonMetadataFinalApi(id);
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
    ICommonMetadataFinalGetApi,
    ICommonMetadataFinalPostApi,
    { page: number; size: number; id?: string; key?: string },
    { id?: string; key?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      key?: string;
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
      key,
    }: {
      page: number;
      size: number;
      id?: string;
      key?: string;
    }) => {
      const response = await getCommonMetadataFinalApi({
        page,
        size,
        id: id || "",
        meta_key : key ||"",
      });
      console.log("getCommonMetadataFinalApi response:", response);
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
      const response = await getTotalCommonMetadataFinalApi({
        id,
        meta_key,
        from,
        to,
      });
      console.log("getTotalCommonMetadataFinalApi response:", response);
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
      const response = await searchCommonMetadataFinalApi({
        page,
        size,
        id,
        meta_key,
        from,
        to,
      });
      console.log("searchCommonMetadataFinalApi response:", response);
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
      const response = await sortCommonMetadataFinalApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCommonMetadataFinalApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCommonMetadataFinalApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getCommonMetadataFinalApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postCommonMetadataFinalApi,
    updateData: patchCommonMetadataFinalApi,
    deleteData: wrappedDeleteCommonMetadataFinalApi,
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
  const setSearchKeyTerm = (value: string) => setFilter("meta_key", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("meta_key");

  const columns = [
    { key: "id" as keyof ICommonMetadataFinalGetApi, header: "ID" },
    {
      key: "meta_key" as keyof ICommonMetadataFinalGetApi,
      header: "Key",
      render: (item: ICommonMetadataFinalGetApi) => {
        const maxLength = 50;
        const displayKey =
          (item.meta_key || "").length > maxLength
            ? (item.meta_key || "").substring(0, maxLength) + "..."
            : item.meta_key || "";
        return <div>{displayKey}</div>;
      },
    },
    {
      key: "meta_values" as keyof ICommonMetadataFinalGetApi,
      header: "Values",
      render: (item: ICommonMetadataFinalGetApi) => {
        const maxLength = 80;
        const displayValues =
          (item.meta_values || "").length > maxLength
            ? (item.meta_values || "").substring(0, maxLength) + "..."
            : item.meta_values || "";
        return <div>{displayValues}</div>;
      },
    },
    {
      key: "meta_values_display" as keyof ICommonMetadataFinalGetApi,
      header: "Display Values",
      render: (item: ICommonMetadataFinalGetApi) => {
        const maxLength = 80;
        const displayMetaValues =
          (item.meta_values_display || "").length > maxLength
            ? (item.meta_values_display || "").substring(0, maxLength) + "..."
            : item.meta_values_display || "";
        return <div>{displayMetaValues}</div>;
      },
    },
    {
      key: "created_at" as keyof ICommonMetadataFinalGetApi,
      header: "Date Created",
      render: (item: ICommonMetadataFinalGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ICommonMetadataFinalGetApi, header: "Actions" },
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
              No metadata found for the selected filters.
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
       <CommonMetadataFinalFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      /> 
      <DeleteCommonMetadataFinalConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
