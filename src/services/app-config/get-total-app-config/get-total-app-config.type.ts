
export interface IGetTotalAppConfigError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalAppConfigParams {
  key?: string | null; 
  from?: string; 
  to?: string; 
}