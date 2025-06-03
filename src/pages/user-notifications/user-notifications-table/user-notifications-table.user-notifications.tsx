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
  deleteUserNotificationsApi,
  getUserNotificationsApi,
  getTotalUserNotificationsApi,
  patchUserNotificationsApi,
  postUserNotificationsApi,
  searchUserNotificationsApi,
  sortUserNotificationsApi,
} from "../../../services";
import { IUserNotificationsTableProps } from "./index";
import { IUserNotificationsGetApi } from "../../../models";
import {
  UserNotificationsFormModal,
  DeleteUserNotificationsConfirmationModal,
} from "../index";

export const UserNotificationsTable: React.FC<IUserNotificationsTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IUserNotificationsGetApi = {
    id: "",
    title: "",
    message: "",
    user_id: "",
    user_email: "",
    type: "",
    is_read: "",
    data: {},
    read_at: "",
    // created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "title", label: "title", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IUserNotificationsGetApi,
    title: "title" as keyof IUserNotificationsGetApi,
  };

  const mapToForm = (
    data: IUserNotificationsGetApi
  ): IUserNotificationsGetApi => ({
    id: data.id || "",
    title: data.title || "",
    message: data.message || "",
    user_id: data.user_id || "",
    user_email: data.user_email || "",
    type: data.type || "",
    is_read: data.is_read || "",
    data: data.data || "",
    read_at: data.read_at || "",
    // created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: IUserNotificationsGetApi
  ): Partial<IUserNotificationsGetApi> => ({
    id: data.id,
    title: data.title,
    message: data.message,
    user_id: data.user_id,
    user_email: data.user_email,
    type: data.type,
    is_read: data.is_read,
    data: data.data,
    read_at: data.read_at,
    // created_at: data.created_at,
  });

  const mapResponse = (response: any): { data: IUserNotificationsGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        title: item.title || "",
        message: item.message || "",
        user_id: item.user_id || "",
        user_email: item.user_email || "",
        type: item.type || "",
        is_read: item.is_read || "",
        data: item.data || "",
        read_at: item.read_at || "",
        created_at: item.created_at || "",
      })),
    };
  };

  const wrappedDeleteUserNotificationsApi = async (
    id: string
  ): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteUserNotificationsApi(id);
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
    IUserNotificationsGetApi,
    IUserNotificationsGetApi,
    { page: number; size: number; id?: string; title?: string },
    { id?: string; title?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      title?: string;
      user_id?: string;
      user_email?: string;
      type?: string;
      is_read?: string;
      data?: string;
      read_at?: string;
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
    }: {
      page: number;
      size: number;
      id?: string;
      title?: string;
      message?: string;
      user_id?: string;
      user_email?: string;
      type?: string;
      is_read?: string;
      data?: string;
      read_at?: string;
    }) => {
      const response = await getUserNotificationsApi({
        page,
        size,
        id: id || "",
      });
      console.log("getUserNotificationsApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      title,
      from,
      to,
    }: {
      id?: string;
      title?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalUserNotificationsApi({
        id,
        title,
        from,
        to,
      });
      console.log("get TotalUserNotificationsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      title,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      title?: string;
      message?: string;
      user_id?: string;
      user_email?: string;
      type?: string;
      is_read?: string;
      data?: string;
      read_at?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchUserNotificationsApi({
        page,
        size,
        id,
        title,
        from,
        to,
      });
      console.log("searchUserNotificationsApi response:", response);
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
      const response = await sortUserNotificationsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortUserNotificationsApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getUserNotificationsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getUserNotificationsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postUserNotificationsApi,
    updateData: patchUserNotificationsApi,
    deleteData: wrappedDeleteUserNotificationsApi,
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
    filters.title !== undefined && filters.title !== null
      ? String(filters.title)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchKeyTerm = (value: string) => setFilter("title", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("title");

  const columns = [
    { key: "id" as keyof IUserNotificationsGetApi, header: "ID" },
    {
      key: "title" as keyof IUserNotificationsGetApi,
      header: "title",
    },
    {
      key: "message" as keyof IUserNotificationsGetApi,
      header: "message",
    },
    {
      key: "user_email" as keyof IUserNotificationsGetApi,
      header: "user_email",
    },
    {
      key: "data" as keyof IUserNotificationsGetApi,
      header: "data",
      render: (item: IUserNotificationsGetApi) => {
        const maxLength = 50;

        const dataString =
          typeof item.data === "string" ? item.data : JSON.stringify(item.data);

        const displayInput =
          dataString.length > maxLength
            ? dataString.substring(0, maxLength) + "..."
            : dataString;

        return <div>{displayInput}</div>;
      },
    },
    {
      key: "read_at" as keyof IUserNotificationsGetApi,
      header: "read_at",
    },
    {
      key: "actions" as keyof IUserNotificationsGetApi,
      header: "Actions",
    },
  ];

  console.log("UserNotificationsTable state:", {
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
          secondSearchLabel="Search by title"
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

      <UserNotificationsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteUserNotificationsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

      {children}
    </>
  );
};
