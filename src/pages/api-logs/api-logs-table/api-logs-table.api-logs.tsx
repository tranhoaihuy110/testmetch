import React from "react";
import {
  FilterSection,
  PaginationSection,
  TableComponent,
} from "../../../components/table";
import { FilterConfig, useTableData } from "../../../hooks/use-table-test";
import {
  getApiLogsApi,
  searchApiLogs,
  sortApiLogs,
  getTotalApiLogsApi,
} from "../../../services";
import { IApiLogsTableProps } from "./index";
import { IApiLogsGetApi } from "../../../models";
import { ApiLogsDetailModal } from "../index";
import { ActionButtons } from "../../../components/table/action-buttons";
export const ApiLogsTable: React.FC<IApiLogsTableProps> = (props) => {
  const { children = "" } = props;

  const initialFormData: IApiLogsGetApi = {
    id: "",
    name_log: "",
    input: null,
    output: "",
    create_date: "",
  };

  const filterConfig: FilterConfig[] = [
    { key: "id", label: "ID", type: "text" },
    { key: "name_log", label: "Log Name", type: "text" },
  ];

  const fieldMapping = {
    id: "id" as keyof IApiLogsGetApi,
    name_log: "name_log" as keyof IApiLogsGetApi,
    createdAt: "create_date" as keyof IApiLogsGetApi,
  };

  const mapToForm = (data: IApiLogsGetApi): IApiLogsGetApi => ({
    id: data.id || "",
    name_log: data.name_log || "",
    input: data.input || null,
    output: data.output || "",
    create_date: data.create_date || "",
  });

  const mapFromForm = (data: IApiLogsGetApi): Partial<IApiLogsGetApi> => ({
    id: data.id,
    name_log: data.name_log,
    input: data.input,
    output: data.output,
  });

  const mapResponse = (response: any): { data: IApiLogsGetApi[] } => {
    if (!response || !response.data) {
      return { data: [] };
    }
    return {
      data: response.data.map((item: any) => ({
        id: item.id || 0,
        name_log: item.name_log || "",
        input: item.input || null,
        output: item.output || "",
        created_at: item.created_at || "",
      })),
    };
  };

  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
 
    itemsPerPageOptions,
    isModalOpen,
    modalMode,
    currentItem,


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
    paginatedData,
    effectiveTotalItems,
    sortConfig,
    loading,
    error,
  } = useTableData<
    IApiLogsGetApi,
    IApiLogsGetApi,
    { page: number; size: number; id?: string; name_log?: string },
    { id?: string; name_log?: string; from?: string; to?: string },
    {
      page: number;
      size: number;
      id?: string;
      name_log?: string;
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
    }) => {
      const response = await getApiLogsApi({
        page,
        size,
        id: id || "",
      });
      console.log("getApiLogsApi response:", response);
      return response;
    },
    fetchTotal: async ({
      id,
      name_log,
      from,
      to,
    }: {
      id?: string;
      name_log?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await getTotalApiLogsApi({
        id,
        name_log,
        from,
        to,
      });
      console.log("getTotalApiLogsApi response:", response);
      return response;
    },
    searchData: async ({
      page,
      size,
      id,
      name_log,
      from,
      to,
    }: {
      page: number;
      size: number;
      id?: string;
      name_log?: string;
      from?: string;
      to?: string;
    }) => {
      const response = await searchApiLogs({
        page,
        size,
        id,
        name_log,
        from,
        to,
      });
      console.log("searchApiLogs response:", response);
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
      const response = await sortApiLogs({
        option: sort.field,
        ascDesc: sort.direction,
        page,
        size,
      });
      console.log("sortApiLogs response:", response);
      return response;
    },
    fetchById: async (id: string) => {
      const response = await getApiLogsApi({
        page: 1,
        size: 1,
        id,
      });
      console.log("getApiLogsApi (fetchById) response:", response);
      if (!response.data || !response.data[0]) {
        throw new Error("API Log not found");
      }
      return response.data[0];
    },
    addData: undefined,
    updateData: undefined,
    deleteData: undefined,
    mapToForm,
    mapFromForm,
    initialFormData,
    mapResponse,
    filterConfig,
    fieldMapping,
  });

  const searchIdTerm =
    filters.id !== undefined && filters.id !== null ? String(filters.id) : "";
  const searchNameLogTerm =
    filters.name_log !== undefined && filters.name_log !== null
      ? String(filters.name_log)
      : "";

  const setSearchIdTerm = (value: string) => setFilter("id", value || null);
  const setSearchNameLogTerm = (value: string) =>
    setFilter("name_log", value || null);

  const handleClearSearchId = () => handleClearFilter("id");
  const handleClearSearchNameLog = () => handleClearFilter("name_log");

  const columns = [
    { key: "id" as keyof IApiLogsGetApi, header: "ID" },
    { key: "name_log" as keyof IApiLogsGetApi, header: "Log Name" },
    {
      key: "input" as keyof IApiLogsGetApi,
      header: "Input",
      render: (item: IApiLogsGetApi) => {
        const maxLength = 50;
        const displayInput =
          (item.input || "").length > maxLength
            ? (item.input || "").substring(0, maxLength) + "..."
            : item.input || "";
        return <div>{displayInput}</div>;
      },
    },
    {
      key: "output" as keyof IApiLogsGetApi,
      header: "Output",
      render: (item: IApiLogsGetApi) => {
        const maxLength = 80;
        const displayOutput =
          (item.output || "").length > maxLength
            ? (item.output || "").substring(0, maxLength) + "..."
            : item.output || "";
        return <div>{displayOutput}</div>;
      },
    },
    {
      key: "create_date" as keyof IApiLogsGetApi,
      header: "Created At",
      render: (item: IApiLogsGetApi) =>
        new Date(item.create_date || "").toLocaleString(),
    },
    {
      key: "actions" as keyof IApiLogsGetApi,
      header: "Actions",
      render: (item: IApiLogsGetApi) => (
        <ActionButtons
          item={item}
          onEdit={undefined}
          onDelete={undefined}
          onDetail={openDetailModal}
        />
      ),
    },
  ];
  console.log("ApiLogsTable state:", { isModalOpen, modalMode, currentItem });
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
          searchNameTerm={searchNameLogTerm}
          setSearchNameTerm={setSearchNameLogTerm}
          handleClearSearchId={handleClearSearchId}
          handleClearSearchName={handleClearSearchNameLog}
          handleSearch={handleSearch}
          handleReset={handleReset}
          openAddModal={openAddModal}
          hideNameSearch={false}
          firstSearchLabel="Search by ID"
          secondSearchLabel="Search by Log Name"
          idSearchType="text"
          hidePhoneEmail={true}
          hideAddButton={true}
          searchPhoneTerm=""
          searchUsernameTerm=""
          setSearchPhoneTerm={setSearchNameLogTerm}
          setSearchUsernameTerm={setSearchNameLogTerm}
          handleClearSearchPhone={handleClearSearchNameLog}
          handleClearSearchUsername={handleClearSearchNameLog}
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
              No API logs found for the selected filters.
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
      <ApiLogsDetailModal
        isOpen={isModalOpen && modalMode === "detail"}
        onClose={closeModal}
        mode="detail"
        config={currentItem ?? undefined}
      />
      {children}
    </>
  );
};
