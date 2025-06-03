/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadsApi,
  getTotalLeadsApi,
  searchLeadsApi,
  sortLeadsApi,
  postLeadsApi,
  patchLeadsApi,
  deleteLeadsApi,
} from "../../../services";
import { ILeadsGetApi } from "../../../models";
import { LeadFormModal, DeleteLeadConfirmationModal } from "../index";
import { ILeadTableProps } from "./index";

export const LeadTable: React.FC<ILeadTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadsGetApi = {
    lead_id: "",
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null,
    company_name: null,
    job_title: null,
    lead_source: null,
    lead_stage: null,
    lead_status: null,
    created_at: "",
    updated_at: "",
    json_moredata: {},
    salesforce_lead_id: null,
  };

  const filterConfig: FilterConfig[] = [
    { key: "lead_id", label: "Lead ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "phone_number", label: "Phone Number", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" }, 
  ];

  const fieldMapping = {
    id: "lead_id" as keyof ILeadsGetApi,
    email: "email" as keyof ILeadsGetApi,
    phone_number: "phone_number" as keyof ILeadsGetApi,
    createdAt: "created_at" as keyof ILeadsGetApi,
  };

  const mapToForm = (data: ILeadsGetApi): ILeadsGetApi => ({
    lead_id: data.lead_id || "",
    first_name: data.first_name || null,
    last_name: data.last_name || null, 
    email: data.email || null,
    phone_number: data.phone_number || null,
    company_name: data.company_name || null,
    job_title: data.job_title || null,
    lead_source: data.lead_source || null,
    lead_stage: data.lead_stage || null,
    lead_status: data.lead_status || null,
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    json_moredata: data.json_moredata || "",
    salesforce_lead_id: data.salesforce_lead_id || null,
  });

  const mapFromForm = (data: ILeadsGetApi): Partial<ILeadsGetApi> => ({
    lead_id: data.lead_id,
    first_name: data.first_name,
    last_name: data.last_name, 
    email: data.email,
    phone_number: data.phone_number,
    company_name: data.company_name,
    job_title: data.job_title,
    lead_source: data.lead_source,
    lead_stage: data.lead_stage,
    lead_status: data.lead_status,
    json_moredata: data.json_moredata,
    salesforce_lead_id: data.salesforce_lead_id,
  });

  const mapResponse = (response: any): { data: ILeadsGetApi[] } => {
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
    ILeadsGetApi,
    ILeadsGetApi,
    { page: number; size: number; lead_id?: string },
    {
      lead_id?: string;
      from?: string;
      to?: string;
      email?: string;
      phone_number?: string;
      last_name?: string;
    },
    {
      page: number;
      size: number;
      lead_id?: string;
      email?: string;
      phone_number?: string;
      last_name?: string;
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
      lead_id,
    }: {
      page: number;
      size: number;
      lead_id?: string;
    }) => {
      const response = await getLeadsApi({
        page,
        size,
        lead_id: lead_id,
      });
      console.log("getLeadsApi response:", response);
      return response;
    },
    fetchTotal: async ({
      lead_id,
      from,
      to,
      email,
      phone_number,
      last_name,
    }: {
      lead_id?: string;
      from?: string;
      to?: string;
      email?: string;
      phone_number?: string;
      last_name?: string;
    }) => {
      const response = await getTotalLeadsApi({
        lead_id,
        from,
        to,
        email,
        phone_number,
        last_name,
      });
      console.log("getTotalLeadsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      lead_id,
      email,
      phone_number,
      last_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      lead_id?: string;
      email?: string;
      phone_number?: string;
      last_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadsApi({
        page,
        size,
        lead_id,
        email,
        phone_number,
        last_name,
        from,
        to,
      });
      console.log("searchLeadsApi response:", response);
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
      const response = await sortLeadsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortLeadsApi response:", response);
      return response;
    },
    fetchById: async (lead_id: string) => {
      const response = await getLeadsApi({
        page: 1,
        size: 1,
        lead_id: lead_id,
      });
      console.log("getLeadsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Lead not found");
      }
      return response.data[0];
    },
    addData: postLeadsApi,
    updateData: patchLeadsApi,
    deleteData: deleteLeadsApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.lead_id !== undefined && filters.lead_id !== null
      ? String(filters.lead_id)
      : "";
  const searchNameTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";
  const searchPhoneTerm =
    filters.phone_number !== undefined && filters.phone_number !== null
      ? String(filters.phone_number)
      : "";
  const searchUsernameTerm =
    filters.last_name !== undefined && filters.last_name !== null
      ? String(filters.last_name)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("lead_id", value || null);
  const setSearchNameTerm = (value: string) =>
    setFilter("email", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone_number", value || null);
  const setSearchUserNameTerm = (value: string) =>
    setFilter("last_name", value || null);

  const handleClearSearchId = () => handleClearFilter("lead_id");
  const handleClearSearchName = () => handleClearFilter("email");
  const handleClearSearchPhone = () => handleClearFilter("phone_number");
  const handleClearSearchUsername = () => handleClearFilter("last_name");
  const columns = [
    { key: "lead_id" as keyof ILeadsGetApi, header: "Lead ID" },
    { key: "email" as keyof ILeadsGetApi, header: "Email" },
    { key: "phone_number" as keyof ILeadsGetApi, header: "Phone Number" },
    { key: "last_name" as keyof ILeadsGetApi, header: "Last Name" },
    {
      key: "created_at" as keyof ILeadsGetApi,
      header: "Date Created",
      render: (item: ILeadsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof ILeadsGetApi,
      header: "Date Updated",
      render: (item: ILeadsGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ILeadsGetApi, header: "Actions" },
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
          searchNameTerm={searchNameTerm}
          setSearchNameTerm={setSearchNameTerm}
          searchPhoneTerm={searchPhoneTerm}
          setSearchPhoneTerm={setSearchPhoneTerm}
          searchUsernameTerm={searchUsernameTerm}
          setSearchUsernameTerm={setSearchUserNameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchName}
          handleClearSearchPhone={handleClearSearchPhone}
          handleClearSearchUsername={handleClearSearchUsername}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by Lead ID"
          thirdSearchLabel="Search by Last Name"
          fourthSearchLabel="Search by Phone Number"
          idSearchType="text"
          hidePhoneEmail={false}
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
              No leads found for the selected filters.
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
      <LeadFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
