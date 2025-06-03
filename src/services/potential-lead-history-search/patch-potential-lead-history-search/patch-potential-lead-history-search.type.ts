import { IPotentialLeadHistorySearchPatchApi } from "../../../models";

export interface IPatchPotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchPatchApi[];
}

export interface IPatchPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}
