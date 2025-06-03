import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getLeadsPropertyApi,
  getTotalLeadsPropertyApi,
  searchLeadsPropertyApi,
  sortLeadsPropertyApi,
  postLeadsPropertyApi,
  patchLeadsPropertyApi,
  deleteLeadsPropertyApi,
} from "../../../services";
import { ILeadPropertyTableProps } from "./index";
import { ILeadsPropertyGetApi, ILeadsPropertyPatchApi, ILeadsPropertyPostApi } from "../../../models";
import {
  LeadPropertyFormModal,
  DeleteLeadPropertyConfirmationModal,
} from "../index";

export const LeadPropertyTable: React.FC<ILeadPropertyTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ILeadsPropertyGetApi = {
    lead_property_id: "",
    lead_id: 0,
    lead_property_type: "",
    email: "",
    location_elements: "",
    address: "",
    full_address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    created_at: "",
    updated_at: "",
    json_metadata: {},
    lead_property_note: "",
    json_address: {},
    property_id: 0,
    longitude: 0,
    latitude: 0,
    ksplat_urls: [{ url: "", zoom: 1 }],
    captured_video_urls: [{ url: "", zoom: 1 }],
    ["3d_outside_status"]: 0,
    lead_property_stage: "",
    lead_property_status: "",
    lead_property_sf_id: "",
    location_status: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "lead_property_id", label: "Lead Property ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ];

  const fieldMapping = {
    id: "lead_property_id" as keyof ILeadsPropertyGetApi,
    email: "email" as keyof ILeadsPropertyGetApi,
    address: "address" as keyof ILeadsPropertyGetApi,
    createdAt: "created_at" as keyof ILeadsPropertyGetApi,
  };

  const mapToForm = (data: ILeadsPropertyGetApi): ILeadsPropertyGetApi => ({
    lead_property_id: data.lead_property_id || "",
    lead_id: data.lead_id || 0,
    lead_property_type: data.lead_property_type || "",
    email: data.email || "",
    location_elements: data.location_elements || "",
    address: data.address || "",
    full_address: data.full_address || "",
    city: data.city || "",
    state: data.state || "",
    postal_code: data.postal_code || "",
    country: data.country || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    json_metadata: data.json_metadata || {},
    lead_property_note: data.lead_property_note || "",
    json_address: data.json_address || {},
    property_id: data.property_id || 0,
    longitude: data.longitude || 0,
    latitude: data.latitude || 0,
    ksplat_urls: data.ksplat_urls || [{ url: "", zoom: 1 }],
    captured_video_urls: data.captured_video_urls || [{ url: "", zoom: 1 }],
    ["3d_outside_status"]: data["3d_outside_status"] || 0,
    lead_property_stage: data.lead_property_stage || "",
    lead_property_status: data.lead_property_status || "",
    lead_property_sf_id: data.lead_property_sf_id || "",
    location_status: data.location_status || "",
  });

  const mapFromForm = (data: ILeadsPropertyGetApi): Partial<ILeadsPropertyGetApi> => {
    return {
      lead_property_id: data.lead_property_id,
      lead_id: data.lead_id,
      lead_property_type: data.lead_property_type,
      location_elements: data.location_elements || "",
      address: data.address,
      full_address: data.full_address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      json_metadata: data.json_metadata,
      lead_property_note: data.lead_property_note,
      json_address: data.json_address,
      property_id: data.property_id,
      longitude: data.longitude,
      latitude: data.latitude,
      ksplat_urls: data.ksplat_urls || undefined,
      captured_video_urls: data.captured_video_urls || undefined,
      ["3d_outside_status"]: data["3d_outside_status"],
      lead_property_stage: data.lead_property_stage,
      lead_property_status: data.lead_property_status,
      lead_property_sf_id: data.lead_property_sf_id,
      location_status: data.location_status,
    };
  };

  const mapResponse = (response: any): { data: ILeadsPropertyGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return { data: response.data };
  };

  const transformToPostData = (data: Partial<ILeadsPropertyGetApi>): Partial<ILeadsPropertyPostApi> => {
    return {
      lead_property_id: data.lead_property_id,
      lead_id: data.lead_id,
      lead_property_type: data.lead_property_type,
      email: data.email,
      location_elements: data.location_elements,
      address: data.address,
      full_address: data.full_address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      json_metadata: data.json_metadata,
      lead_property_note: data.lead_property_note,
      json_address: data.json_address,
      property_id: data.property_id,
      longitude: data.longitude,
      latitude: data.latitude,
      ksplat_urls: data.ksplat_urls?.map((item) => item.url) || null,
      captured_video_urls: data.captured_video_urls?.map((item) => item.url) || null,
      ["3d_outside_status"]: data["3d_outside_status"],
      lead_property_stage: data.lead_property_stage,
      lead_property_status: data.lead_property_status,
      lead_property_sf_id: data.lead_property_sf_id,
      location_status: data.location_status,
    };
  };

  const transformToPatchData = (data: Partial<ILeadsPropertyGetApi>): Partial<ILeadsPropertyPatchApi> => {
    return {
      lead_property_id: data.lead_property_id,
      lead_id: data.lead_id,
      lead_property_type: data.lead_property_type,
      email: data.email,
      location_elements: data.location_elements,
      address: data.address,
      full_address: data.full_address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      json_metadata: data.json_metadata,
      lead_property_note: data.lead_property_note,
      json_address: data.json_address,
      property_id: data.property_id,
      longitude: data.longitude,
      latitude: data.latitude,
      ksplat_urls: data.ksplat_urls?.map((item) => item.url) || null,
      captured_video_urls: data.captured_video_urls?.map((item) => item.url) || null,
      ["3d_outside_status"]: data["3d_outside_status"],
      lead_property_stage: data.lead_property_stage,
      lead_property_status: data.lead_property_status,
      lead_property_sf_id: data.lead_property_sf_id,
      location_status: data.location_status,
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
    ILeadsPropertyGetApi,
    ILeadsPropertyGetApi,
    { page: number; size: number; lead_property_id?: string },
    { lead_property_id?: string; from?: string; to?: string },
    { page: number; size: number; lead_property_id?: string; email?: string; address?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      lead_property_id,
    }: {
      page: number;
      size: number;
      lead_property_id?: string;
    }) => {
      const response = await getLeadsPropertyApi({
        page,
        size,
        lead_property_id: lead_property_id || "",
      });
      console.log("getLeadPropertyApi response:", response);
      return response;
    },
    fetchTotal: async ({
      lead_property_id,
      from,
      to,
      email,
    }: {
      lead_property_id?: string;
      from?: string;
      to?: string;
      email?: string;
    }) => {
      const response = await getTotalLeadsPropertyApi({
        lead_property_id,
        from,
        to,
        email,
      });
      console.log("getTotalLeadPropertyApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      lead_property_id,
      email,
      address,
      from,
      to,
    }: {
      page: number;
      size: number;
      lead_property_id?: string;
      email?: string;
      address?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadsPropertyApi({
        page,
        size,
        lead_property_id,
        email,
        address,
        from,
        to,
      });
      console.log("searchLeadPropertyApi response:", response);
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
      const response = await sortLeadsPropertyApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortLeadPropertyApi response:", response);
      return response;
    },
    fetchById: async (lead_property_id: string) => {
      const response = await getLeadsPropertyApi({
        page: 1,
        size: 1,
        lead_property_id,
      });
      console.log("getLeadPropertyApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Lead Property not found");
      }
      return response.data[0];
    },
    addData: async (data: Partial<ILeadsPropertyGetApi>) => {
      const transformedData = transformToPostData(data);
      const response = await postLeadsPropertyApi(transformedData);
      console.log("postLeadsPropertyApi response:", response);
      return response;
    },
    updateData: async (data: Partial<ILeadsPropertyGetApi>) => {
      const transformedData = transformToPatchData(data);
      const response = await patchLeadsPropertyApi(transformedData);
      console.log("patchLeadsPropertyApi response:", response);
      return response;
    },
    deleteData: deleteLeadsPropertyApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.lead_property_id !== undefined && filters.lead_property_id !== null
      ? String(filters.lead_property_id)
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
    setFilter("lead_property_id", value || null);
  const setSearchEmailTerm = (value: string) => setFilter("email", value || null);
  const setSearchAddressTerm = (value: string) =>
    setFilter("address", value || null);

  const handleClearSearchId = () => handleClearFilter("lead_property_id");
  const handleClearSearchEmail = () => handleClearFilter("email");
  const handleClearSearchAddress = () => handleClearFilter("address");

  const columns = [
    { key: "lead_property_id" as keyof ILeadsPropertyGetApi, header: "Lead Property ID" },
    { key: "email" as keyof ILeadsPropertyGetApi, header: "Email" },
    { key: "address" as keyof ILeadsPropertyGetApi, header: "Address" },
    {
      key: "created_at" as keyof ILeadsPropertyGetApi,
      header: "Date Created",
      render: (item: ILeadsPropertyGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof ILeadsPropertyGetApi,
      header: "Date Updated",
      render: (item: ILeadsPropertyGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ILeadsPropertyGetApi, header: "Actions" },
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
      <LeadPropertyFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadPropertyConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};