import { ICommonMetadataFinalGetApi } from "../../../models";

export interface ISortCommonMetadataFinalResponse {
  data: ICommonMetadataFinalGetApi[];
}

export interface ISortCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortCommonMetadataFinalParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}