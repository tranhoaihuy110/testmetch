export interface IGetTotalMetaDataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalMetaDataParams {
  data_type: string;
  id?: string;
  name?: string;
  search_name_service?: string;
  search_name_category?: string;
  from?: string;
  to?: string;
}
