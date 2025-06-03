import { IPotentialLeadHistorySearchPostApi } from "../../../models";

export interface IPostPotentialLeadHistorySearchResponse {
  data: IPotentialLeadHistorySearchPostApi[];
}

export interface IPostPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}
