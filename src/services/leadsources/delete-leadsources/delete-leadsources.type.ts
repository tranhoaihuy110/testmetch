import { ILeadsourcesResponseApi } from "../../../models";

export interface IDeleteLeadsourcesResponse {
  data: ILeadsourcesResponseApi[];
}

export interface IDeleteLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}
