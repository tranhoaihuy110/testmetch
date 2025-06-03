
export interface IGetTotalCommonMetadataFinalError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalCommonMetadataFinalParams {
  id?: string | null; 
  from?: string; 
  to?: string;
  meta_key?:string;
}