import { ILeadsourcesGetApi } from "../../../models";

export interface ISearchLeadsourcesResponse {
  data: ILeadsourcesGetApi[];
}

export interface ISearchLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchLeadsourcesParams {
  page?: number;
  size?: number;
  source_id?: string;
  source_name?: string;
  description?:string
}