import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getAppUserApi,
  getTotalAppUserApi,
  searchAppUserApi,
  sortAppUserApi,
  patchAppUserApi,
  deleteAppUserApi,
} from "../../../services";
import { IAppUserTableProps } from "./index";
import { IAppUserGetApi } from "../../../models";
import { AppUserFormModal, DeleteAppUserConfirmationModal } from "../index";

export const AppUserTable: React.FC<IAppUserTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IAppUserGetApi = {
    user_id: "",
    username: "",
    user_email: "",
    user_firstname: "",
    user_lastname: "",
    user_fullname: "",
    phone_number: "",
    user_gender: null,
    user_avatar: null,
    date_of_birth: null,
    job: null,
    user_status: 0,
    created_at: "",
    updated_at: "",
    group_id: null,
    user_session: "",
    parent_id: null,
    province_id: null,
    district_id: null,
    ward_id: null,
    object_id: null,
    user_type: "",
    department: null,
    department_code: null,
    language_session: null,
    rank: null,
    company_name: null,
    date_start_work: null,
    profession: null,
    job_title: null,
    manager_email: null,
    is_head: "",
    department_v2: null,
    department_level2: null,
    test_mh: null,
    otp: null,
    otp_expired_at: null,
    json_data: null,
    keycloak_id: "",
    salesforce_id: null,
    salesforce_token: null,
    expertise: null,
    fcm_token: null,
    profile_url: null,
    partner_code: null,
    auth_provider: null,
  };

  const filterConfig: FilterConfig[] = [
    { key: "user_id", label: "User ID", type: "number" },
    { key: "username", label: "User Name", type: "text" },
    { key: "user_email", label: "User Email", type: "text" },
    { key: "user_fullname", label: "User FullName", type: "text" },
    { key: "phone_number", label: "Phone Number", type: "text" },
  ];

  const fieldMapping = {
    id: "user_id" as keyof IAppUserGetApi,
    name: "username" as keyof IAppUserGetApi,
    email: "user_email" as keyof IAppUserGetApi,
    fullname: "user_fullname" as keyof IAppUserGetApi,
    phonenumber: "phone_number" as keyof IAppUserGetApi,
    createdAt: "created_at" as keyof IAppUserGetApi,
  };

  const mapToForm = (data: IAppUserGetApi): IAppUserGetApi => ({
    user_id: data.user_id || "",
    username: data.username || "",
    user_email: data.user_email || "",
    user_firstname: data.user_firstname || "",
    user_lastname: data.user_lastname || "",
    user_fullname: data.user_fullname || "",
    phone_number: data.phone_number || "",
    user_gender: data.user_gender || null,
    user_avatar: data.user_avatar || null,
    date_of_birth: data.date_of_birth || null,
    job: data.job || null,
    user_status: data.user_status || 0,
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    group_id: data.group_id || null,
    user_session: data.user_session || "",
    parent_id: data.parent_id || null,
    province_id: data.province_id || null,
    district_id: data.district_id || null,
    ward_id: data.ward_id || null,
    object_id: data.object_id || null,
    user_type: data.user_type || "",
    department: data.department || null,
    department_code: data.department_code || null,
    language_session: data.language_session || null,
    rank: data.rank || null,
    company_name: data.company_name || null,
    date_start_work: data.date_start_work || null,
    profession: data.profession || null,
    job_title: data.job_title || null,
    manager_email: data.manager_email || null,
    is_head: data.is_head || "",
    department_v2: data.department_v2 || null,
    department_level2: data.department_level2 || null,
    test_mh: data.test_mh || null,
    otp: data.otp || null,
    otp_expired_at: data.otp_expired_at || null,
    json_data: data.json_data || null,
    keycloak_id: data.keycloak_id || "",
    salesforce_id: data.salesforce_id || null,
    salesforce_token: data.salesforce_token || null,
    expertise: data.expertise || null,
    fcm_token: data.fcm_token || null,
    profile_url: data.profile_url || null,
    partner_code: data.partner_code || null,
    auth_provider: data.auth_provider || null,
  });

  const mapFromForm = (data: IAppUserGetApi): Partial<IAppUserGetApi> => ({
    user_id: data.user_id,
    username: data.username,
    user_email: data.user_email,
    user_firstname: data.user_firstname,
    user_lastname: data.user_lastname,
    phone_number: data.phone_number,
    user_status: data.user_status,
  });

  const mapResponse = (response: any): { data: IAppUserGetApi[] } => {
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
    IAppUserGetApi,
    IAppUserGetApi,
    { page: number; size: number; user_id?: string },
    { user_id?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      user_id?: string;
      user_email?: string;
      phone_number?: string;
      username?: string;
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
      user_id,
    }: {
      page: number;
      size: number;
      user_id?: string;
    }) => {
      const response = await getAppUserApi({
        page,
        size,
        user_id: user_id || "",
      });
      console.log("getAppUserApi response:", response);
      return response;
    },
    fetchTotal: async ({
      user_id,
      from,
      to,
      user_email,
      username,
      phone_number,
    }: {
      user_id?: string;
      from?: string;
      to?: string;
      user_email?: string;
      username?:string
      phone_number?:string
    }) => {
      const response = await getTotalAppUserApi({
        user_id,
        from,
        to,
        user_email,
        username,
        phone_number,
      });
      console.log("getTotalAppUserApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      user_id,
      user_email,
      username,
      phone_number,
      from,
      to,
    }: {
      page: number;
      size: number;
      user_id?: string;
      user_email?: string;
      username?: string;
      phone_number?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchAppUserApi({
        page,
        size,
        user_id,
        user_email,
        username,
        phone_number,
        from,
        to,
      });
      console.log("searchAppUserApi response:", response);
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
      const response = await sortAppUserApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortAppUserApi response:", response);
      return response;
    },
    fetchById: async (user_id: string) => {
      const response = await getAppUserApi({
        page: 1,
        size: 1,
        user_id,
      });
      console.log("getAppUserApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("App User not found");
      }
      return response.data[0];
    },
    addData: patchAppUserApi,
    updateData: patchAppUserApi,
    deleteData: deleteAppUserApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.user_id !== undefined && filters.user_id !== null
      ? String(filters.user_id)
      : "";
  const searchNameTerm =
    filters.user_email !== undefined && filters.user_email !== null
      ? String(filters.user_email)
      : "";
  const searchPhoneTerm =
    filters.phone_number !== undefined && filters.phone_number !== null
      ? String(filters.phone_number)
      : "";
  const searchUsernameTerm =
    filters.username !== undefined && filters.username !== null
      ? String(filters.username)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("user_id", value || null);
  const setSearchNameTerm = (value: string) =>
    setFilter("user_email", value || null);
  const setSearchPhoneTerm = (value: string) =>
    setFilter("phone_number", value || null);
  const setSearchUsernameTerm = (value: string) =>
    setFilter("username", value || null);

  const handleClearSearchId = () => handleClearFilter("user_id");
  const handleClearSearchName = () => handleClearFilter("user_email");
  const handleClearSearchPhone = () => handleClearFilter("phone_number");
  const handleClearSearchUsername = () => handleClearFilter("username");

  const columns = [
    { key: "user_id" as keyof IAppUserGetApi, header: "User ID" },
    { key: "username" as keyof IAppUserGetApi, header: "Username" },
    { key: "user_email" as keyof IAppUserGetApi, header: "Email" },
    { key: "phone_number" as keyof IAppUserGetApi, header: "Phone Number" },
    {
      key: "created_at" as keyof IAppUserGetApi,
      header: "Date Created",
      render: (item: IAppUserGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "updated_at" as keyof IAppUserGetApi,
      header: "Date Updated",
      render: (item: IAppUserGetApi) =>
        new Date(item.updated_at || "").toLocaleString(),
    },
    { key: "actions" as keyof IAppUserGetApi, header: "Actions" },
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
          searchNameTerm={searchNameTerm}
          setSearchNameTerm={setSearchNameTerm}
          searchPhoneTerm={searchPhoneTerm}
          setSearchPhoneTerm={setSearchPhoneTerm}
          searchUsernameTerm={searchUsernameTerm}
          setSearchUsernameTerm={setSearchUsernameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchName}
          handleClearSearchPhone={handleClearSearchPhone}
          handleClearSearchUsername={handleClearSearchUsername}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by User ID"
          idSearchType="number"
          hideAddButton={true}
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
              No app users found for the selected filters.
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
      <AppUserFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteAppUserConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
