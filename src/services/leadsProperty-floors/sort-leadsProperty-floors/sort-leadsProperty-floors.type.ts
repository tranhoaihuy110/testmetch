import { ILeadPropertyFloorsGetApi } from "../../../models";

export interface ISortLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsGetApi[];
}

export interface ISortLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISortLeadsPropertyFloorsParams {
  option: string;
  ascDesc: string;
  page?: number;
  size?: number;
}
