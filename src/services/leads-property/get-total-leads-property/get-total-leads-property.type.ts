
export interface IGetTotalLeadsPropertyError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsPropertyParams {
  lead_property_id?: string; 
  from?: string; 
  to?: string;
  email?:string;
}