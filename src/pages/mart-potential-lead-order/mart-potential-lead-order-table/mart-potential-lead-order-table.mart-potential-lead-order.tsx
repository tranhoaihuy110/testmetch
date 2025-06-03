import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getMartPotentialLeadOrderApi,
  getTotalMartPotentialLeadOrderApi,
  searchMartPotentialLeadOrderApi,
  sortMartPotentialLeadOrdersApi,
  postMartPotentialLeadOrderApi,
  patchMartPotentialLeadOrderApi,
  deleteMartPotentialLeadOrderApi,
} from "../../../services";
import { IMartPotentialLeadOrderTableProps } from "./index";
import { IMartPotentialLeadOrderGetApi,IMartPotentialLeadOrderPatchApi } from "../../../models";
import {
  DeleteMartPotentialLeadOrderConfirmationModal,MartPotentialLeadOrderFormModal
} from "../index";

export const MartPotentialLeadOrderTable: React.FC<IMartPotentialLeadOrderTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IMartPotentialLeadOrderGetApi = {
    potential_lead_order_id: "",
    full_address: "",
    postal_code: "",
    created_at: "",
    updated_at: "",
    order_status: "",
    username_order: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "potential_lead_order_id", label: "Potential Lead Order ID", type: "text" },
    { key: "full_address", label: "Full address", type: "text" },
    
  ];

  const fieldMapping = {
    id: "potential_lead_order_id" as keyof IMartPotentialLeadOrderGetApi,
    full_address: "full_address" as keyof IMartPotentialLeadOrderGetApi,
    createdAt: "created_at" as keyof IMartPotentialLeadOrderGetApi,
  };

  const mapToForm = (data: IMartPotentialLeadOrderGetApi): IMartPotentialLeadOrderGetApi => ({
    potential_lead_order_id: data.potential_lead_order_id || "",
    full_address: data.full_address || "",
    postal_code: data.postal_code || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    order_status: data.order_status || "",
    username_order: data.username_order || "",
  });

  const mapFromForm = (data: IMartPotentialLeadOrderGetApi): Partial<IMartPotentialLeadOrderPatchApi> => {
    return {
      potential_lead_order_id: data.potential_lead_order_id,
      full_address: data.full_address,
      postal_code: data.postal_code,
      order_status: data.order_status,
      username_order: data.username_order || undefined,
    };
  };

  const mapResponse = (response: any): { data: IMartPotentialLeadOrderGetApi[] } => {
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
    IMartPotentialLeadOrderGetApi,
    IMartPotentialLeadOrderGetApi,
    { page: number; size: number; potential_lead_order_id?: string },
    { potential_lead_order_id?: string; from?: string; to?: string },
    { page: number; size: number; potential_lead_order_id?: string; full_address?: string;from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      potential_lead_order_id,
    }: {
      page: number;
      size: number;
      potential_lead_order_id?: string;
    }) => {
      const response = await getMartPotentialLeadOrderApi({
        page,
        size,
        potential_lead_order_id: potential_lead_order_id || "",
      });
      console.log("getMartPotentialLeadOrderApi response:", response);
      return response;
    },
    fetchTotal: async ({
      potential_lead_order_id,
      from,
      to,
      full_address,
    }: {
      potential_lead_order_id?: string;
      from?: string;
      to?: string;
      full_address?:string;
    }) => {
      const response = await getTotalMartPotentialLeadOrderApi({
        potential_lead_order_id,
        from,
        to,
        full_address,
      });
      console.log("getTotalMartPotentialLeadOrderApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      potential_lead_order_id,
      full_address,
      from,
      to,
    }: {
      page: number;
      size: number;
      potential_lead_order_id?: string;
      full_address?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchMartPotentialLeadOrderApi({
        page,
        size,
        potential_lead_order_id,
        full_address,
        from,
        to,
      });
      console.log("searchMartPotentialLeadOrderApi response:", response);
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
      const response = await sortMartPotentialLeadOrdersApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortMartPotentialLeadOrdersApi response:", response);
      return response;
    },
    fetchById: async (potential_lead_order_id: string) => {
      const response = await getMartPotentialLeadOrderApi({
        page: 1,
        size: 1,
        potential_lead_order_id, 
      });
      console.log("getMartPotentialLeadOrderApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Mart Potential Lead Order not found");
      }
      return response.data[0];
    },
    addData: postMartPotentialLeadOrderApi,
    updateData: patchMartPotentialLeadOrderApi,
    deleteData: deleteMartPotentialLeadOrderApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.potential_lead_order_id !== undefined && filters.potential_lead_order_id !== null
      ? String(filters.potential_lead_order_id)
      : "";
  const searchEmailTerm =
    filters.full_address !== undefined && filters.full_address !== null
      ? String(filters.full_address)
      : "";
  const searchAddressTerm =
    filters.address !== undefined && filters.address !== null
      ? String(filters.address)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("potential_lead_order_id", value || null);
  const setSearchEmailTerm = (value: string) => setFilter("full_address", value || null);
  const setSearchAddressTerm = (value: string) =>
    setFilter("address", value || null);

  const handleClearSearchId = () => handleClearFilter("potential_lead_order_id");
  const handleClearSearchEmail = () => handleClearFilter("full_address");
  const handleClearSearchAddress = () => handleClearFilter("address");

  const columns = [
    { key: "potential_lead_order_id" as keyof IMartPotentialLeadOrderGetApi, header: "Potential Lead Order ID" },
    { key: "full_address" as keyof IMartPotentialLeadOrderGetApi, header: "Full Address" },
    { key: "postal_code" as keyof IMartPotentialLeadOrderGetApi, header: "Postal Code" },
    {
      key: "created_at" as keyof IMartPotentialLeadOrderGetApi,
      header: "Date Created",
      render: (item: IMartPotentialLeadOrderGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof IMartPotentialLeadOrderGetApi,
      header: "Date Updated",
      render: (item: IMartPotentialLeadOrderGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },

    { key: "actions" as keyof IMartPotentialLeadOrderGetApi, header: "Actions" },
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
      <MartPotentialLeadOrderFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteMartPotentialLeadOrderConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};