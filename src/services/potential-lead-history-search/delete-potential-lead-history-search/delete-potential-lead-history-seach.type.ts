import { IPotentialLeadHistorySearchResponseApi } from "../../../models";

export interface IDeletePotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchResponseApi[];
}

export interface IDeletePotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}
