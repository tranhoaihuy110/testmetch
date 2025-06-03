import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getAppConFigApi,
  getTotalAppConfigApi,
  searchAppConfigApi,
  sortAppConfigApi,
  postAppConfigApi,
  patchAppConfigApi,
  deleteAppConfigApi,
} from "../../../services";
import { IAppConfigTableProps } from "./index";
import { IAppConfigGetApi } from "../../../models";
import { AppConfigFormModal, DeleteAppConfigConfirmationModal } from "../index";

export const AppConfigTable: React.FC<IAppConfigTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IAppConfigGetApi = {
    key: "",
    value: "",
    description: "",
    created_at: "",
    updated_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "key", label: "Key", type: "text" },
    { key: "value", label: "Value", type: "text" },
  ];

  const fieldMapping = {
    id: "key" as keyof IAppConfigGetApi,
    name: "value" as keyof IAppConfigGetApi,
    createdAt: "created_at" as keyof IAppConfigGetApi,
  };

  const mapToForm = (data: IAppConfigGetApi): IAppConfigGetApi => ({
    key: data.key || "",
    value: data.value || "",
    description: data.description || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
  });

  const mapFromForm = (data: IAppConfigGetApi): Partial<IAppConfigGetApi> => ({
    key: data.key,
    value: data.value,
    description: data.description || null,
  });

  const mapResponse = (response: any): { data: IAppConfigGetApi[] } => {
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
    IAppConfigGetApi,
    IAppConfigGetApi,
    { page: number; size: number; key?: string },
    { key?: string; from?: string; to?: string },
    { page: number; size: number; key?: string; from?: string; to?: string },
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
      key,
    }: {
      page: number;
      size: number;
      key?: string;
    }) => {
      const response = await getAppConFigApi({
        page,
        size,
        key: key || "",
      });
      console.log("getAppConFigApi response:", response);
      return response;
    },
    fetchTotal: async ({
      key,
      from,
      to,
    }: {
      key?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalAppConfigApi({
        key,
        from,
        to,
      });
      console.log("getTotalAppConfigApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      key,
      from,
      to,
    }: {
      page: number;
      size: number;
      key?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchAppConfigApi({
        page,
        size,
        key,
        from,
        to,
      });
      console.log("searchAppConfigApi response:", response);
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
      const response = await sortAppConfigApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortAppConfigApi response:", response);
      return response;
    },
    fetchById: async (key: string) => {
      const response = await getAppConFigApi({
        page: 1,
        size: 1,
        key,
      });
      console.log("getAppConFigApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("App Config not found");
      }
      return response.data[0];
    },
    addData: postAppConfigApi,
    updateData: patchAppConfigApi,
    deleteData: deleteAppConfigApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchKeyTerm =
    filters.key !== undefined && filters.key !== null
      ? String(filters.key)
      : "";
  const searchValueTerm =
    filters.value !== undefined && filters.value !== null
      ? String(filters.value)
      : "";

  const setSearchKeyTerm = (value: string) => setFilter("key", value || null);
  const setSearchValueTerm = (value: string) =>
    setFilter("value", value || null);

  const handleClearSearchKey = () => handleClearFilter("key");
  const handleClearSearchValue = () => handleClearFilter("value");

  const columns = [
    { key: "key" as keyof IAppConfigGetApi, header: "Key" },
    {
      key: "value" as keyof IAppConfigGetApi,
      header: "Value",
      render: (item: IAppConfigGetApi) => {
        const maxLength = 80;
        const displayValue =
          (item.value || "").length > maxLength
            ? (item.value || "").substring(0, maxLength) + "..."
            : item.value || "";
        return <div>{displayValue}</div>;
      },
    },
    { key: "description" as keyof IAppConfigGetApi, header: "Description" },
    {
      key: "created_at" as keyof IAppConfigGetApi,
      header: "Date Created",
      render: (item: IAppConfigGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof IAppConfigGetApi,
      header: "Date Updated",
      render: (item: IAppConfigGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    { key: "actions" as keyof IAppConfigGetApi, header: "Actions" },
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
          searchIdTerm={searchKeyTerm}
          setSearchIdTerm={setSearchKeyTerm}
          searchNameTerm={searchValueTerm}
          setSearchNameTerm={setSearchValueTerm}
          handleClearSearchId={handleClearSearchKey}
          handleClearSearchName={handleClearSearchValue}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={true}
          firstSearchLabel="Search by Key"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchKeyTerm}
          setSearchUsernameTerm={setSearchKeyTerm}
          handleClearSearchPhone={handleClearSearchValue}
          handleClearSearchUsername={handleClearSearchValue}
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
              No app configs found for the selected filters.
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
      <AppConfigFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onReset={handleReset}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteAppConfigConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
