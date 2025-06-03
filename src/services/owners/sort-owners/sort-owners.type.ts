import { IOwnersGetApi } from "../../../models";

export interface ISortOwnersResponse {
  data: IOwnersGetApi[];
}

export interface ISortOwnersError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortOwnersParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
