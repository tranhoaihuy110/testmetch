/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  deleteLeadPopertyFloorsApi,
  getLeadPropertyFloorsApi,
  getTotalLeadPropertyFloorsApi,
  patchLeadPropertyFloorsApi,
  postLeadPropertyFloorsApi,
  searchLeadPropertyFloorsApi,
  sortLeadPropertyFloorsApi,
} from "../../../services";
import { ILeadPropertyFloorsTableProps } from "./index";
import { ILeadPropertyFloorsGetApi } from "../../../models";
import {
  LeadPropertyFloorsFormModal,
  DeleteLeadPropertyFloorsConfirmationModal,
} from "../index";


export const LeadPropertyFloorsTable: React.FC<ILeadPropertyFloorsTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: ILeadPropertyFloorsGetApi = {
    id: "",
    lead_property_id: "",
    floor_type: "",
    floor_name: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "lead_property_id", label: "Leads Property ID", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ILeadPropertyFloorsGetApi,
    key: "lead_property_id" as keyof ILeadPropertyFloorsGetApi,
    createdAt: "created_at" as keyof ILeadPropertyFloorsGetApi,
  };

  const mapToForm = (data: ILeadPropertyFloorsGetApi): ILeadPropertyFloorsGetApi => ({
    id: data.id || "",
    lead_property_id: data.lead_property_id || "",
    floor_type: data.floor_type || "",
    floor_name: data.floor_name || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: ILeadPropertyFloorsGetApi
  ): Partial<ILeadPropertyFloorsGetApi> => ({
    id: data.id,
    lead_property_id: data.lead_property_id,
    floor_type: data.floor_type,
    floor_name: data.floor_name,
  });

  const mapResponse = (response: any): { data: ILeadPropertyFloorsGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        lead_property_id: item.lead_property_id || "", 
        floor_type: item.floor_type || "",
        floor_name: item.floor_name || "",
        created_at: item.created_at || "",
      })),
    };
  };

  const wrappedDeleteLeadPropertyFloorsApi = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteLeadPopertyFloorsApi(id);
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
    ILeadPropertyFloorsGetApi,
    ILeadPropertyFloorsGetApi,
    { page: number; size: number; id?: string; lead_property_id?: string },
    { id?: string; lead_property_id?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      lead_property_id?: string;
      floor_type?: string;
      floor_name?: string;
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
      lead_property_id,
      floor_type,
      floor_name,
    }: {
      page: number;
      size: number;
      id?: string;
      lead_property_id?: string;
      floor_type?: string;
      floor_name?: string;
    }) => {
      const response = await getLeadPropertyFloorsApi({
        page,
        size,
        id: id || "",
        lead_property_id: lead_property_id || "",
        floor_type: floor_type || "",
        floor_name: floor_name || "",

      });
      console.log("getLeadPropertyFloorsApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      lead_property_id,
      from,
      to,
    }: {
      id?: string;
      lead_property_id?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalLeadPropertyFloorsApi({
        id,
        lead_property_id,
        from,
        to,
      });
      console.log("get TotalLeadPropertyFloorsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      lead_property_id,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      lead_property_id?: string;
      floor_type?: string;
      floor_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadPropertyFloorsApi({
        page,
        size,
        id,
        lead_property_id,
        from,
        to,
      });
      console.log("searchLeadPropertyFloorsApi response:", response);
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
      const response = await sortLeadPropertyFloorsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortLeadPropertyFloorsApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getLeadPropertyFloorsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getLeadPropertyFloorsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postLeadPropertyFloorsApi,
    updateData: patchLeadPropertyFloorsApi,
    deleteData: wrappedDeleteLeadPropertyFloorsApi,
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
    filters.lead_property_id !== undefined && filters.lead_property_id !== null
      ? String(filters.lead_property_id)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchKeyTerm = (value: string) =>
    setFilter("lead_property_id", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchKey = () => handleClearFilter("lead_property_id");

   const columns = [
    { key: "id" as keyof ILeadPropertyFloorsGetApi, header: "ID" },
    {
      key: "lead_property_id" as keyof ILeadPropertyFloorsGetApi,
      header: "Leads Property ID",
    },
    {
      key: "floor_type" as keyof ILeadPropertyFloorsGetApi,
      header: "Floor type",
    },
    {
      key: "floor_name" as keyof ILeadPropertyFloorsGetApi,
      header: "Floor name",
    },
    {
      key: "created_at" as keyof ILeadPropertyFloorsGetApi,
      header: "Created At",
      render: (item: ILeadPropertyFloorsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
      key: "actions" as keyof ILeadPropertyFloorsGetApi,
      header: "Actions",
    },
  ];

  console.log("LeadPropertyFloorsTable state:", {
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
          secondSearchLabel="Search by Leads Property ID"
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

      <LeadPropertyFloorsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteLeadPropertyFloorsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

      {children}
    </>
  );
};