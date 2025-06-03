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
  getPropertiesApi,
  getTotalPropertiesApi,
  searchPropertiesApi,
  sortPropertiesApi,
  postPropertiesApi,
  patchPropertiesApi,
  deletePropertiesApi,
} from "../../../services";
import { IPropertiesTableProps } from "./index";
import { IPropertiesGetApi,IPropertiesPatchApi } from "../../../models";
import {
  PropertiesFormModal,
  DeletePropertiesConfirmationModal,
} from "../index";

export const PropertiesTable: React.FC<IPropertiesTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IPropertiesGetApi = {
    property_id: "",
    property_name: "",
    property_type: "",
    description: "",
    json_address: {},
    full_address: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    price: "",
    size: "",
    longtitude: "",
    latitude: "",
    scanned_outside_folder_url: [{ url: "", zoom: 1 }],
    ksplat_url: [{ url: "", zoom: 1 }],
    created_at: "",
    updated_at: "",
    streetview_url: "",
    created_by: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "property_id", label: " property_id ID", type: "text" },
    { key: "property_name", label: "Property Name", type: "text" },
    { key: "property_type", label: "Property Type", type: "text" },
  ];

  const fieldMapping = {
    id: "property_id" as keyof IPropertiesGetApi,
    name: "property_name" as keyof IPropertiesGetApi,
    type: "property_type" as keyof IPropertiesGetApi,
    createdAt: "create_at" as keyof IPropertiesGetApi,
  };

  const mapToForm = (data: IPropertiesGetApi): IPropertiesGetApi => ({
      property_id: data.property_id || "",
      property_name: data.property_name|| "",
      property_type: data.property_type|| "",
      description: data.description || "",
      json_address: data.json_address|| {},
      full_address: data.full_address|| "",
      address: data.address|| "",
      city: data.city|| "",
      state: data.state|| "",
      postal_code: data.postal_code|| "",
      country: data.country|| "",
      price: data.price|| "",
      size: data.size|| "",
      longtitude: data.longtitude|| "",
      latitude: data.latitude || "",
      scanned_outside_folder_url: data.scanned_outside_folder_url,
      ksplat_url: data.ksplat_url|| "",
      created_at: data.created_at|| "",
      updated_at: data.updated_at|| "",
      streetview_url: data.streetview_url|| "",
      created_by: data.created_by|| "",
  });

  const mapFromForm = (data: IPropertiesGetApi): Partial<IPropertiesPatchApi> => {
    return {
      property_id: data.property_id,
      property_name: data.property_name,
      property_type: data.property_type,
      description: data.description || "",
      json_address: data.json_address,
      full_address: data.full_address,
      address: data.address,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      price: data.price,
      size: data.size,
      longtitude: data.longtitude,
      latitude: data.latitude,
      canned_outside_folder_url: data.scanned_outside_folder_url,
      ksplat_url: data.ksplat_url,
      streetview_url: data.streetview_url,
      created_by: data.created_by,
    };
  };

  const mapResponse = (response: any ): { data: IPropertiesGetApi[] } => {
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
    IPropertiesGetApi,
    IPropertiesGetApi,
    { page: number; size: number; property_id?: string },
    { property_id?: string; from?: string; to?: string },
    { page: number; size: number; property_id?: string; property_name?: string; property_type?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      property_id,
    }: {
      page: number;
      size: number;
      property_id?: string;
    }) => {
      const response = await getPropertiesApi({
        page,
        size,
        property_id: property_id || "",
      });
      console.log("get Property Api response:", response);
      return response;
    },
    fetchTotal: async ({
      property_id,
      from,
      to,
      property_name,
    }: {
      property_id?: string;
      from?: string;
      to?: string;
      property_name?:string;
    }) => {
      const response = await getTotalPropertiesApi({
        property_id,
        from,
        to,
        property_name,
      });
      console.log("get Total Property Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      property_id,
      property_name,
      description,
      from,
      to,
    }: {
      page: number;
      size: number;
      property_id?: string;
      property_name?: string;
      description?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPropertiesApi({
        page,
        size,
        property_id,
        property_name,
        description,
        from,
        to,
      });
      console.log("search Property Api response:", response);
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
      const response = await sortPropertiesApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Property Api response:", response);
      return response;
    },
    fetchById: async (property_id: string) => {
      const response = await getPropertiesApi({
        page: 1,
        size: 1,
        property_id,
      });
      console.log("get Property Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Property not found");
      }
      return response.data[0];
    },
    addData: postPropertiesApi,
    updateData: patchPropertiesApi,
    deleteData: deletePropertiesApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.property_id !== undefined && filters.property_id !== null
      ? String(filters.property_id)
      : "";
  const searchEmailTerm =
    filters.property_name !== undefined && filters.property_name !== null
      ? String(filters.property_name)
      : "";
  const searchAddressTerm =
    filters.property_type !== undefined && filters.property_type !== null
      ? String(filters.property_type)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("property_id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("property_name", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("property_type", value || null);

  const handleClearSearchId = () => handleClearFilter("property_id");
  const handleClearSearchEmail = () => handleClearFilter("property_name");
  const handleClearSearchAddress = () => handleClearFilter("property_type");

  const columns = [
  { key: "property_id" as keyof IPropertiesGetApi, header: "property_id" },
  { key: "property_name" as keyof IPropertiesGetApi, header: "Property Name" },
  { key: "property_type" as keyof IPropertiesGetApi, header: "Property Type" },
  {
    key: "create_at" as keyof IPropertiesGetApi,
    header: "Date Created",
    render: (item: IPropertiesGetApi) =>
      new Date(item.created_at || "").toLocaleString(),
  },
  {
    key: "updated_at" as keyof IPropertiesGetApi,
    header: "Date Updated",
    render: (item: IPropertiesGetApi) =>
      new Date(item.updated_at || "").toLocaleString(),
  },
  { key: "actions" as keyof IPropertiesGetApi, header: "Actions" },
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
          firstSearchLabel="Search by Properties_ID"
          secondSearchLabel="Search by Properties_name"
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
      <PropertiesFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeletePropertiesConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};