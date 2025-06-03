export interface IGetTotalPropertyOwnerShipError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalPropertyOwnerShipParams {
  ownership_id?: string;
  from?: string
  to?: string
  owner_id?:string
  property_id?:string
}
