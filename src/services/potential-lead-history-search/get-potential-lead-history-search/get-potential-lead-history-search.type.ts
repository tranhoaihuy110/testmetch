import { IPotentialLeadHistorySearchGetApi } from "../../../models";

export interface IGetPotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchGetApi[];
}

export interface IGetPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetPotentialLeadHistorySearchParams {
  page: number;
  size: number;
  id?: string;
}
