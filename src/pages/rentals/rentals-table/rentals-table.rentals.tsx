import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getRentalsApi,
  getTotalRentalsApi,
  searchRentalsApi,
  sortRentalsApi,
  postRentalsApi,
  patchRentalsApi,
  deleteRentalsApi,
} from "../../../services";
import { IRentalsTableProps } from "./index";
import { IRentalsGetApi,IRentalsPatchApi } from "../../../models";
import {
  DeleteRentalsConfirmationModal,RentalsFormModal

} from "../index";
  
export const RentalsTable: React.FC<IRentalsTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IRentalsGetApi = {
    rental_id: "",
    property_id: "",
    property_name: "",
    tenant_name: "",
    tenant_phone: "",
    tenant_email: "",
    rental_start_date:"",
    rental_end_date: "",
    rental_price: "",
    deposit: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "rental_id", label: "Rental ID", type: "text" },
    { key: "tenant_name", label: "Tenant Name", type: "text" },
   
  ];

  const fieldMapping = {
    id: "rental_id" as keyof IRentalsGetApi,
    tenant_name: "tenant_name" as keyof IRentalsGetApi,
    createdAt: "created_at" as keyof IRentalsGetApi,
  };

  const mapToForm = (data: IRentalsGetApi): IRentalsGetApi => ({
    rental_id: data.rental_id || "",
    property_id: data.property_id || "",
    property_name: data.property_name || "",
    tenant_name: data.tenant_name || "",
    tenant_phone: data.tenant_phone||"",
    tenant_email: data.tenant_email||"",
    rental_start_date: data.rental_start_date||"",
    rental_end_date: data.rental_end_date||"",
    rental_price: data.rental_price||"",
    deposit: data.deposit||"",
    created_at: data.created_at || "",
  });

  const mapFromForm = (data: IRentalsGetApi): Partial<IRentalsPatchApi> => {
    return {
    rental_id: data.rental_id || "",
    property_id: data.property_id || "",
    tenant_name: data.tenant_name || "",
    tenant_phone: data.tenant_phone||"",
    tenant_email: data.tenant_email||"",
    rental_start_date: data.rental_start_date||"",
    rental_end_date: data.rental_end_date||"",
    rental_price: data.rental_price||"",
    deposit: data.deposit||"",
    };
  };

  const mapResponse = (response: any): { data: IRentalsGetApi[] } => {
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
    IRentalsGetApi,
    IRentalsGetApi,
    { page: number; size: number; rental_id?: string },
    { rental_id?: string; from?: string; to?: string },
    { page: number; size: number; rental_id?: string; tenant_name?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      rental_id,
    }: {
      page: number;
      size: number;
      rental_id?: string;
    }) => {
      const response = await getRentalsApi({
        page,
        size,
        rental_id: rental_id || "",
      });
      console.log("getRentalsApi response:", response);
      return response;
    },
    fetchTotal: async ({
      rental_id,
      from,
      to,
      tenant_name,
    }: {
      rental_id?: string;
      from?: string;
      to?: string;
      tenant_name?:string;
    }) => {
      const response = await getTotalRentalsApi({
        rental_id,
        from,
        to,
        tenant_name,
      });
      console.log("getTotalRentalsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      rental_id,
      tenant_name,
      from,
      to,
    }: {
      page: number;
      size: number;
      rental_id?: string;
      tenant_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchRentalsApi({
        page,
        size,
        rental_id,
        tenant_name,
        from,
        to,
      });
      console.log("searchRentalsApi response:", response);
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
      const response = await sortRentalsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortRentalsApi response:", response);
      return response;
    },
    fetchById: async (rental_id: string) => {
      const response = await getRentalsApi({
        page: 1,
        size: 1,
        rental_id,
      });
      console.log("getRentalsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Owner not found");
      }
      return response.data[0];
    },
    addData: postRentalsApi,
    updateData: patchRentalsApi,
    deleteData: deleteRentalsApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.rental_id !== undefined && filters.rental_id !== null
      ? String(filters.rental_id)
      : "";
  const searchEmailTerm =
    filters.tenant_name !== undefined && filters.tenant_name !== null
      ? String(filters.tenant_name)
      : "";


  const setSearchIdTerm = (value: string) =>
    setFilter("rental_id", value || null);
  const setSearchEmailTerm = (value: string) => setFilter("tenant_name", value || null);


  const handleClearSearchId = () => handleClearFilter("rental_id");
  const handleClearSearchEmail = () => handleClearFilter("tenant_name");

  const columns = [
    { key: "rental_id" as keyof IRentalsGetApi, header: "Rental ID" },
    { key: "property_id" as keyof IRentalsGetApi, header: "Property ID" },
    { key: "property_name" as keyof IRentalsGetApi, header: "Property Name" },
    { key: "tenant_name" as keyof IRentalsGetApi, header: "Tenant Name" },
    { key: "tenant_phone" as keyof IRentalsGetApi, header: "Tenant Phone" },
    {
      key: "created_at" as keyof IRentalsGetApi,
      header: "Date Created",
      render: (item: IRentalsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    

    { key: "actions" as keyof IRentalsGetApi, header: "Actions" },
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
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchEmail}
          handleClearSearchUsername={handleClearSearchId}
          searchUsernameTerm={searchEmailTerm}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by Rentals ID"
          secondSearchLabel="Search by Tenant Name "
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
      <RentalsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteRentalsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};