export interface IFilterSectionProps {
  startDate: Date | null;
  setStartDate: (date: Date | null) => void;
  endDate: Date | null;
  setEndDate: (date: Date | null) => void;
  timeFilter:
    | "today"
    | "yesterday"
    | "last7days"
    | "thisweek"
    | "last30days"
    | "thismonth"
    | "lastmonth"
    | "custom"
    | null;
  handleTimeFilter: (
    filter:
      | "today"
      | "yesterday"
      | "last7days"
      | "thisweek"
      | "last30days"
      | "thismonth"
      | "lastmonth"
      | "custom"
  ) => void;
  searchIdTerm?: string;
  setSearchIdTerm?: (term: string) => void;
  searchUsernameTerm?: string;
  setSearchUsernameTerm?: (term: string) => void;
  handleClearSearchPhone?: () => void;
  handleClearSearchUsername?: () => void;
  searchPhoneTerm?: string;
  setSearchPhoneTerm?: (term: string) => void;
  searchNameTerm?: string;
  setSearchNameTerm?: (term: string) => void;
  handleClearSearchId?: () => void;
  handleClearSearchName?: () => void;
  handleSearch?: () => void;
  handleReset?: () => void;
  openAddModal?: () => void;
  hideNameSearch?: boolean;
  firstSearchLabel?: string;
  idSearchType?: string;
  hideAddButton?: boolean;
  hidePhoneEmail ?:boolean,
  secondSearchLabel?:string,
  thirdSearchLabel?:string;
  fourthSearchLabel?:string;
}