import { IEntityFileMappingGetApi } from "../../../models";

export interface ISortEntityFileMappingResponse {
  data: IEntityFileMappingGetApi[];
}

export interface ISortEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}
export interface ISortEntityFileMappingParams {
  option: string;
  ascDesc: string; 
  page?: number; 
  size?: number; 
}