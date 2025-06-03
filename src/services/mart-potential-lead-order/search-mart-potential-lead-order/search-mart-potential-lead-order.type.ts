import { IMartPotentialLeadOrderGetApi } from "../../../models";

export interface ISearchMartPotentialLeadOrderResponse {
  data: IMartPotentialLeadOrderGetApi[];
}

export interface ISearchMartPotentialLeadOrderError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchMartPotentialLeadOrderParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  potential_lead_order_id?: string;
  full_address?: string;
  postal_code?:string;
  username_order?: string;
  order_status?: string;
  updated_at_from?: string;
  updated_at_to?: string;
}