import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  deleteEntityFileMappingApi,
  getEntityFileMappingApi,
  getTotalEntityFileMappingApi,
  patchEntityFileMappingApi,
  postEntityFileMappingApi,
  searchEntityFileMappingApi,
  sortEntityFileMappingApi,
} from "../../../services";
import { IEntityFileMappingTableProps } from "./index";
import {
  EntityFileMappingFormModal,
  DeleteEntityFileMappingConfirmationModal,
} from "../index";
import { IEntityFileMappingGetApi } from "../../../models";

export const EntityFileMappingTable: React.FC<IEntityFileMappingTableProps> = (
  props
) => {
  const { children = "" } = props;

  const initialFormData: IEntityFileMappingGetApi = {
    id: "",
    entity_type: "",
    mapping_key: "",
    entity_id: "",
    file_key: null,
    file_name: "",
    file_url: "",
    created_at: "",
    updated_at: "",
    metadata: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "entity_type", label: "Entity Type", type: "text" },
    { key: "mapping_key", label: "Mapping Key", type: "text" },
    { key: "entity_id", label: "Entity ID", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IEntityFileMappingGetApi,
    entity_type: "entity_type" as keyof IEntityFileMappingGetApi,
    mapping_key: "mapping_key" as keyof IEntityFileMappingGetApi,
    entity_id: "entity_id" as keyof IEntityFileMappingGetApi,
    file_name: "file_name" as keyof IEntityFileMappingGetApi,
    file_url: "file_url" as keyof IEntityFileMappingGetApi,
    createdAt: "created_at" as keyof IEntityFileMappingGetApi,
    updated_at: "updated_at" as keyof IEntityFileMappingGetApi,
  };

  const mapToForm = (
    data: IEntityFileMappingGetApi
  ): IEntityFileMappingGetApi => ({
    id: data.id || "",
    entity_type: data.entity_type || "",
    mapping_key: data.mapping_key || "",
    entity_id: data.entity_id || "",
    file_key: data.file_key || null,
    file_name: data.file_name || "",
    file_url: data.file_url || "",
    created_at: data.created_at || "",
    updated_at: data.updated_at || "",
    metadata: data.metadata || "",
  });

  const mapFromForm = (
    data: IEntityFileMappingGetApi
  ): Partial<IEntityFileMappingGetApi> => ({
    id: data.id,
    entity_type: data.entity_type,
    mapping_key: data.mapping_key,
    entity_id: data.entity_id,
    file_key: data.file_key,
    file_name: data.file_name,
    file_url: data.file_url,
    metadata: data.metadata,
  });

  const mapResponse = (response: any): { data: IEntityFileMappingGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        entity_type: item.entity_type || "",
        mapping_key: item.mapping_key || "",
        entity_id: item.entity_id || "",
        file_key: item.file_key || null,
        file_name: item.file_name || "",
        file_url: item.file_url || "",
        created_at: item.created_at || "",
        updated_at: item.updated_at || "",
        metadata: item.metadata || "",
      })),
    };
  };

  const wrappedDeleteEntityFileMappingApi = async (
    id: string
  ): Promise<any> => {
    if (!id) {
      throw new Error("Invalid ID format");
    }
    return await deleteEntityFileMappingApi(id);
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
    IEntityFileMappingGetApi,
    IEntityFileMappingGetApi,
    {
      page: number;
      size: number;
      id?: string;
      entity_type?: string;
      mapping_key?: string;
      entity_id?: string;
    },
    {
      id?: string;
      entity_type?: string;
      mapping_key?: string;
      entity_id?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      id?: string;
      entity_type?: string;
      mapping_key?: string;
      entity_id?: string;
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
      entity_type,
      mapping_key,
      entity_id,
    }) => {
      const response = await getEntityFileMappingApi({
        page,
        size,
        id,
        entity_type,
        mapping_key,
        entity_id,
      });
      return response;
    },
    fetchTotal: async ({
      id,
      entity_type,
      mapping_key,
      entity_id,
      from,
      to,
    }) => {
      const response = await getTotalEntityFileMappingApi({
        id,
        entity_type,
        mapping_key,
        entity_id,
        from,
        to,
      });
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      entity_type,
      mapping_key,
      entity_id,
      from,
      to,
    }) => {
      const response = await searchEntityFileMappingApi({
        page,
        size,
        id,
        entity_type,
        mapping_key,
        entity_id,
        from,
        to,
      });
      return response;
    },
    sortData: async ({ page, size, sort }) => {
      const response = await sortEntityFileMappingApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getEntityFileMappingApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getFileMappingApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("File Mapping not found");
      }
      return response.data[0];
    },
    addData: postEntityFileMappingApi,
    updateData: patchEntityFileMappingApi,
    deleteData: wrappedDeleteEntityFileMappingApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchEntityTypeTerm =
    filters.entity_type !== undefined && filters.entity_type !== null
      ? String(filters.entity_type)
      : "";
  const searchMappingKeyTerm =
    filters.mapping_key !== undefined && filters.mapping_key !== null
      ? String(filters.mapping_key)
      : "";
  const searchEntityIdTerm =
    filters.entity_id !== undefined && filters.entity_id !== null
      ? String(filters.entity_id)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchEntityTypeTerm = (value: string) =>
    setFilter("entity_type", value || null);
  const setSearchMappingKeyTerm = (value: string) =>
    setFilter("mapping_key", value || null);
  const setSearchEntityIdTerm = (value: string) =>
    setFilter("entity_id", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchEntityType = () => handleClearFilter("entity_type");
  const handleClearSearchMappingKey = () => handleClearFilter("mapping_key");
  const handleClearSearchEntityId = () => handleClearFilter("entity_id");
  const columns = [
    { key: "id" as keyof IEntityFileMappingGetApi, header: "ID" },
    {
      key: "entity_type" as keyof IEntityFileMappingGetApi,
      header: "Entity Type",
      render: (item: IEntityFileMappingGetApi) => (
        <div>{item.entity_type || "N/A"}</div>
      ),
    },
    {
      key: "mapping_key" as keyof IEntityFileMappingGetApi,
      header: "Mapping Key",
      render: (item: IEntityFileMappingGetApi) => (
        <div>{item.mapping_key || "N/A"}</div>
      ),
    },
    {
      key: "entity_id" as keyof IEntityFileMappingGetApi,
      header: "Entity ID",
      render: (item: IEntityFileMappingGetApi) => (
        <div>{item.entity_id || "N/A"}</div>
      ),
    },
    {
      key: "file_name" as keyof IEntityFileMappingGetApi,
      header: "File Name",
      render: (item: IEntityFileMappingGetApi) => {
        const maxLength = 50;
        const displayName =
          item.file_name.length > maxLength
            ? item.file_name.substring(0, maxLength) + "..."
            : item.file_name;
        return <div>{displayName}</div>;
      },
    },
    {
      key: "created_at" as keyof IEntityFileMappingGetApi,
      header: "Created At",
      render: (item: IEntityFileMappingGetApi) =>
        new Date(item.created_at).toLocaleString(),
    },
    {
      key: "updated_at" as keyof IEntityFileMappingGetApi,
      header: "Updated At",
      render: (item: IEntityFileMappingGetApi) =>
        new Date(item.updated_at).toLocaleString(),
    },
    {
      key: "actions" as keyof IEntityFileMappingGetApi,
      header: "Actions",
    },
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
          searchNameTerm={searchEntityTypeTerm}
          setSearchNameTerm={setSearchEntityTypeTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchEntityType}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Entity Type"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm={searchMappingKeyTerm}
          searchUsernameTerm={searchEntityIdTerm}
          setSearchPhoneTerm={setSearchMappingKeyTerm}
          setSearchUsernameTerm={setSearchEntityIdTerm}
          handleClearSearchPhone={handleClearSearchMappingKey}
          handleClearSearchUsername={handleClearSearchEntityId}
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
              No Entity File Mappings found for the selected filters.
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

      <EntityFileMappingFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />

      <DeleteEntityFileMappingConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
