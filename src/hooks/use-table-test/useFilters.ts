/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { FilterConfig } from "./index";

export const useFilters = (filterConfig: FilterConfig[] = []) => {
  const [filters, setFilters] = useState<
    Record<string, string | number | null>
  >(filterConfig.reduce((acc, config) => ({ ...acc, [config.key]: null }), {}));
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [timeFilter, setTimeFilter] = useState<
    | "today"
    | "yesterday"
    | "last7days"
    | "thisweek"
    | "last30days"
    | "thismonth"
    | "lastmonth"
    | "custom"
    | null
  >(null);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const setFilter = (key: string, value: string | number | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: null }));
  };

  const handleTimeFilter = (
    filter:
      | "today"
      | "yesterday"
      | "last7days"
      | "thisweek"
      | "last30days"
      | "thismonth"
      | "lastmonth"
      | "custom"
  ) => {
    setTimeFilter(filter);
    if (filter !== "custom") {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date) {
      setTimeFilter("custom");
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
    if (date) {
      setTimeFilter("custom");
    }
  };

  const handleReset = () => {
    setFilters(
      filterConfig.reduce((acc, config) => ({ ...acc, [config.key]: null }), {})
    );
    setStartDate(null);
    setEndDate(null);
    setTimeFilter(null);
    setIsFilterActive(false);
  };

  return {
    filters,
    setFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    timeFilter,
    setTimeFilter,
    isFilterActive,
    setIsFilterActive,
    handleTimeFilter,
    handleStartDateChange,
    handleEndDateChange,
    handleClearFilter,
    handleReset,
  };
};
