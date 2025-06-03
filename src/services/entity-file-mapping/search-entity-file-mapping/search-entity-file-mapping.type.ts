import { IEntityFileMappingGetApi } from "../../../models";

export interface ISearchEntityFileMappingResponse {
  data: IEntityFileMappingGetApi[];
}

export interface ISearchEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchEntityFileMappingParams {
  id?: string;
  from?: string;
  to?: string;
  entity_id?: string;
  entity_type?: string ;
  file_name?: string;
  mapping_key?:string;
  page?: number;
  size?: number;
}
