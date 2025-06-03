
export interface IGetTotalCommonMetadataError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalCommonMetadataParams {
  id?: string | null; 
  from?: string; 
  to?: string;
  meta_key?:string 
}