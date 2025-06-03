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
    getPotentialLeadActionApi,
    getTotalPotentialLeadActionApi,
    searchPotentialLeadActionApi,
    sortPotentialLeadActionApi,
    postPotentialLeadActionApi,
    patchPotentialLeadActionApi,
    deletePotentialLeadActionApi,
} from "../../../services";
import { IPotentialLeadActionTableProps } from "./index";
import { IPotentialLeadActionGetApi,IPotentialLeadActionPatchApi } from "../../../models";
import {
  // PotentialLeadActionFormModal,
  DeletePotentialLeadActionConfirmationModal,
} from "../index";

export const PotentialLeadActionTable: React.FC<IPotentialLeadActionTableProps> = (props) => {
    const { children = "" } = props;

    const initialFormData: IPotentialLeadActionGetApi = {
    id: "",
    potential_lead_id: "",
    last_name: "",
    list_potential_lead_id: "",
    action_username: "",
    action_username_id: "",
    json_data: {},
    action_type: "",
    create_at: "",
    };

    const filterConfig: FilterConfig[] = [
    { key: "id", label: " ID", type: "text" },
    { key: "potential_lead_id", label: "Potential Lead ID", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" },
    ];

    const fieldMapping = {
    id: "id" as keyof IPotentialLeadActionGetApi,
    potential_lead_id: "potential_lead_id" as keyof IPotentialLeadActionGetApi,
    last_name: "last_name" as keyof IPotentialLeadActionGetApi,
    createdAt: "create_at" as keyof IPotentialLeadActionGetApi,
    };

    const mapToForm = (data: IPotentialLeadActionGetApi): IPotentialLeadActionGetApi => ({
        id: data.id || "",
        potential_lead_id: data.potential_lead_id || "",
        last_name: data.last_name|| "",
        list_potential_lead_id: data.list_potential_lead_id || "",
        action_username: data.action_username|| "",
        action_username_id: data.action_username_id || "",
        json_data: data.json_data|| {},
        action_type: data.action_type|| "",
        create_at: data.create_at|| "",
    });

    const mapFromForm = (data: IPotentialLeadActionGetApi): Partial<IPotentialLeadActionPatchApi> => {
    return {
        id: data.id,
        potential_lead_id: data.potential_lead_id,
        list_potential_lead_id: data.list_potential_lead_id,
        action_username: data.action_username,
        action_username_id: data.action_username_id,
        json_data: data.json_data,
        action_type: data.action_type,
    };
    };

    const mapResponse = (response: any ): { data: IPotentialLeadActionGetApi[] } => {
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
    IPotentialLeadActionGetApi,
    IPotentialLeadActionGetApi,
    { page: number; size: number; id?: string },
    { id?: string; from?: string; to?: string },
    { page: number; size: number; id?: string; potential_lead_id?: string; last_name?: string; from?: string; to?: string },
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
      const response = await getPotentialLeadActionApi({
        page,
        size,
        id: id || "",
      });
      console.log("get Potential Lead Action Api response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      from,
      to,
      potential_lead_id,
    }: {
      id?: string;
      from?: string;
      to?: string;
      potential_lead_id?:string;
    }) => {
      const response = await getTotalPotentialLeadActionApi({
        id,
        from,
        to,
        potential_lead_id,
      });
      console.log("get Total Potential Lead Action Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      potential_lead_id,
      last_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      potential_lead_id?: string;
      last_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPotentialLeadActionApi({
        page,
        size,
        id,
        potential_lead_id,
        last_name,
        from,
        to,
      });
      console.log("search Potential Lead Action Api response:", response);
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
      const response = await sortPotentialLeadActionApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Potential Lead Action Api response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getPotentialLeadActionApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("get Potential Lead Action Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Potential Lead Action not found");
      }
      return response.data[0];
    },
    addData: postPotentialLeadActionApi,
    updateData: patchPotentialLeadActionApi,
    deleteData: deletePotentialLeadActionApi,
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
    filters.potential_lead_id !== undefined && filters.potential_lead_id !== null
      ? String(filters.potential_lead_id)
      : "";
  const searchAddressTerm =
    filters.last_name !== undefined && filters.last_name !== null
      ? String(filters.last_name)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("potential_lead_id", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("last_name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchEmail = () => handleClearFilter("potential_lead_id");
  const handleClearSearchAddress = () => handleClearFilter("last_name");

  const columns = [
  { key: "id" as keyof IPotentialLeadActionGetApi, header: "ID" },
  { key: "potential_lead_id" as keyof IPotentialLeadActionGetApi, header: "Potential lead ID" },
  { key: "last_name" as keyof IPotentialLeadActionGetApi, header: "Last Name " },
  { key: "action_username" as keyof IPotentialLeadActionGetApi, header: "Action UserName " },
  {
    key: "create_at" as keyof IPotentialLeadActionGetApi,
    header: "Date Created",
    render: (item: IPotentialLeadActionGetApi) =>
      new Date(item.create_at || "").toLocaleString(),
  },
  { key: "actions" as keyof IPotentialLeadActionGetApi, header: "Actions" },
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
          secondSearchLabel="Search by Potential Lead ID"
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
              No lead Potential Lead Action found for the selected filters.
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
      {/* <PotentialLeadActionFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      /> */}
      <DeletePotentialLeadActionConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};