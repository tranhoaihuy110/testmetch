/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
    FilterSection,
    PaginationSection,
    TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
    getLeadsReferPartnerApi,
    getTotalLeadsReferPartnerApi,
    searchLeadsReferPartnerApi,
    sortLeadsReferPartnerApi,
    postLeadsReferPartnerApi,
    patchLeadsReferPartnerApi,
    deleteLeadsReferPartnerApi,
} from "../../../services";
import { ILeadsReferPartnerTableProps } from "./index";
import { ILeadsReferPartnerGetApi,ILeadsReferPartnerPatchApi } from "../../../models";
import {
  LeadsReferPartnerFormModal,
  DeleteLeadsReferPartnerConfirmationModal,
} from "../index";

export const LeadsReferPartnerTable: React.FC<ILeadsReferPartnerTableProps> = (props) => {
    const { children = "" } = props;

    const initialFormData: ILeadsReferPartnerGetApi = {
    refer_partner_id: "",
    lead_id: 0,
    email: "",
    created_at: "",
    updated_at: "",
    updated_by: "",
    json_metadata: {},
    refer_partner_status: "",
    trans_value: "",
    };

    const filterConfig: FilterConfig[] = [
    { key: "refer_partner_id", label: "Refer Partner ID", type: "text" },
    { key: "lead_id", label: "Lead ID", type: "text" },
    { key: "email", label: "Email", type: "text" },
    ];

    const fieldMapping = {
    id: "refer_partner_id" as keyof ILeadsReferPartnerGetApi,
    name: "lead_id" as keyof ILeadsReferPartnerGetApi,
    type: "email" as keyof ILeadsReferPartnerGetApi,
    createdAt: "create_at" as keyof ILeadsReferPartnerGetApi,
    };

    const mapToForm = (data: ILeadsReferPartnerGetApi): ILeadsReferPartnerGetApi => ({
        refer_partner_id: data.refer_partner_id || "",
        lead_id: data.lead_id|| 0,
        email: data.email|| "",
        created_at: data.created_at || "",
        updated_at: data.updated_at|| "",
        updated_by: data.updated_by || "",
        json_metadata: data.json_metadata|| {},
        refer_partner_status: data.refer_partner_status|| "",
        trans_value: data.trans_value|| "",
    });

    const mapFromForm = (data: ILeadsReferPartnerGetApi): Partial<ILeadsReferPartnerPatchApi> => {
    return {
        refer_partner_id: data.refer_partner_id,
        lead_id: data.lead_id,
        json_metadata: data.json_metadata,
        refer_partner_status: data.refer_partner_status,
        trans_value: data.trans_value,
        updated_by: data.updated_by,
    };
    };

    const mapResponse = (response: any ): { data: ILeadsReferPartnerGetApi[] } => {
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
    ILeadsReferPartnerGetApi,
    ILeadsReferPartnerGetApi,
    { page: number; size: number; refer_partner_id?: string },
    { refer_partner_id?: string; from?: string; to?: string },
    { page: number; size: number; refer_partner_id?: string; lead_id?: string; email?: string; from?: string; to?: string },
    { page: number; size: number; sort: { field: string; direction: "asc" | "desc" } },
    string
  >({
    fetchData: async ({
      page,
      size,
      refer_partner_id,
    }: {
      page: number;
      size: number;
      refer_partner_id?: string;
    }) => {
      const response = await getLeadsReferPartnerApi({
        page,
        size,
        refer_partner_id: refer_partner_id || "",
      });
      console.log("get Leads Refer Partner Api response:", response);
      return response;
    },
    fetchTotal: async ({
      refer_partner_id,
      from,
      to,
      lead_id,
    }: {
      refer_partner_id?: string;
      from?: string;
      to?: string;
      lead_id?:string;
    }) => {
      const response = await getTotalLeadsReferPartnerApi({
        refer_partner_id,
        from,
        to,
        lead_id,
      });
      console.log("get Total Leads Refer Partner Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      refer_partner_id,
      lead_id,
      email,
      from,
      to,
    }: {
      page: number;
      size: number;
      refer_partner_id?: string;
      lead_id?: string;
      email?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadsReferPartnerApi({
        page,
        size,
        refer_partner_id,
        lead_id,
        email,
        from,
        to,
      });
      console.log("search Leads Refer Partner Api response:", response);
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
      const response = await sortLeadsReferPartnerApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Leads Refer Partner Api response:", response);
      return response;
    },
    fetchById: async (refer_partner_id: string) => {
      const response = await getLeadsReferPartnerApi({
        page: 1,
        size: 1,
        refer_partner_id,
      });
      console.log("get Leads Refer Partner Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error(" Leads Refer Partner not found");
      }
      return response.data[0];
    },
    addData: postLeadsReferPartnerApi,
    updateData: patchLeadsReferPartnerApi,
    deleteData: deleteLeadsReferPartnerApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.refer_partner_id !== undefined && filters.refer_partner_id !== null
      ? String(filters.refer_partner_id)
      : "";
  const searchEmailTerm =
    filters.lead_id !== undefined && filters.lead_id !== null
      ? String(filters.lead_id)
      : "";
  const searchAddressTerm =
    filters.email !== undefined && filters.email !== null
      ? String(filters.email)
      : "";

  const setSearchIdTerm = (value: string) =>
    setFilter("refer_partner_id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("lead_id", value || null);
  const setSearchTypeTerm = (value: string) =>
    setFilter("email", value || null);

  const handleClearSearchId = () => handleClearFilter("refer_partner_id");
  const handleClearSearchEmail = () => handleClearFilter("lead_id");
  const handleClearSearchAddress = () => handleClearFilter("email");

  const columns = [
  { key: "refer_partner_id" as keyof ILeadsReferPartnerGetApi, header: "Refer Partner ID" },
  { key: "lead_id" as keyof ILeadsReferPartnerGetApi, header: "Lead ID" },
  { key: "email" as keyof ILeadsReferPartnerGetApi, header: "Email" },
  {
    key: "created_at" as keyof ILeadsReferPartnerGetApi,
    header: "Date Created",
    render: (item: ILeadsReferPartnerGetApi) =>
      new Date(item.created_at || "").toLocaleString(),
  },
  {
    key: "updated_at" as keyof ILeadsReferPartnerGetApi,
    header: "Date Updated",
    render: (item: ILeadsReferPartnerGetApi) =>
      new Date(item.updated_at || "").toLocaleString(),
  },
  { key: "actions" as keyof ILeadsReferPartnerGetApi, header: "Actions" },
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
          firstSearchLabel="Search by Reder partner ID"
          secondSearchLabel="Search by Lead ID"
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
              No lead Leads Refer Partner found for the selected filters.
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
      <LeadsReferPartnerFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteLeadsReferPartnerConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};