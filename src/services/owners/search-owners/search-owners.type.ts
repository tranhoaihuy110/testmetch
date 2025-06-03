import { IOwnersGetApi } from "../../../models";

export interface ISearchOwnersResponse {
  data: IOwnersGetApi[];
}

export interface ISearchOwnersError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchOwnersParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  owner_id?: string;
  email?: string;
  phone_number?: string;
  last_name?: string;
  first_name?: string;
  address?: string;
}