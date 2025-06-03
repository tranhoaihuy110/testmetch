import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getMetaDataApi,
  getTotalMetaDataApi,
  searchMetaDataApi,
  sortMetaDataApi,
  postMetaDataApi,
  patchMetaDataApi,
  deleteMetaDataApi,
} from "../../../services";
import { ICategoryTableProps } from "./table-category.type";
import { IMetaDataApi } from "../../../models";
import {
  DeleteCategoryConfirmationModal,
  CategoryFormModal,
} from "../category-modals";

export const CategoryTable: React.FC<ICategoryTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IMetaDataApi = {
    id: "",
    name: "",
    category_id: "",
    category_name: "",
    create_at: "",
    update_at: "",
    data_type: "category",
    data_code: "",
    data_title: "",
    parent_id: "",
    data_image: "",
    data_desc: "",
    referral_name: "",
    referral_email: "",
    referral_phone: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "Category ID", type: "text" },
    { key: "name", label: "Category Name", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IMetaDataApi,
    name: "name" as keyof IMetaDataApi,
    createdAt: "create_at" as keyof IMetaDataApi,
  };

  const mapToForm = (data: IMetaDataApi): IMetaDataApi => ({
    id: data.id || "",
    name: data.name || "",
    category_id: data.category_id || "",
    category_name: data.category_name || "",
    create_at: data.create_at || "",
    update_at: data.update_at || "",
    data_type: data.data_type || "category",
    data_code: data.data_code || "",
    data_title: data.data_title || "",
    parent_id: data.parent_id || "",
    data_image: data.data_image || "",
    data_desc: data.data_desc || "",
    referral_name: data.referral_name || "",
    referral_email: data.referral_email || "",
    referral_phone: data.referral_phone || "",
  });

  const mapFromForm = (data: IMetaDataApi): Partial<IMetaDataApi> => ({
    id: data.id,
    name: data.name,
    category_id: data.category_id,
    category_name: data.category_name,
    data_type: data.data_type || "category",
    data_code: data.data_code,
    data_title: data.data_title,
    parent_id: data.parent_id,
    data_image: data.data_image,
    data_desc: data.data_desc,
    referral_name: data.referral_name,
    referral_email: data.referral_email,
    referral_phone: data.referral_phone,
  });

  const mapResponse = (response: any): { data: IMetaDataApi[] } => ({
    data: response.data,
  });

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
    closeModal,
    openDeleteModal,
    openDetailModal,
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
    IMetaDataApi,
    IMetaDataApi,
    { page: number; size: number; data_type: string; id?: string },
    {
      data_type: string;
      id?: string;
      name?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      data_type: string;
      id?: string;
      name?: string;
      from?: string;
      to?: string;
    },
    {
      page: number;
      size: number;
      data_type: string;
      sort: { field: string; direction: "asc" | "desc" };
    },
    string
  >({
    fetchData: async ({
      page,
      size,
      data_type = "category",
      id,
    }: {
      page: number;
      size: number;
      data_type: string;
      id?: string;
    }) => {
      const response = await getMetaDataApi({
        page,
        size,
        data_type,
        id: id || "",
      });
      return response;
    },
    fetchTotal: async ({
      data_type = "category",
      id,
      name,
      from,
      to,
    }: {
      data_type: string;
      id?: string;
      name?: string;
      from?: string;
      to?: string;
    }) => {
      return getTotalMetaDataApi({
        data_type,
        id,
        name,
        from,
        to,
      });
    },
    searchData: async ({
      page,
      size,
      data_type = "category",
      id,
      name,
      from,
      to,
    }: {
      page: number;
      size: number;
      data_type?: string;
      id?: string;
      name?: string;
      from?: string;
      to?: string;
    }) => {
      return searchMetaDataApi({
        from,
        to,
        page,
        size,
        data_type,
        id,
        name,
      });
      
    },
    sortData: async ({
      page,
      size,
      data_type = "category",
      sort,
    }: {
      page: number;
      size: number;
      data_type: string;
      sort: { field: string; direction: "asc" | "desc" };
    }) => {
      return sortMetaDataApi({
        data_type,
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
    },
    fetchById: async (id: string) => {
      const response = await getMetaDataApi({
        page: 1,
        size: 1,
        data_type: "category",
        id,
      });
      if (!response.data[0]) {
        throw new Error("Category not found");
      }
      return response.data[0];
    },
    addData: postMetaDataApi,
    updateData: patchMetaDataApi,
    deleteData: deleteMetaDataApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchNameTerm =
    filters.name !== undefined && filters.name !== null
      ? String(filters.name)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchNameTerm = (value: string) => setFilter("name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchName = () => handleClearFilter("name");

  const columns = [
    { key: "id" as keyof IMetaDataApi, header: "Category ID" },
    { key: "name" as keyof IMetaDataApi, header: "Category Name" },
    {
      key: "create_at" as keyof IMetaDataApi,
      header: "Date Create",
      render: (item: IMetaDataApi) =>
        new Date(item.create_at || "").toLocaleString(),
    },
    {
      key: "update_at" as keyof IMetaDataApi,
      header: "Date Update",
      render: (item: IMetaDataApi) =>
        new Date(item.update_at || "").toLocaleString(),
    },
    { key: "actions" as keyof IMetaDataApi, header: "Actions" 
      
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
          searchNameTerm={searchNameTerm}
          setSearchNameTerm={setSearchNameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchName}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          firstSearchLabel="Search by Category ID"
          idSearchType="number"
          secondSearchLabel = "Search by Category Name"
          hideAddButton={false}
          hidePhoneEmail={true}
          hideNameSearch={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchNameTerm}
          setSearchUsernameTerm={setSearchNameTerm}
          handleClearSearchPhone={handleClearSearchId}
          handleClearSearchUsername={handleClearSearchId}
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
          ) : paginatedData.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No category found for the selected filters.
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
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        category={currentItem || initialFormData}
      />
      <DeleteCategoryConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        category={itemToDelete || null}
      />
      {children}
    </>
  );
};
