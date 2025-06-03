/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPotentialLeadHistorySearchGetApi {
  id?: string;
  username: string;
  keysearch: string;
  status_search: string;
  json_data: Record<string, any> | null;
  create_at: string;
}

export interface IPotentialLeadHistorySearchResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPotentialLeadHistorySearchPatchApi {
  id: string;
  username: string;
  keysearch: string;
  json_data: Record<string, any> | null;
  status_search: string;
}

export interface IPotentialLeadHistorySearchPostApi {
  username: string;
  keysearch: string;
  json_data: Record<string, any> | null;
  status_search: string;
}
