import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCommonBranchPostcodeApi,
  getTotalCommonBranchPostcodeApi,
  searchCommonBranchPostcodeApi,
  sortCommonBranchPostcodeApi,
  postCommonBranchPostcodeApi,
  patchCommonBranchPostcodeApi,
  deleteCommonBranchPostcodeApi,
} from "../../../services";
import { ICommonBranchPostcodeTableProps } from "./index";
import { ICommonBranchPostcodeGetApi } from "../../../models";
import {  CommonBranchPostcodeDetailModal,DeleteCommonBranchPostcodeConfirmationModal } from "../index";

export const CommonBranchPostcodeTable: React.FC<ICommonBranchPostcodeTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICommonBranchPostcodeGetApi = {
    id: "",
    user_name: "",
    branch: "",
    postcodes: "",
    created_at: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "branch", label: "Branch", type: "text" },
    { key: "postcodes", label: "Postcodes", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICommonBranchPostcodeGetApi,
    user_name: "value" as keyof ICommonBranchPostcodeGetApi,
    createdAt: "created_at" as keyof ICommonBranchPostcodeGetApi,
  };

  const mapToForm = (data: ICommonBranchPostcodeGetApi): ICommonBranchPostcodeGetApi => ({
    id: data.id || "",
    user_name: data.user_name || "",
    branch: data.branch || "",
    postcodes: data.postcodes || "",
    created_at: data.created_at || "",
  });

  const mapFromForm = (data: ICommonBranchPostcodeGetApi): Partial<ICommonBranchPostcodeGetApi> => ({
    id: data.id,
    user_name: data.user_name,
    branch: data.branch ,
    postcodes: data.postcodes ,
    created_at: data.created_at ,
  });

  const mapResponse = (response: any): { data: ICommonBranchPostcodeGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
   return {
      data: response.data.map((item: any) => ({
        id: item.id || "",
        user_name: item.user_name || "",
        branch: item.branch || "",
        postcodes: item.postcodes || "",
        created_at: item.created_at || "",
      })),
    };
  };
  const wrappedDeleteCommonBranchPostcodeApi = async (
    id: string
  ): Promise<any> => {
    return await deleteCommonBranchPostcodeApi(id);
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
    ICommonBranchPostcodeGetApi,
    ICommonBranchPostcodeGetApi,
    { page: number; size: number; id: string },
    { id: string; from?: string; to?: string },
    { page: number; size: number; id: string; from?: string; to?: string },
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
      id: string;
    }) => {
      const response = await getCommonBranchPostcodeApi({
        page,
        size,
        id: id ,
      });
      console.log("getCommonBranchPostcodeApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      from,
      to,
    }: {
      id?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalCommonBranchPostcodeApi({
        id,
        from,
        to,
      });
      console.log("getTotalCommonBranchPostcodeApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      from,
      to,
      user_name,
    }: {
      page: number;
      size: number;
      id?: string;
      from?: string;
      to?: string;
      user_name?: string;
    }) => {
      const response = await searchCommonBranchPostcodeApi({
        page,
        size,
        id,
        from,
        to,
        user_name,
      });
      console.log("searchCommonBranchPostcodeApi response:", response);
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
      const response = await sortCommonBranchPostcodeApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCommonBranchPostcodeApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCommonBranchPostcodeApi({
        page: 1,
        size: 1,
        id: id ,
      });
      console.log("getCommonBranchPostcodeApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("Common Branch Postcode not found");
      }
      return response.data[0];
    },
    addData: postCommonBranchPostcodeApi,
    updateData: patchCommonBranchPostcodeApi,
    deleteData: wrappedDeleteCommonBranchPostcodeApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null
      ? String(filters.id)
      : "";
  const searchUserNameTerm =
    filters.user_name !== undefined && filters.user_name !== null
      ? String(filters.user_name)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchUserNameTerm = (value: string) =>
    setFilter("user_name", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchUsername = () => handleClearFilter("user_name");

  const columns = [
    { key: "id" as keyof ICommonBranchPostcodeGetApi, header: "ID" },
    {
      key: "user_name" as keyof ICommonBranchPostcodeGetApi,
      header: "Username",
      render: (item: ICommonBranchPostcodeGetApi) => {
        const maxLength = 80;
        const displayValue =
          (item.user_name || "").length > maxLength
            ? (item.user_name || "").substring(0, maxLength) + "..."
            : item.user_name || "";
        return <div>{displayValue}</div>;
      },
    },
    { key: "branch" as keyof ICommonBranchPostcodeGetApi, header: "Branch",
         render: (item: ICommonBranchPostcodeGetApi) => {
        const maxLength = 80;
        const displayValue =
          (item.branch || "").length > maxLength
            ? (item.branch || "").substring(0, maxLength) + "..."
            : item.branch || "";
        return <div>{displayValue}</div>;
      },
     },
    { key: "postcodes" as keyof ICommonBranchPostcodeGetApi, header: "Postcodes",
         render: (item: ICommonBranchPostcodeGetApi) => {
        const maxLength = 80;
        const displayValue =
          (item.postcodes || "").length > maxLength
            ? (item.postcodes || "").substring(0, maxLength) + "..."
            : item.postcodes || "";
        return <div>{displayValue}</div>;
      },
     },
    {
      key: "created_at" as keyof ICommonBranchPostcodeGetApi,
      header: "Date Created",
      render: (item: ICommonBranchPostcodeGetApi) =>
        new Date(item.created_at || "").toLocaleString(),
    },
    { key: "actions" as keyof ICommonBranchPostcodeGetApi, header: "Actions" },
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
          searchNameTerm={searchUserNameTerm}
          setSearchNameTerm={setSearchUserNameTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchUsername}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Username"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
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
              No app configs found for the selected filters.
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
      <CommonBranchPostcodeDetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteCommonBranchPostcodeConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};
