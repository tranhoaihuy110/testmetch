export interface IGetTotalLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsourcesParams {
  source_id?: string;
  source_name?: string;
  description?: string;
}
