import { IPotentialLeadHistorySearchGetApi } from "../../../models";

export interface ISearchPotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchGetApi[];
}

export interface ISearchPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISearchPotentialLeadHistorySearchParams {
  to?: string;
  from?: string;
  page?: number;
  size?: number;
  id?: string;
  username?: string;
  keysearch?: string;
  status_search?: string;
}
