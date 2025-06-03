import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getSfMartLeadsApi,
  getTotalSfMartLeadsApi,
  searchSfMartLeadsApi,
  sortSfMartLeadsApi,
  postSfMartLeadsApi,
  patchSfMartLeadsApi,
  deleteSfMartLeadsApi,
} from "../../../services";
import { ISfMartLeadsTableProps } from "./index";
import { ISfMartLeadsGetApi,ISfMartLeadsPatchApi } from "../../../models";
import {
  DeleteSfMartLeadsConfirmationModal, SfMartLeadsFormModal
} from "../index";
export const SfMartLeadsTable: React.FC<ISfMartLeadsTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ISfMartLeadsGetApi = {
    id: "",
    username: "",
    salesforce_id: "",
    data_type: "",
    salesforce_lead_id: "",
    json_data_lv1: {},
    created_at: "",
    json_data_lv2: {},
    json_data_lv3: {},  
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "username", label: "Username", type: "text" },
    { key: "data_type", label: "Data Type", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ISfMartLeadsGetApi,
    username: "username" as keyof ISfMartLeadsGetApi,
    address: "data_type" as keyof ISfMartLeadsGetApi,
    createdAt: "created_at" as keyof ISfMartLeadsGetApi,
  };

  const mapToForm = (data: ISfMartLeadsGetApi): ISfMartLeadsGetApi => ({
    id: data.id || "",
    username: data.username || "",
    data_type: data.data_type || "",
    created_at: data.created_at || "",
    json_data_lv1: data.json_data_lv1 || {},
    json_data_lv2: data.json_data_lv2 || {},
    json_data_lv3: data.json_data_lv3 || {},
    salesforce_id: data.salesforce_id || "",
    salesforce_lead_id: data.salesforce_lead_id || "",
  });

  const mapFromForm = (data: ISfMartLeadsGetApi): Partial<ISfMartLeadsPatchApi> => {
    return {
      id: data.id,
      username: data.username,
      salesforce_id: data.salesforce_id,
      data_type: data.data_type,
      json_data_lv1: data.json_data_lv1 || {},
      json_data_lv2: data.json_data_lv2 || {},
      json_data_lv3: data.json_data_lv3 || {},
      salesforce_lead_id: data.salesforce_lead_id || "",
  } ; };

 
  const mapResponse = (response: any): { data: ISfMartLeadsGetApi[] } => {
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
    ISfMartLeadsGetApi,
    ISfMartLeadsGetApi,
    { page: number; size: number; id?: string },
    { id?: string; from?: string; to?: string },
    { page: number; size: number; id?: string; username?: string; data_type?: string; from?: string; to?: string },
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
      const response = await getSfMartLeadsApi({
        page,
        size,
        id: id || "",
      });
      console.log("getSfMartLeadsApi response:", response);
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
      username?: string;
    }) => {
      const response = await getTotalSfMartLeadsApi({
        id,
        from,
        to,
        username: username || "",
      });
      console.log("getTotalSfMartLeadsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      username,
      data_type,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      username?: string;
      data_type?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchSfMartLeadsApi({
        page,
        size,
        id,
        username,
        data_type,
        from,
        to,
      });
      console.log("searchSfMartLeadsApi response:", response);
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
      const response = await sortSfMartLeadsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortSfMartLeadsApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getSfMartLeadsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getSfMartLeadsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Sf Mart Leads not found");
      }
      return response.data[0];
    },
    addData: postSfMartLeadsApi,
    updateData: patchSfMartLeadsApi,
    deleteData: deleteSfMartLeadsApi,
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
  const searchUsernameTerm =
    filters.username !== undefined && filters.username !== null
      ? String(filters.username)
      : "";
  const searchDataTypeTerm =
    filters.data_type !== undefined && filters.data_type !== null
      ? String(filters.data_type)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("id", value || null);
  const setSearchUsernameTerm = (value: string) =>
    setFilter("username", value || null);
  const setSearchDataTypeTerm = (value: string) =>
    setFilter("data_type", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchUsername = () => handleClearFilter("username");
  const handleClearSearchDataType = () => handleClearFilter("data_type");

  const columns = [
    { key: "id" as keyof ISfMartLeadsGetApi, header: "ID" },
    { key: "username" as keyof ISfMartLeadsGetApi, header: "Username" },
    { key: "data_type" as keyof ISfMartLeadsGetApi, header: "Data Type" },
    {
      key: "created_at" as keyof ISfMartLeadsGetApi,
      header: "Date Created",
      render: (item: ISfMartLeadsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },

    { key: "actions" as keyof ISfMartLeadsGetApi, header: "Actions" },
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
          searchNameTerm={searchUsernameTerm}
          setSearchNameTerm={setSearchUsernameTerm}
          searchPhoneTerm={searchDataTypeTerm}
          setSearchPhoneTerm={setSearchDataTypeTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchUsername}
          handleClearSearchPhone={handleClearSearchDataType}
          handleClearSearchUsername={handleClearSearchId}
          searchUsernameTerm={searchUsernameTerm}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by  ID"
          secondSearchLabel="Search by Username"
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
              No lead properties found for the selected filters.
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
      <SfMartLeadsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteSfMartLeadsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};