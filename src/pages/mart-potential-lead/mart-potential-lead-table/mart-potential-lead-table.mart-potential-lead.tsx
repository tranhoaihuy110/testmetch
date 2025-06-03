import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getMartPotentialLeadApi,
  getTotalMartPotentialLeadApi,
  searchMartPotentialLeadsApi,
  sortMartPotentialLeadsApi,
  postMartPotentialLeadApi,
  patchMartPotentialLeadApi,
  deleteMartPotentialLeadApi,
} from "../../../services";
import { IMartPotentialLeadTableProps } from "./index";
import { IMartPotentialLeadGetApi,IMartPotentialLeadPatchApi } from "../../../models";
import {
  DeleteMartPotentialLeadConfirmationModal,MartPotentialLeadFormModal
} from "../index";

export const MartPotentialLeadTable: React.FC<IMartPotentialLeadTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IMartPotentialLeadGetApi = {
    potential_lead_id: "",
    property_name: "",
    property_type: "",
    description: "",
    lead_property_type: "",
    json_address: {},
    full_address: "",
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    city: "",
    state: null,
    postal_code: "",
    price: null,
    size: null,
    created_at: "",
    created_by: "",
    updated_at: "",
    potential_lead_status: "",
    potential_lead_assigned_to: "",
    add_to_lead: "",
    json_manual_to_lead: {},
    
  };

  const filterConfig: FilterConfig[] = [
    { key: "potential_lead_id", label: "Potential Lead ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address", label: "Address", type: "text" },
    { key: "last_name", label: "Last Name", type: "text" },
  ];

  const fieldMapping = {
    id: "potential_lead_id" as keyof IMartPotentialLeadGetApi,
    email: "email" as keyof IMartPotentialLeadGetApi,
    address: "address" as keyof IMartPotentialLeadGetApi,
    lastName: "last_name" as keyof IMartPotentialLeadGetApi,
    createdAt: "created_at" as keyof IMartPotentialLeadGetApi,
  };

  const mapToForm = (data: IMartPotentialLeadGetApi): IMartPotentialLeadGetApi => ({
    potential_lead_id: data.potential_lead_id || "",
    email: data.email || "",
    address: data.address || "",
    last_name: data.last_name || "",
    created_at: data.created_at || "",
    property_name: data.property_name || "",
    property_type: data.property_type || "",
    description: data.description || "",
    lead_property_type: data.lead_property_type || "",
    json_address: data.json_address || {},
    full_address: data.full_address || "",
    first_name: data.first_name || "",
    phone_number: data.phone_number || "",
    country: data.country || "",
    city: data.city || "",
    state: data.state || null,
    postal_code: data.postal_code || "",
    price: data.price || null,
    size: data.size || null,
    created_by: data.created_by || "",
    updated_at: data.updated_at || "",
    potential_lead_status: data.potential_lead_status || "",
    potential_lead_assigned_to: data.potential_lead_assigned_to || "",
    add_to_lead: data.add_to_lead || "",
    json_manual_to_lead: data.json_manual_to_lead || {},
  });

  const mapFromForm = (data: IMartPotentialLeadGetApi): Partial<IMartPotentialLeadPatchApi> => {
    return {
      potential_lead_id: data.potential_lead_id,
      property_name: data.property_name,
      property_type: data.property_type,
      description: data.description,
      lead_property_type: data.lead_property_type,
      json_address: data.json_address || {},
      full_address: data.full_address,
      first_name: data.first_name || "",
      last_name: data.last_name,
      email: data.email,
      country: data.country || "",
      phone_number: data.phone_number || "",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      postal_code: data.postal_code || "",
      price: data.price !== null && data.price !== undefined ? String(data.price) : undefined,
      size: data.size !== null && data.size !== undefined ? String(data.size) : "",
      created_by: data.created_by || "",
      potential_lead_status: data.potential_lead_status || "",
      potential_lead_assigned_to: data.potential_lead_assigned_to || "",
      add_to_lead: data.add_to_lead !== undefined && data.add_to_lead !== null ? String(data.add_to_lead) : undefined,
      json_manual_to_lead: data.json_manual_to_lead || {},

    };
  };

  const mapResponse = (response: any): { data: IMartPotentialLeadGetApi[] } => {
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
    IMartPotentialLeadGetApi,
    IMartPotentialLeadGetApi,
    { page: number; size: number; potential_lead_id?: string },
    { potential_lead_id?: string; from?: string; to?: string },
    { page: number; size: number; potential_lead_id?: string; email?: string; address?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      potential_lead_id,
    }: {
      page: number;
      size: number;
      potential_lead_id?: string;
    }) => {
      const response = await getMartPotentialLeadApi({
        page,
        size,
        potential_lead_id: potential_lead_id || "",
      });
      console.log("getMartPotentialLeadApi response:", response);
      return response;
    },
    fetchTotal: async ({
      potential_lead_id,
      from,
      to,
      email,
    }: {
      potential_lead_id?: string;
      from?: string;
      to?: string;
      email?:string;
    }) => {
      const response = await getTotalMartPotentialLeadApi({
        potential_lead_id,
        from,
        to,
        email,
      });
      console.log("getTotalMartPotentialLeadApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      potential_lead_id,
      email,
      address,
      from,
      to,
    }: {
      page: number;
      size: number;
      potential_lead_id?: string;
      email?: string;
      address?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchMartPotentialLeadsApi({
        page,
        size,
        potential_lead_id,
        email,
        address,
        from,
        to,
      });
      console.log("searchMartPotentialLeadsApi response:", response);
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
      const response = await sortMartPotentialLeadsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortMartPotentialLeadsApi response:", response);
      return response;
    },
    fetchById: async (potential_lead_id: string) => {
      const response = await getMartPotentialLeadApi({
        page: 1,
        size: 1,
        potential_lead_id,
      });
      console.log("getMartPotentialLeadApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Mart Potential Lead not found");
      }
      return response.data[0];
    },
    addData: postMartPotentialLeadApi,
    updateData: patchMartPotentialLeadApi,
    deleteData: deleteMartPotentialLeadApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.potential_lead_id !== undefined && filters.potential_lead_id !== null
      ? String(filters.potential_lead_id)
      : "";
  const searchEmailTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";
  const searchAddressTerm =
    filters.address !== undefined && filters.address !== null
      ? String(filters.address)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("potential_lead_id", value || null);
  const setSearchEmailTerm = (value: string) => setFilter("email", value || null);
  const setSearchAddressTerm = (value: string) =>
    setFilter("address", value || null);

  const handleClearSearchId = () => handleClearFilter("potential_lead_id");
  const handleClearSearchEmail = () => handleClearFilter("email");
  const handleClearSearchAddress = () => handleClearFilter("address");

  const columns = [
    { key: "potential_lead_id" as keyof IMartPotentialLeadGetApi, header: "Potential Lead ID" },
    { key: "email" as keyof IMartPotentialLeadGetApi, header: "Email" },
    { key: "last_name" as keyof IMartPotentialLeadGetApi, header: "Last Name" },
    { key: "address" as keyof IMartPotentialLeadGetApi, header: "Address" },
    {
      key: "created_at" as keyof IMartPotentialLeadGetApi,
      header: "Date Created",
      render: (item: IMartPotentialLeadGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof IMartPotentialLeadGetApi,
      header: "Date Updated",
      render: (item: IMartPotentialLeadGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },

    { key: "actions" as keyof IMartPotentialLeadGetApi, header: "Actions" },
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
          firstSearchLabel="Search by Lead Property ID"
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
      <MartPotentialLeadFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteMartPotentialLeadConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};