import { IRentalsGetApi } from "../../../models";

export interface ISearchRentalsResponse {
  data: IRentalsGetApi[];
}

export interface ISearchRentalsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchRentalsParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  rental_id?: string;
  tenant_name?: string;
  property_id?: string;
}
