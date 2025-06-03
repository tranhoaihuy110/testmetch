/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadNotesApi,
  getTotalLeadNotesApi,
  searchLeadNotesApi,
  sortLeadNotesApi,
  postLeadNotesApi,
  patchLeadNotesApi,
  deleteLeadNotesApi,
} from "../../../services";
import { ILeadNotesTableProps } from "./index";
import { ILeadNotesGetApi,ILeadNotesPatchApi } from "../../../models";
import {
  LeadNotesFormModal,
  DeleteLeadNotesConfirmationModal,
} from "../index";

export const LeadNotesTable: React.FC<ILeadNotesTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadNotesGetApi = {
    note_id: "",
    lead_id: 0,
    email: "",
    note_text: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "note_id", label: " Note Id ", type: "text" },
    { key: "lead_id", label: "Lead Id", type: "text" },
    { key: "note_text", label: "Note Text", type: "text" },
  ];

  const fieldMapping = {
    id: "note_id" as keyof ILeadNotesGetApi,
    name: "lead_id" as keyof ILeadNotesGetApi,
    type: "note_text" as keyof ILeadNotesGetApi,
    createdAt: "created_at" as keyof ILeadNotesGetApi,
  };

  const mapToForm = (data: ILeadNotesGetApi): ILeadNotesGetApi => ({
        note_id: data.note_id || "",
        lead_id: data.lead_id|| 0,
        email: data.email || "",
        note_text: data.note_text|| "",
        created_at: data.created_at || "",
  });

  const mapFromForm = (data: ILeadNotesGetApi): Partial<ILeadNotesPatchApi> => {
    return {
      note_id: data.note_id,
      lead_id: data.lead_id,
      note_text: data.note_text,
    };
  };

  const mapResponse = (response: any ): { data: ILeadNotesGetApi[] } => {
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
    ILeadNotesGetApi,
    ILeadNotesGetApi,
    { page: number; size: number; note_id?: string },
    { note_id?: string; from?: string; to?: string },
    { page: number; size: number; note_id?: string; lead_id?: string; keysearch?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      note_id,
    }: {
      page: number;
      size: number;
      note_id?: string;
    }) => {
      const response = await getLeadNotesApi({
        page,
        size,
        note_id: note_id || "",
      });
      console.log("get Lead Note Api response:", response);
      return response;
    },
    fetchTotal: async ({
      note_id,
      from,
      to,
      lead_id,
    }: {
      note_id?: string;
      from?: string;
      to?: string;
      lead_id?:string;
    }) => {
      const response = await getTotalLeadNotesApi({
        note_id,
        from,
        to,
        lead_id,
      });
      console.log("get Total Lead Note Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      note_id,
      lead_id,
      note_text,
      from,
      to,
    }: {
      page: number;
      size: number;
      note_id?: string;
      lead_id?: string;
      note_text?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadNotesApi({
        page,
        size,
        note_id,
        lead_id,
        note_text,
        from,
        to,
      });
      console.log("search Lead Note Api response:", response);
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
      const response = await sortLeadNotesApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Lead Note Api response:", response);
      return response;
    },
    fetchById: async (note_id: string) => {
      const response = await getLeadNotesApi({
        page: 1,
        size: 1,
        note_id,
      });
      console.log("get Lead Note Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Lead Note not found");
      }
      return response.data[0];
    },
    addData: postLeadNotesApi,
    updateData: patchLeadNotesApi,
    deleteData: deleteLeadNotesApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.note_id !== undefined && filters.note_id !== null
      ? String(filters.note_id)
      : "";
  const searchEmailTerm =
    filters.lead_id !== undefined && filters.lead_id !== null
      ? String(filters.lead_id)
      : "";
  const searchAddressTerm =
    filters.note_text !== undefined && filters.note_text !== null
      ? String(filters.note_text)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("note_id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("lead_id", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("note_text", value || null);

  const handleClearSearchId = () => handleClearFilter("note_id");
  const handleClearSearchEmail = () => handleClearFilter("lead_id");
  const handleClearSearchAddress = () => handleClearFilter("note_text");

  const columns = [
  { key: "note_id" as keyof ILeadNotesGetApi, header: "Note ID" },
  { key: "lead_id" as keyof ILeadNotesGetApi, header: "Lead ID" },
  { key: "note_text" as keyof ILeadNotesGetApi, header: "Note Text" },
  {
    key: "created_at" as keyof ILeadNotesGetApi,
    header: "created_at",
  },
  { key: "actions" as keyof ILeadNotesGetApi, header: "Actions" },
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
          firstSearchLabel="Search by Note ID"
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
              No lead LeadNotes found for the selected filters.
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
      <LeadNotesFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadNotesConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};