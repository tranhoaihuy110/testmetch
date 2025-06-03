import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadsReferPartnerActivityApi,
  getTotalLeadsReferPartnerActivityApi,
  searchLeadsReferPartnerActivityApi,
  sortLeadsReferPartnerActivityApi,
  postLeadsReferPartnerActivityApi,
  patchLeadsReferPartnerActivityApi,
  deleteLeadsReferPartnerActivityApi,
} from "../../../services";
import { ILeadPreferPartnerActivityTableProps } from "./index";
import {
  ILeadsReferPartnerActivityGetApi,
  ILeadsReferPartnerActivityPatchApi,
  ILeadsReferPartnerActivityPostApi,
} from "../../../models";
import {
  LeadsReferPartnerActivityFormModal,
  DeleteLeadsReferPartnerActivityConfirmationModal,
} from "../index";

export const LeadsReferPartnerActivityTable: React.FC<
  ILeadPreferPartnerActivityTableProps
> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadsReferPartnerActivityGetApi = {
    id: "",
    refer_partner_id: "",
    json_metadata: {},
    user_action: "",
    note: "",
    status_old: "",
    status_new: "",
    created_at: "",
    updated_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "refer_partner_id", label: "Refer Partner Id", type: "text" },
    { key: "status_old", label: "Address", type: "text" },
    { key: "status_new", label: "Status New", type: "text" },
    { key: "user_action", label: "User Action", type: "text" },
    { key: "note", label: "Note", type: "text" },
    {key: "json_metadata", label: "Json Metadata", type: "text"},
  ];

  const fieldMapping = {
    id: "id" as keyof ILeadsReferPartnerActivityGetApi,
    refer_partner_id:
      "refer_partner_id" as keyof ILeadsReferPartnerActivityGetApi,
    user_action: "user_action" as keyof ILeadsReferPartnerActivityGetApi,
    createdAt: "created_at" as keyof ILeadsReferPartnerActivityGetApi,
  };

  const mapToForm = (
    data: ILeadsReferPartnerActivityGetApi
  ): ILeadsReferPartnerActivityGetApi => ({
    id: data.id || "",
    refer_partner_id: data.refer_partner_id || "",
    json_metadata: data.json_metadata || {"":""},
    user_action: data.user_action || "",
    note: data.note || "",
    status_old: data.status_old || "",
    status_new: data.status_new || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
  });

  const mapFromForm = (
    data: ILeadsReferPartnerActivityGetApi
  ): Partial<ILeadsReferPartnerActivityGetApi> => {
    return {
      id: data.id,
      refer_partner_id: data.refer_partner_id || "",
      json_metadata: data.json_metadata || {"":""},
      user_action: data.user_action,
      note: data.note,
      status_old: data.status_old,
      status_new: data.status_new,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  };

  const mapResponse = (
    response: any
  ): { data: ILeadsReferPartnerActivityGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return { data: response.data };
  };

  const transformToPostData = (
    data: Partial<ILeadsReferPartnerActivityGetApi>
  ): Partial<ILeadsReferPartnerActivityPostApi> => {
    return {
      refer_partner_id: data.refer_partner_id,
      user_action: data.user_action,
      note: data.note,
      status_old: data.status_old,
      status_new: data.status_new,
    };
  };

  const transformToPatchData = (
    data: Partial<ILeadsReferPartnerActivityGetApi>
  ): Partial<ILeadsReferPartnerActivityPatchApi> => {
    return {
      id: data.id,
      refer_partner_id: data.refer_partner_id,
      user_action: data.user_action,
      note: data.note,
      status_old: data.status_old,
      status_new: data.status_new,
    };
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
    ILeadsReferPartnerActivityGetApi,
    ILeadsReferPartnerActivityGetApi,
    { page: number; size: number; id?: string },
    { id?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      refer_partner_id?: string;
      user_action?: string;
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
    }: {
      page: number;
      size: number;
      id?: string;
    }) => {
      const response = await getLeadsReferPartnerActivityApi({
        page,
        size,
        id: id || "",
      });
      console.log("getLeadsReferPartnerActivityApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      from,
      to,
      refer_partner_id,
      user_action,
    }: {
      id?: string;
      from?: string;
      to?: string;
      refer_partner_id?: string;
      user_action?: string;
    }) => {
      const response = await getTotalLeadsReferPartnerActivityApi({
        id,
        from,
        to,
        refer_partner_id,
        user_action,
      });
      console.log(
        "get Total Leads refer partner activity Api response:",
        response
      );
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      refer_partner_id,
      user_action,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      refer_partner_id?: string;
      user_action?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadsReferPartnerActivityApi({
        page,
        size,
        id,
        refer_partner_id,
        user_action,
        from,
        to,
      });
      console.log(
        "search Leads refer partner activity Api response:",
        response
      );
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
      const response = await sortLeadsReferPartnerActivityApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Leads refer partner activity Api response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getLeadsReferPartnerActivityApi({
        page: 1,
        size: 1,
        id,
      });
      console.log(
        "get Leads refer partner activity Api (fetchById) response:",
        response
      );
      if (!response.data || !response.data[0]) {
        throw new Error("Leads refer partner activity not found");
      }
      return response.data[0];
    },
    addData: async (data: Partial<ILeadsReferPartnerActivityGetApi>) => {
      const transformedData = transformToPostData(data);
      const response = await postLeadsReferPartnerActivityApi(transformedData);
      console.log("post Leads Refer Partner Activity Api response:", response);
      return response;
    },
    updateData: async (data: Partial<ILeadsReferPartnerActivityGetApi>) => {
      const transformedData = transformToPatchData(data);
      const response = await patchLeadsReferPartnerActivityApi(transformedData);
      console.log("patch Leads Refer Partner Activity Api response:", response);
      return response;
    },
    deleteData: deleteLeadsReferPartnerActivityApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchEmailTerm =
    filters.user_action !== undefined && filters.user_action !== null
      ? String(filters.user_action)
      : "";
  const searchAddressTerm =
    filters.user_action !== undefined && filters.user_action !== null
      ? String(filters.user_action)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchEmailTerm = (value: string) =>
    setFilter("user_action", value || null);
  const setSearchAddressTerm = (value: string) =>
    setFilter("user_action", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchEmail = () => handleClearFilter("user_action");
  const handleClearSearchAddress = () => handleClearFilter("user_action");

  const columns = [
    {
      key: "id" as keyof ILeadsReferPartnerActivityGetApi,
      header: "ID",
    },
    {
      key: "refer_partner_id" as keyof ILeadsReferPartnerActivityGetApi,
      header: "Refer Partner Id",
    },
    {
      key: "user_action" as keyof ILeadsReferPartnerActivityGetApi,
      header: "User Action",
    },
    {
      key: "note" as keyof ILeadsReferPartnerActivityGetApi,
      header: "Note",
    },
    {
      key: "created_at" as keyof ILeadsReferPartnerActivityGetApi,
      header: "Date Created",
      render: (item: ILeadsReferPartnerActivityGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof ILeadsReferPartnerActivityGetApi,
      header: "Date Updated",
      render: (item: ILeadsReferPartnerActivityGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof ILeadsReferPartnerActivityGetApi,
      header: "Actions",
    },
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
          setSearchNameTerm={setSearchEmailTerm}
          searchPhoneTerm={searchAddressTerm}
          setSearchUsernameTerm={setSearchAddressTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchEmail}
          handleClearSearchPhone={handleClearSearchAddress}
          setSearchPhoneTerm={setSearchAddressTerm}
          handleClearSearchUsername={handleClearSearchId}
          searchUsernameTerm={searchEmailTerm}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by ID"
          idSearchType="text"
          secondSearchLabel="Search by User Action"
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
              No leads refer partner activity found for the selected filters.
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
      <LeadsReferPartnerActivityFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadsReferPartnerActivityConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        onReset={handleReset}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
