export interface IGetTotalPotentialLeadHistorySearchError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalPotentialLeadHistorySearchParams {
  id?: string;
  from?: string;
  to?: string;
  username?: string;
  keysearch?: string;
  status_search?: string;
}
