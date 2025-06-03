/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadAssignmentApi,
  getTotalLeadAssignmentApi,
  searchLeadAssignmentApi,
  sortLeadAssignmentApi,
  postLeadAssignmentApi,
  patchLeadAssignmentApi,
  deleteLeadAssignmentApi,
} from "../../../services";
import { ILeadAssignmentTableProps } from "./index";
import { ILeadAssignmentGetApi,ILeadAssignmentPatchApi } from "../../../models";
import {
  LeadAssignmentFormModal,
  DeleteLeadAssignmentConfirmationModal,
} from "../index";

export const LeadAssignmentTable: React.FC<ILeadAssignmentTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadAssignmentGetApi = {
    assignment_id: "",
    lead_id: "",
    email: "",
    assigned_to_id: "",
    assigned_to: "",
    assigned_date: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "assignment_id", label: " Assignment Id ", type: "text" },
    { key: "lead_id", label: "Lead Id", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "assigned_to_id", label: "assignned to Id", type: "text" },
    { key: "assigned_to", label: "assigned Text", type: "text" },
    { key: "assigned_date", label: "Assigned Date", type: "text" },
  ];

  const fieldMapping = {
    id: "assignment_id" as keyof ILeadAssignmentGetApi,
    name: "lead_id" as keyof ILeadAssignmentGetApi,
    email: "email" as keyof ILeadAssignmentGetApi,
    assigned_to_id: "assigned_to_id" as keyof ILeadAssignmentGetApi,
    assigned_to: "assigned_to" as keyof ILeadAssignmentGetApi,
    assigned_date: "assigned_date" as keyof ILeadAssignmentGetApi,
  };

  const mapToForm = (data: ILeadAssignmentGetApi): ILeadAssignmentGetApi => ({
        assignment_id: data.assignment_id || "",
        lead_id: data.lead_id|| "",
        email: data.email || "",
        assigned_to_id: data.assigned_to_id|| "",
        assigned_to: data.assigned_to|| "",
        assigned_date: data.assigned_date || "",
  });

  const mapFromForm = (data: ILeadAssignmentGetApi): Partial<ILeadAssignmentPatchApi> => {
    return {
      assignment_id: data.assignment_id,
      lead_id: data.lead_id,
      email: data.email,
      assigned_to_id: data.assigned_to_id,
      assigned_to: data.assigned_to,
      assigned_date: data.assigned_date,
    };
  };

  const mapResponse = (response: any ): { data: ILeadAssignmentGetApi[] } => {
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
    ILeadAssignmentGetApi,
    ILeadAssignmentGetApi,
    { page: number; size: number; assignment_id?: string },
    { assignment_id?: string; from?: string; to?: string },
    { page: number; size: number; assignment_id?: string; lead_id?: string; keysearch?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      assignment_id,
    }: {
      page: number;
      size: number;
      assignment_id?: string;
    }) => {
      const response = await getLeadAssignmentApi({
        page,
        size,
        assignment_id: assignment_id || "",
      });
      console.log("get Lead assignments Api response:", response);
      return response;
    },
    fetchTotal: async ({
      assignment_id,
      from,
      to,
      lead_id,
    }: {
      assignment_id?: string;
      from?: string;
      to?: string;
      lead_id?:string;
    }) => {
      const response = await getTotalLeadAssignmentApi({
        assignment_id,
        from,
        to,
        lead_id,
      });
      console.log("get Total Lead assginments Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      assignment_id,
      lead_id,
      email,
      from,
      to,
    }: {
      page: number;
      size: number;
      assignment_id?: string;
      lead_id?: string;
      email?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadAssignmentApi({
        page,
        size,
        assignment_id,
        lead_id,
        email,
        from,
        to,
      });
      console.log("search Lead assignments Api response:", response);
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
      const response = await sortLeadAssignmentApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Lead assignments Api response:", response);
      return response;
    },
    fetchById: async (assignment_id: string) => {
      const response = await getLeadAssignmentApi({
        page: 1,
        size: 1,
        assignment_id,
      });
      console.log("get Lead assignments Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Lead assignments not found");
      }
      return response.data[0];
    },
    addData: postLeadAssignmentApi,
    updateData: patchLeadAssignmentApi,
    deleteData: deleteLeadAssignmentApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.assignment_id !== undefined && filters.assignment_id !== null
      ? String(filters.assignment_id)
      : "";
  const searchEmailTerm =
    filters.lead_id !== undefined && filters.lead_id !== null
      ? String(filters.lead_id)
      : "";
  const searchAddressTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("assignment_id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("lead_id", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("email", value || null);

  const handleClearSearchId = () => handleClearFilter("assignment_id");
  const handleClearSearchEmail = () => handleClearFilter("lead_id");
  const handleClearSearchAddress = () => handleClearFilter("email");

  const columns = [
    { key: "assignment_id" as keyof ILeadAssignmentGetApi, header: "Assignments ID" },
    { key: "lead_id" as keyof ILeadAssignmentGetApi, header: "Lead ID" },
    { key: "email" as keyof ILeadAssignmentGetApi, header: "Email" },
    { key: "assigned_to_id" as keyof ILeadAssignmentGetApi, header: "Assignments to id" },
    { key: "assigned_to" as keyof ILeadAssignmentGetApi, header: "Assignments to" },
    {
    key: "assigned_date" as keyof ILeadAssignmentGetApi,
    header: "assigned_date",
    },
    { key: "actions" as keyof ILeadAssignmentGetApi, header: "Actions" },
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
          firstSearchLabel="Search by Assignments ID"
          secondSearchLabel="Search by Lead ID"
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
              No lead LeadAssignment found for the selected filters.
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
      <LeadAssignmentFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadAssignmentConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};