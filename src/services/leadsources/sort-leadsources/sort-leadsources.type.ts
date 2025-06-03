import { ILeadsourcesGetApi } from "../../../models";

export interface ISortLeadsourcesResponse {
  data: ILeadsourcesGetApi[];
}

export interface ISortLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsourcesParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
