export interface IGetTotalLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadsPropertyFloorsParams {
  id?: string;
  from?: string;
  to?: string;
  lead_property_id?: string;
  floor_type?: string;
  floor_name?: string;
}
