import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getCommonFaqApi,
  getTotalCommonFaqApi,
  searchCommonFaqApi,
  sortCommonFaqApi,
  postCommonFaqApi,
  patchCommonFaqApi,
  deleteCommonFaqApi,
} from "../../../services";
import { ICommonFaqTableProps } from "./index";
import {ICommonFaqGetApi} from '../../.././models'
import { CommonFaqFormModal, DeleteCommonFaqConfirmationModal } from "../index";

export const CommonFaqTable: React.FC<ICommonFaqTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: ICommonFaqGetApi = {
    id: 0,
    faq_q: "",
    faq_a: "",
    faq_type: "",
    create_date: "",
    tenacy_id: "",
    faq_status: 0,
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "Id", type: "text" },
    { key: "faq_q", label: "Question", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof ICommonFaqGetApi,
    faq_q: "faq_q" as keyof ICommonFaqGetApi,
    createdAt: "create_date" as keyof ICommonFaqGetApi,
  };

  const mapToForm = (data: ICommonFaqGetApi): ICommonFaqGetApi => ({
    id: data.id || 0,
    faq_q: data.faq_q || "",
    faq_a: data.faq_a || "",
    faq_type: data.faq_type || "",
    create_date: data.create_date || "",
    tenacy_id: data.tenacy_id || "",
    faq_status: data.faq_status || 0,
  });

  const mapFromForm = (data: ICommonFaqGetApi): Partial<ICommonFaqGetApi> => ({
    id: data.id,
    faq_q: data.faq_q,
    faq_a: data.faq_a,
    faq_type: data.faq_type || "",
    tenacy_id: data.tenacy_id || "",
    faq_status: data.faq_status || 0,
  });

  const mapResponse = (response: any): { data: ICommonFaqGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || 0,
        faq_q: item.faq_q || "",
        faq_a: item.faq_a || "",
        faq_type: item.faq_type || "",
        create_date: item.create_date || "",
        tenacy_id: item.tenacy_id || "",
        faq_status: item.faq_status || 0,
      })),
    };
  };

  const wrappedDeleteCommonFaqApi = async (id: string): Promise<any> => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error("Invalid ID format");
    }
    return await deleteCommonFaqApi(String(numericId));
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
    ICommonFaqGetApi,
    ICommonFaqGetApi,
    { page: number; size: number; id?: string; faq_q?: string },
    { id?: string; faq_q?: string; from?: string; to?: string },
    { page: number; size: number; id?: string; faq_q?: string; from?: string; to?: string },
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
      faq_q?: string;
    }) => {
      const response = await getCommonFaqApi({
        page,
        size,
        id: id || "",
      });
      console.log("getCommonFaqApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      faq_q,
      from,
      to,
    }: {
      id?: string;
      faq_q?:string
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalCommonFaqApi({
        id,
        from,
        faq_q,
        to,
      });
      console.log("getTotalCommonFaqApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      faq_q,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      faq_q?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchCommonFaqApi({
        page,
        size,
        id,
        faq_q,
        from,
        to,
      });
      console.log("searchCommonFaqApi response:", response);
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
      const response = await sortCommonFaqApi({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortCommonFaqApi response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getCommonFaqApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getCommonFaqApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("FAQ not found");
      }
      return response.data[0];
    },
    addData: postCommonFaqApi,
    updateData: patchCommonFaqApi,
    deleteData: wrappedDeleteCommonFaqApi,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchQuestionTerm =
    filters.faq_q !== undefined && filters.faq_q !== null
      ? String(filters.faq_q)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchQuestionTerm = (value: string) => setFilter("faq_q", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchQuestion = () => handleClearFilter("faq_q");

  const columns = [
    { key: "id" as keyof ICommonFaqGetApi, header: "ID" },
    {
      key: "faq_q" as keyof ICommonFaqGetApi,
      header: "Question",
      render: (item: ICommonFaqGetApi) => {
        const maxLength = 50;
        const displayQuestion =
          (item.faq_q || "").length > maxLength
            ? (item.faq_q || "").substring(0, maxLength) + "..."
            : item.faq_q || "";
        return <div>{displayQuestion}</div>;
      },
    },
    {
      key: "faq_a" as keyof ICommonFaqGetApi,
      header: "Answer",
      render: (item: ICommonFaqGetApi) => {
        const maxLength = 80;
        const displayAnswer =
          (item.faq_a || "").length > maxLength
            ? (item.faq_a || "").substring(0, maxLength) + "..."
            : item.faq_a || "";
        return <div>{displayAnswer}</div>;
      },
    },
    { key: "faq_type" as keyof ICommonFaqGetApi, header: "Type" },
    {
      key: "create_date" as keyof ICommonFaqGetApi,
      header: "Date Created",
      render: (item: ICommonFaqGetApi) =>
        new Date(item.create_date || "").toLocaleString(),
    },
    { key: "faq_status" as keyof ICommonFaqGetApi, header: "Status" },
    { key: "actions" as keyof ICommonFaqGetApi, header: "Actions" },
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
          searchNameTerm={searchQuestionTerm}
          setSearchNameTerm={setSearchQuestionTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchQuestion}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Question"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={false}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchQuestionTerm}
          setSearchUsernameTerm={setSearchQuestionTerm}
          handleClearSearchPhone={handleClearSearchQuestion}
          handleClearSearchUsername={handleClearSearchQuestion}
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
              No FAQs found for the selected filters.
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
      <CommonFaqFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={modalMode === "add" ? handleAddItem : handleEditItem}
        mode={modalMode}
        config={currentItem || initialFormData}
      />
      <DeleteCommonFaqConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteItem}
        config={itemToDelete || null}
      />
      {children}
    </>
  );
};