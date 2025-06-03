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
  deleteUserFcmTokenApi,
  getUserFcmTokenApi,
  getTotalUserFcmTokenApi,
  patchUserFcmTokenApi,
  postUserFcmTokenApi,
  searchUserFcmTokenApi,
  sortUserFcmTokenApi,
} from "../../../services";
import { IUserFcmTokenTableProps } from "./index";
import { IUserFcmTokenGetApi } from "../../../models";
import {
  UserFcmTokenFormModal,
  DeleteUserFcmTokenConfirmationModal,
} from "../index";

export const UserFcmTokenTable: React.FC<IUserFcmTokenTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IUserFcmTokenGetApi = {
    id: "",
    user_id: "",
    user_email: "",
    token: "",
    device_id: "",
    created_at: "",
    updated_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "user_id", label: "user_id", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IUserFcmTokenGetApi,
    email: "user_id" as keyof IUserFcmTokenGetApi,
  };

  const mapToForm = (data: IUserFcmTokenGetApi): IUserFcmTokenGetApi => ({
    id: data.id || "",
    user_id: data.user_id || "",
    user_email: data.user_email || "",
    token: data.token || "",
    device_id: data.device_id || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
  });

  const mapFromForm = (
    data: IUserFcmTokenGetApi
  ): Partial<IUserFcmTokenGetApi> => ({
    id: data.id,
    user_id: data.user_id,
    user_email: data.user_email,
    token: data.token,
    device_id: data.device_id,
    created_at: data.created_at,
    updated_at: data.updated_at,
  });

  const mapResponse = (response: any): { data: IUserFcmTokenGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        user_id: item.user_id || "",
        user_email: item.user_email || "",
        token: item.token || "",
        device_id: item.device_id || "",
        created_at: item.created_at || "",
        updated_at: item.updated_at || "",
      })),
    };
  };

  const wrappedDeleteUserFcmTokenApi = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteUserFcmTokenApi(id);
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
    IUserFcmTokenGetApi,
    IUserFcmTokenGetApi,
    { page: number; size: number; id?: string; user_id?: string },
    { id?: string; user_id?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      user_id?: string;
      user_email?: string;
      token?: string;
      device_id?: string;
      profile_url?: string;
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
      user_id,
    }: {
      page: number;
      size: number;
      id?: string;
      user_id?: string;
      user_email?: string;
      token?: string;
      device_id?: string;
    }) => {
      const response = await getUserFcmTokenApi({
        page,
        size,
        id: id || "",
        user_id: user_id || "",
      });
      console.log("getUserFcmTokenApi response:", response);
      return response;
    },
    fetchTotal: async ({ id, user_id }: { id?: string; user_id?: string }) => {
      const response = await getTotalUserFcmTokenApi({
        id,
        user_id,
      });
      console.log("get TotalUserFcmTokenApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      user_id,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      user_id?: string;
      user_email?: string;
      token?: string;
      device_id?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchUserFcmTokenApi({
        page,
        size,
        id,
        user_id,
        from,
        to,
      });
      console.log("searchUserFcmTokenApi response:", response);
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
      const response = await sortUserFcmTokenApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortUserFcmTokenApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getUserFcmTokenApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getUserFcmTokenApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postUserFcmTokenApi,
    updateData: patchUserFcmTokenApi,
    deleteData: wrappedDeleteUserFcmTokenApi,
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
    filters.user_id !== undefined && filters.user_id !== null
      ? String(filters.user_id)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchKeyTerm = (value: string) =>
    setFilter("user_id", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("user_id");

  const columns = [
    { key: "id" as keyof IUserFcmTokenGetApi, header: "ID" },
    {
      key: "user_id" as keyof IUserFcmTokenGetApi,
      header: "user_id",
    },
    {
      key: "user_email" as keyof IUserFcmTokenGetApi,
      header: "user_email",
    },
    {
      key: "token" as keyof IUserFcmTokenGetApi,
      header: "token",
      render: (item: IUserFcmTokenGetApi) => {
        const maxLength = 30;

        const dataString =
          typeof item.token === "string"
            ? item.token
            : JSON.stringify(item.token);

        const displayInput =
          dataString.length > maxLength
            ? dataString.substring(0, maxLength) + "..."
            : dataString;

        return <div>{displayInput}</div>;
      },
    },
    {
      key: "created_at" as keyof IUserFcmTokenGetApi,
      header: "created_at",
    },
    {
      key: "actions" as keyof IUserFcmTokenGetApi,
      header: "Actions",
    },
  ];

  console.log("UserFcmTokenTable state:", {
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
          secondSearchLabel="Search by User ID"
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

      <UserFcmTokenFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteUserFcmTokenConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

      {children}
    </>
  );
};
