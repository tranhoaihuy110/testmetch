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
  deleteUserProfileUrlMapApi,
  getUserProfileUrlMapApi,
  getTotalUserProfileUrlMapApi,
  patchUserProfileUrlMapApi,
  postUserProfileUrlMapApi,
  searchUserProfileUrlMapApi,
  sortUserProfileUrlMapApi,
} from "../../../services";
import { IUserProfileUrlMapTableProps } from "./index";
import { IUserProfileUrlMapGetApi } from "../../../models";
import {
  UserProfileUrlMapFormModal,
  DeleteUserProfileUrlMapConfirmationModal,
} from "../index";


export const UserProfileUrlMapTable: React.FC<IUserProfileUrlMapTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IUserProfileUrlMapGetApi = {
    id: "",
    email: "",
    profile_url: "",
    profile_image: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "email", label: "email", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IUserProfileUrlMapGetApi,
    email: "email" as keyof IUserProfileUrlMapGetApi,
  };

  const mapToForm = (data: IUserProfileUrlMapGetApi): IUserProfileUrlMapGetApi => ({
    id: data.id || "",
    email: data.email || "",
    profile_url: data.profile_url || "",
    profile_image: data.profile_image || "",
  });

  const mapFromForm = (
    data: IUserProfileUrlMapGetApi
  ): Partial<IUserProfileUrlMapGetApi> => ({
    id: data.id,
    email: data.email,
    profile_url: data.profile_url,
    profile_image: data.profile_image,
  });

  const mapResponse = (response: any): { data: IUserProfileUrlMapGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        email: item.email || "", 
        profile_url: item.profile_url || "",
        profile_image: item.profile_image || "",
      })),
    };
  };

  const wrappedDeleteUserProfileUrlMapApi = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteUserProfileUrlMapApi(id);
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
    IUserProfileUrlMapGetApi,
    IUserProfileUrlMapGetApi,
    { page: number; size: number; id?: string; email?: string },
    { id?: string; email?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      email?: string;
      profile_url?: string;
      profile_image?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      id,
      email,
    }: {
      page: number;
      size: number;
      id?: string;
      email?: string;
      profile_url?: string;
      profile_image?: string;
    }) => {
      const response = await getUserProfileUrlMapApi({
        page,
        size,
        id: id || "",
        email: email || "",

      });
      console.log("getUserProfileUrlMapApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      email,
    }: {
      id?: string;
      email?: string;
    }) => {
      const response = await getTotalUserProfileUrlMapApi({
        id,
        email,
      });
      console.log("get TotalUserProfileUrlMapApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      email,
    }: {
      page: number;
      size: number;
      id?: string;
      email?: string;
      profile_url?: string;
      profile_image?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchUserProfileUrlMapApi({
        page,
        size,
        id,
        email,
      });
      console.log("searchUserProfileUrlMapApi response:", response);
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
      const response = await sortUserProfileUrlMapApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortUserProfileUrlMapApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getUserProfileUrlMapApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getUserProfileUrlMapApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postUserProfileUrlMapApi,
    updateData: patchUserProfileUrlMapApi,
    deleteData: wrappedDeleteUserProfileUrlMapApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchKeyTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchKeyTerm = (value: string) =>
    setFilter("email", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("email");

   const columns = [
    { key: "id" as keyof IUserProfileUrlMapGetApi, header: "ID" },
    {
      key: "email" as keyof IUserProfileUrlMapGetApi,
      header: "email",
    },
    {
      key: "profile_url" as keyof IUserProfileUrlMapGetApi,
      header: "profile_url",
    },
    {
      key: "profile_image" as keyof IUserProfileUrlMapGetApi,
      header: "profile_image",
    },
    {
      key: "actions" as keyof IUserProfileUrlMapGetApi,
      header: "Actions",
    },
  ];

  console.log("UserProfileUrlMapTable state:", {
    isModalOpen,
    modalMode,
    currentItem,
  });

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
          searchNameTerm={searchKeyTerm}
          setSearchNameTerm={setSearchKeyTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchKey}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Email"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={() => {}}
          setSearchUsernameTerm={() => {}}
          handleClearSearchPhone={() => {}}
          handleClearSearchUsername={() => {}}
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
              No Metadata found for the selected filters.
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

      <UserProfileUrlMapFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteUserProfileUrlMapConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

      {children}
    </>
  );
};