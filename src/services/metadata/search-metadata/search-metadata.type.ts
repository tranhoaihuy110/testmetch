import { IMetaDataApi } from "../../../models";

export interface ISearchMetaDataResponse {
  data: IMetaDataApi[];
}

export interface ISearchMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchMetaDataParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  data_type: string;
  id?: string;
  name?: string;
  category_name?: string;
  service_name?: string;
}
