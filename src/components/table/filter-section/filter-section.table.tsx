import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AddButton } from "../add-button/add-button.table";
import { IFilterSectionProps } from "./index";

export const FilterSection: React.FC<IFilterSectionProps> = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeFilter,
  handleTimeFilter,
  searchIdTerm,
  setSearchIdTerm,
  searchNameTerm,
  setSearchNameTerm,
  searchPhoneTerm,
  setSearchPhoneTerm,
  searchUsernameTerm,
  setSearchUsernameTerm,
  handleClearSearchId,
  handleClearSearchName,
  handleClearSearchPhone,
  handleClearSearchUsername,
  handleSearch,
  handleReset,
  openAddModal,
  hideNameSearch = false,
  firstSearchLabel = "Search by ID",
  idSearchType = "number",
  hideAddButton = false,
  hidePhoneEmail = false,
  secondSearchLabel = "Search by Email",
  fourthSearchLabel = "Search by Phone Number",
  thirdSearchLabel = "Search by UserName",
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex-1 flex flex-col sm:flex-row items-center gap-3 w-full">
        <div
          className={`flex-1 w-full ${
            timeFilter === "custom"
              ? "flex flex-col gap-2"
              : "flex flex-wrap items-center gap-2"
          }`}
        >
          <div className="flex flex-wrap items-center gap-2">
            <DatePicker
              selected={startDate}
              onChange={setStartDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select start date and time"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              showTimeSelect
              timeFormat="HH:mm:ss"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
            />
            <span className="text-gray-500 dark:text-gray-400">→</span>
            <DatePicker
              selected={endDate}
              onChange={setEndDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || undefined}
              placeholderText="Select end date and time"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              showTimeSelect
              timeFormat="HH:mm:ss"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm:ss"
            />
            <button
              onClick={() => handleTimeFilter("today")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "today"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Today
            </button>
            <button
              onClick={() => handleTimeFilter("yesterday")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "yesterday"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Yesterday
            </button>
            <button
              onClick={() => handleTimeFilter("last7days")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "last7days"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Last 7 days
            </button>
            <button
              onClick={() => handleTimeFilter("thisweek")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "thisweek"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              This week
            </button>
            <button
              onClick={() => handleTimeFilter("last30days")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "last30days"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Last 30 days
            </button>
            <button
              onClick={() => handleTimeFilter("thismonth")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "thismonth"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              This month
            </button>
            <button
              onClick={() => handleTimeFilter("lastmonth")}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                timeFilter === "lastmonth"
                  ? "bg-teal-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              Last month
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type={idSearchType}
                placeholder={firstSearchLabel}
                value={searchIdTerm}
                onChange={(e) => setSearchIdTerm(e.target.value)}
                className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-50"
              />
              {searchIdTerm && (
                <button
                  onClick={handleClearSearchId}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ×
                </button>
              )}
            </div>
            {!hidePhoneEmail && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={thirdSearchLabel}
                  value={searchUsernameTerm}
                  onChange={(e) => setSearchUsernameTerm(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-50"
                />
                {searchUsernameTerm && (
                  <button
                    onClick={handleClearSearchUsername}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            {!hidePhoneEmail && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={fourthSearchLabel}
                  value={searchPhoneTerm || ""}
                  onChange={(e) => setSearchPhoneTerm(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-50"
                />
                {searchPhoneTerm && (
                  <button
                    onClick={handleClearSearchPhone}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            {!hideNameSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={secondSearchLabel}
                  value={searchNameTerm || ""}
                  onChange={(e) => setSearchNameTerm(e.target.value)}
                  className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white sm:w-50"
                />
                {searchNameTerm && (
                  <button
                    onClick={handleClearSearchName}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ×
                  </button>
                )}
              </div>
            )}
            <button
              onClick={handleSearch}
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-500 text-white hover:bg-blue-600"
            >
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-md text-sm font-medium bg-yellow-500 text-white hover:bg-yellow-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {openAddModal && !hideAddButton && <AddButton onClick={openAddModal} />}
    </div>
  );
};