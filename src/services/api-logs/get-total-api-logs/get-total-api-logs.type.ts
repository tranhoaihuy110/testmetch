
export interface IGetTotalApiLogsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalApiLogsParams {
  id?: string | null; 
  from?: string; 
  to?: string;
  name_log?:string 
}