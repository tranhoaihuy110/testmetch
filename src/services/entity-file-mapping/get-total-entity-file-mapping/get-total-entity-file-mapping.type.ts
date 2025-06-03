
export interface IGetTotalEntityFileMappingError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalEntityFileMappingParams {
  id?: string;
  from?: string;
  to?: string;
  entity_id?: string | null;
  entity_type?: string | null;
  mapping_key?:string;
}