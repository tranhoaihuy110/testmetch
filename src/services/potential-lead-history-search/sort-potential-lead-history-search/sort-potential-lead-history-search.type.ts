import { IPotentialLeadHistorySearchGetApi } from "../../../models";

export interface ISortPotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchGetApi[];
}

export interface ISortPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortPotentialLeadHistorySearchParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
