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
  deleteLeadsPropertyRoomsApi,
  getLeadsPropertyRoomsApi,
  getTotalLeadsPropertyRoomsApi,
  patchLeadsPropertyRoomsApi,
  postLeadsPropertyRoomsApi,
  searchLeadsPropertyRoomsApi,
  sortLeadsPropertyRoomsApi,
} from "../../../services";
import { ILeadsPropertyRoomsTableProps } from "./index";
import { ILeadsPropertyRoomsGetApi } from "../../../models";
import {
  LeadsPropertyRoomsFormModal,
  DeleteLeadsPropertyRoomsConfirmationModal,
} from "../index";


export const LeadsPropertyRoomsTable: React.FC<ILeadsPropertyRoomsTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: ILeadsPropertyRoomsGetApi = {
    id: "",
    lead_property_id: "",
    floor_id: "",
    floor_name: "",
    room_type: "",
    room_name: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "lead_property_id", label: "Leads Property ID", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ILeadsPropertyRoomsGetApi,
    key: "lead_property_id" as keyof ILeadsPropertyRoomsGetApi,
    createdAt: "created_at" as keyof ILeadsPropertyRoomsGetApi,
  };

  const mapToForm = (data: ILeadsPropertyRoomsGetApi): ILeadsPropertyRoomsGetApi => ({
    id: data.id || "",
    lead_property_id: data.lead_property_id || "",
    floor_id: data.floor_id || "",
    floor_name: data.floor_name || "",
    room_type: data.room_type || "",
    room_name: data.room_name || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (
    data: ILeadsPropertyRoomsGetApi
  ): Partial<ILeadsPropertyRoomsGetApi> => ({
    id: data.id,
    lead_property_id: data.lead_property_id,
    floor_id: data.floor_id,
    floor_name: data.floor_name,
    room_type: data.room_type,
    room_name: data.room_name,
    created_at: data.created_at,
  });

  const mapResponse = (response: any): { data: ILeadsPropertyRoomsGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        lead_property_id: item.lead_property_id || "",
        floor_id: item.floor_id || "",
        floor_type: item.floor_type || "",
        floor_name: item.floor_name || "",
        room_name: item.room_name || "",
        created_at: item.created_at || "",
      })),
    };
  };

  const wrappedDeleteLeadsPropertyRoomsApi = async (id: string): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteLeadsPropertyRoomsApi(id);
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    itemsPerPageOptions,
    isModalOpen,
    modalMode,
    currentItem,
    isDeleteModalOpen,
    itemToDelete,
    filters,
    setFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
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
    ILeadsPropertyRoomsGetApi,
    ILeadsPropertyRoomsGetApi,
    { page: number; size: number; id?: string; lead_property_id?: string },
    { id?: string; lead_property_id?: string; from?: string; to?: string },
    {
        page: number;
        size: number;
        id?: string;
        lead_property_id?: string;
        floor_id?: string;
        floor_name?: string;
        room_type?: string;
        room_name?: string;
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
      floor_id,
      floor_name,
    }: {
      page: number;
      size: number;
      id?: string;
      lead_property_id?: string;
      floor_id?: string;
      floor_name?: string;
    }) => {
      const response = await getLeadsPropertyRoomsApi({
        page,
        size,
        id: id || "",
        lead_property_id: lead_property_id || "",
        floor_id: floor_id || "",
        floor_name: floor_name || "",

      });
      console.log("get Leads Property Rooms Api response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      lead_property_id,
      from,
      to,
      floor_name,
    }: {
      id?: string;
      lead_property_id?: string;
      floor_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalLeadsPropertyRoomsApi({
        id,
        lead_property_id,
        from,
        to,
        floor_name,
      });
      console.log("get Total Leads Property Rooms Api response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      floor_name,
      floor_id,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      floor_id?: string;
      floor_name?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchLeadsPropertyRoomsApi({
        page,
        size,
        id,
        floor_id,
        floor_name,
        from,
        to,
      });
      console.log("search Leads Property Rooms Api response:", response);
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
      const response = await sortLeadsPropertyRoomsApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sort Leads Property Rooms Api response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getLeadsPropertyRoomsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("get Leads Property Rooms Api (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Metadata not found");
      }
      return response.data[0];
    },
    addData: postLeadsPropertyRoomsApi,
    updateData: patchLeadsPropertyRoomsApi,
    deleteData: wrappedDeleteLeadsPropertyRoomsApi,
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
    filters.floor_name !== undefined && filters.floor_name !== null
        ? String(filters.floor_name)
        : "";

    const setSearchIdTerm = (value: string) => setFilter("id", value || null);
    const setSearchKeyTerm = (value: string) =>
    setFilter("floor_name", value || null);

    const handleClearSearchId = () => handleClearFilter("id");
    const handleClearSearchKey = () => handleClearFilter("floor_name");

    const columns = [
    { key: "id" as keyof ILeadsPropertyRoomsGetApi, header: "ID" },
    {
        key: "lead_property_id" as keyof ILeadsPropertyRoomsGetApi,
        header: "Leads Property ID",
    },
    {
        key: "floor_id" as keyof ILeadsPropertyRoomsGetApi,
        header: "floor ID",
    },
    {
        key: "floor_name" as keyof ILeadsPropertyRoomsGetApi,
        header: "Floor name",
    },
    {
        key: "room_type" as keyof ILeadsPropertyRoomsGetApi,
        header: "Room Type",
    },
    {
        key: "room_name" as keyof ILeadsPropertyRoomsGetApi,
        header: "Room Name",
    },
    {
        key: "created_at" as keyof ILeadsPropertyRoomsGetApi,
        header: "Created At",
        render: (item: ILeadsPropertyRoomsGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    {
        key: "actions" as keyof ILeadsPropertyRoomsGetApi,
        header: "Actions",
    },
    ];

    console.log("Leads Property Rooms Table state:", {
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
            secondSearchLabel="Search by Floor Name"
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

        <LeadsPropertyRoomsFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
        />

        <DeleteLeadsPropertyRoomsConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />

        {children}
    </>
    );
};