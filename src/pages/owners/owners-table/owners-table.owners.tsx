import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getOwnersApi,
  getTotalOwnersApi,
  searchOwnersApi,
  sortOwnersApi,
  postOwnersApi,
  patchOwnersApi,
  deleteOwnersApi,
} from "../../../services";
import { IOwnersTableProps } from "./index";
import { IOwnersGetApi,IOwnersPatchApi } from "../../../models";
import {
  DeleteOwnersConfirmationModal,OwnersFormModal

} from "../index";
  
export const OwnersTable: React.FC<IOwnersTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IOwnersGetApi = {
    owner_id: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    address: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "owner_id", label: "Owner ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
   
  ];

  const fieldMapping = {
    id: "owner_id" as keyof IOwnersGetApi,
    email: "email" as keyof IOwnersGetApi,

    createdAt: "created_at" as keyof IOwnersGetApi,
  };

  const mapToForm = (data: IOwnersGetApi): IOwnersGetApi => ({
    owner_id: data.owner_id || "",
    email: data.email || "",
    address: data.address || "",
    last_name: data.last_name || "",
    created_at: data.created_at || "",
    first_name: data.first_name || "",
    phone_number: data.phone_number || "",
  });

  const mapFromForm = (data: IOwnersGetApi): Partial<IOwnersPatchApi> => {
    return {
      owner_id: data.owner_id,
      email: data.email,
      address: data.address,
      last_name: data.last_name,
      first_name: data.first_name || "",
      phone_number: data.phone_number || "",
    };
  };

  const mapResponse = (response: any): { data: IOwnersGetApi[] } => {
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
    IOwnersGetApi,
    IOwnersGetApi,
    { page: number; size: number; owner_id?: string },
    { owner_id?: string; from?: string; to?: string },
    { page: number; size: number; owner_id?: string; email?: string; address?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      owner_id,
    }: {
      page: number;
      size: number;
      owner_id?: string;
    }) => {
      const response = await getOwnersApi({
        page,
        size,
        owner_id: owner_id || "",
      });
      console.log("getOwnersApi response:", response);
      return response;
    },
    fetchTotal: async ({
      owner_id,
      from,
      to,
      email,
    }: {
      owner_id?: string;
      from?: string;
      to?: string;
      email?:string;
    }) => {
      const response = await getTotalOwnersApi({
        owner_id,
        from,
        to,
        email,
      });
      console.log("getTotalOwnersApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      owner_id,
      email,
      address,
      from,
      to,
    }: {
      page: number;
      size: number;
      owner_id?: string;
      email?: string;
      address?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchOwnersApi({
        page,
        size,
        owner_id,
        email,
        address,
        from,
        to,
      });
      console.log("searchOwnersApi response:", response);
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
      const response = await sortOwnersApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortOwnersApi response:", response);
      return response;
    },
    fetchById: async (owner_id: string) => {
      const response = await getOwnersApi({
        page: 1,
        size: 1,
        owner_id,
      });
      console.log("getOwnersApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Owner not found");
      }
      return response.data[0];
    },
    addData: postOwnersApi,
    updateData: patchOwnersApi,
    deleteData: deleteOwnersApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.owner_id !== undefined && filters.owner_id !== null
      ? String(filters.owner_id)
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
    setFilter("owner_id", value || null);
  const setSearchEmailTerm = (value: string) => setFilter("email", value || null);
  const setSearchAddressTerm = (value: string) =>
    setFilter("address", value || null);

  const handleClearSearchId = () => handleClearFilter("owner_id");
  const handleClearSearchEmail = () => handleClearFilter("email");
  const handleClearSearchAddress = () => handleClearFilter("address");

  const columns = [
    { key: "owner_id" as keyof IOwnersGetApi, header: "Owner ID" },
    { key: "email" as keyof IOwnersGetApi, header: "Email" },
    { key: "last_name" as keyof IOwnersGetApi, header: "Last Name" },
    { key: "address" as keyof IOwnersGetApi, header: "Address" },
    {
      key: "created_at" as keyof IOwnersGetApi,
      header: "Date Created",
      render: (item: IOwnersGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    

    { key: "actions" as keyof IOwnersGetApi, header: "Actions" },
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
      <OwnersFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteOwnersConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};