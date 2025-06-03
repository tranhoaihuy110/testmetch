import { ICommonMetadataGetApi } from "../../../models";

export interface ISortCommonMetadataResponse {
  data: ICommonMetadataGetApi[];
}

export interface ISortCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortCommonMetadataParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}