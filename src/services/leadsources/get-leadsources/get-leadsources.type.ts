import { ILeadsourcesGetApi } from "../../../models";

export interface IGetLeadsourcesResponse {
  data: ILeadsourcesGetApi[];
}

export interface IGetLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetLeadsourcesParams {    
  page: number;
  size: number;
  source_id?: string
}