import { IPropertyOwnerShipGetApi } from "../../../models";

export interface ISearchPropertyOwnerShipResponse {
  data: IPropertyOwnerShipGetApi[];
}

export interface ISearchPropertyOwnerShipError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchPropertyOwnerShipParams {
  // end_date_from?: string;
  // end_date_to?: string;
  page?: number;
  size?: number;
  ownership_id?: string;
  property_id?: string;
  owner_id?: string;
  from?: string;
  to?: string;
}
