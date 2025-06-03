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
  getPropertyOwnerShipApi,
  getTotalPropertyOwnerShipApi,
  searchPropertyOwnerShipApi,
  sortPropertyOwnerShipApi,
  postPropertyOwnerShipApi,
  patchPropertyOwnerShipApi,
  deletePropertyOwnerShipApi,
} from "../../../services";
import { IPropertyOwnerShipTableProps } from "./index";
import { IPropertyOwnerShipGetApi, IPropertyOwnerShipPostApi, IPropertyOwnerShipPatchApi } from "../../../models";
import {
  PropertyOwnerShipFormModal,
  DeletePropertyOwnerShipConfirmationModal,
} from "../index";

export const PropertyOwnerShipTable: React.FC<IPropertyOwnerShipTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IPropertyOwnerShipGetApi = {
    ownership_id: "",
    property_id: "",
    owner_id: "",
    email: "",
    property_name: "",
    ownership_percentage: "",
    start_date: "",
    end_date: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "ownership_id", label: "Ownership ID", type: "text" },
    { key: "property_id", label: "Property ID", type: "text" },
    { key: "owner_id", label: "Owner ID", type: "text" },
    { key: "ownership_percentage", label: "Ownership Percentage", type: "text" },
    { key: "start_date", label: "Start Date", type: "text" },
    { key: "end_date", label: "End Date", type: "text" },
  ];

  const fieldMapping = {
    id: "ownership_id" as keyof IPropertyOwnerShipGetApi,
    property_id: "property_id" as keyof IPropertyOwnerShipGetApi,
    owner_id: "owner_id" as keyof IPropertyOwnerShipGetApi,
    ownership_percentage: "ownership_percentage" as keyof IPropertyOwnerShipGetApi,
    start_date: "start_date" as keyof IPropertyOwnerShipGetApi,
    end_date: "end_date" as keyof IPropertyOwnerShipGetApi,
    email: "email" as keyof IPropertyOwnerShipGetApi,
    property_name: "property_name" as keyof IPropertyOwnerShipGetApi,
  };

  const mapToForm = (data: IPropertyOwnerShipGetApi): IPropertyOwnerShipGetApi => ({
    ownership_id: data.ownership_id || "",
    property_id: data.property_id || "",
    owner_id: data.owner_id || "",
    ownership_percentage: data.ownership_percentage || "",
    start_date: data.start_date || "",
    end_date: data.end_date || "",
  });

  const mapFromForm = (data: IPropertyOwnerShipGetApi): IPropertyOwnerShipPostApi => {
    return {
      ownership_id: data.ownership_id || "",
      property_id: data.property_id,
      owner_id: data.owner_id,
      ownership_percentage: data.ownership_percentage,
      start_date: data.start_date,
      end_date: data.end_date,
    };
  };

  const mapResponse = (response: any): { data: IPropertyOwnerShipGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return { data: response.data };
  };

  const transformToPostData = (data: IPropertyOwnerShipGetApi): IPropertyOwnerShipPostApi => {
    return {
      property_id: data.property_id,
      owner_id: data.owner_id,
      ownership_percentage: data.ownership_percentage,
      start_date: data.start_date,
      end_date: data.end_date,
    };
  };

  const transformToPatchData = (data: IPropertyOwnerShipGetApi): IPropertyOwnerShipPatchApi => {
    return {
      ownership_id: data.ownership_id,
      email: data.email,
      property_name: data.property_name,
      property_id: data.property_id,
      owner_id: data.owner_id,
      ownership_percentage: data.ownership_percentage,
      start_date: data.start_date,
      end_date: data.end_date,
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
    IPropertyOwnerShipGetApi,
    IPropertyOwnerShipPostApi, 
    { page: number; size: number; ownership_id?: string },
    { ownership_id?: string; from?: string; to?: string },
    { page: number; size: number; ownership_id?: string; property_id?: string; owner_id?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      ownership_id,
    }: {
      page: number;
      size: number;
      ownership_id?: string;
    }) => {
      const response = await getPropertyOwnerShipApi({
        page,
        size,
        ownership_id: ownership_id || "",
      });
      console.log("getPropertyOwnerShipApi response:", response);
      return response;
    },
    fetchTotal: async ({
      ownership_id,
      from,
      to,
      property_id,
    }: {
      ownership_id?: string;
      from?: string;
      to?: string;
      property_id?: string;
    }) => {
      const response = await getTotalPropertyOwnerShipApi({
        ownership_id,
        from,
        to,
        property_id,
      });
      console.log("getTotalPropertyOwnerShipApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      ownership_id,
      property_id,
      owner_id,
      from,
      to,
    }: {
      page: number;
      size: number;
      ownership_id?: string;
      property_id?: string;
      owner_id?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchPropertyOwnerShipApi({
        page,
        size,
        ownership_id,
        property_id,
        owner_id,
        from,
        to,
      });
      console.log("searchPropertyOwnerShipApi response:", response);
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
      const response = await sortPropertyOwnerShipApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortPropertyOwnerShipApi response:", response);
      return response;
    },
    fetchById: async (ownership_id: string) => {
      const response = await getPropertyOwnerShipApi({
        page: 1,
        size: 1,
        ownership_id,
      });
      console.log("getPropertyOwnerShipApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Property Ownership not found");
      }
      return response.data[0];
    },
    addData: async (data: Partial<IPropertyOwnerShipPostApi>) => {
      const transformedData = transformToPostData(data as IPropertyOwnerShipGetApi);
      const response = await postPropertyOwnerShipApi(transformedData);
      console.log("postPropertyOwnerShipApi response:", response);
      return response;
    },
    updateData: async (data: Partial<IPropertyOwnerShipPatchApi>) => {
      const transformedData = transformToPatchData(data as IPropertyOwnerShipGetApi);
      const response = await patchPropertyOwnerShipApi(transformedData);
      console.log("patchPropertyOwnerShipApi response:", response);
      return response;
    },
    deleteData: deletePropertyOwnerShipApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.ownership_id !== undefined && filters.ownership_id !== null
      ? String(filters.ownership_id)
      : "";
  const searchPropertyIdTerm =
    filters.property_id !== undefined && filters.property_id !== null
      ? String(filters.property_id)
      : "";
  const searchOwnerIdTerm =
    filters.owner_id !== undefined && filters.owner_id !== null
      ? String(filters.owner_id)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("ownership_id", value || null);
  const setSearchPropertyIdTerm = (value: string) =>
    setFilter("property_id", value || null);
  const setSearchOwnerIdTerm = (value: string) =>
    setFilter("owner_id", value || null);

  const handleClearSearchId = () => handleClearFilter("ownership_id");
  const handleClearSearchPropertyId = () => handleClearFilter("property_id");
  const handleClearSearchOwnerId = () => handleClearFilter("owner_id");

  const columns = [
    { key: "ownership_id" as keyof IPropertyOwnerShipGetApi, header: "Ownership ID" },
    { key: "property_id" as keyof IPropertyOwnerShipGetApi, header: "Property ID" },
    { key: "owner_id" as keyof IPropertyOwnerShipGetApi, header: "Owner ID" },
    { key: "ownership_percentage" as keyof IPropertyOwnerShipGetApi, header: "Ownership Percentage" },
    {
      key: "start_date" as keyof IPropertyOwnerShipGetApi,
      header: "Start Date",
      render: (item: IPropertyOwnerShipGetApi) =>
        new Date(item.start_date || "").toLocaleString(),
    },
    {
      key: "end_date" as keyof IPropertyOwnerShipGetApi,
      header: "End Date",
      render: (item: IPropertyOwnerShipGetApi) =>
        new Date(item.end_date || "").toLocaleString(),
    },
    { key: "actions" as keyof IPropertyOwnerShipGetApi, header: "Actions" },
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
          searchNameTerm={searchPropertyIdTerm}
          setSearchNameTerm={setSearchPropertyIdTerm}
          searchPhoneTerm={searchOwnerIdTerm}
          setSearchPhoneTerm={setSearchOwnerIdTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchPropertyId}
          handleClearSearchPhone={handleClearSearchOwnerId}
          searchUsernameTerm={searchPropertyIdTerm}
          setSearchUsernameTerm={setSearchPropertyIdTerm}
          handleClearSearchUsername={handleClearSearchPropertyId}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by Ownership ID"
          secondSearchLabel="Search by Property ID"
          idSearchType="text"
          hidePhoneEmail={true}
        />

        <div className="max-w-full overflow-x-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Đang tải...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500 dark:text-red-400">
              {error}
            </div>
          ) : !paginatedData || paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Không tìm thấy quyền sở hữu tài sản với bộ lọc đã chọn.
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
      <PropertyOwnerShipFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeletePropertyOwnerShipConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};