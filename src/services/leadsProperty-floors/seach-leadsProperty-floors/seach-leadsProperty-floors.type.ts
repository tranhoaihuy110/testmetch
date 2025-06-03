import { ILeadPropertyFloorsGetApi } from "../../../models";

export interface ISearchLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsGetApi[];
}

export interface ISearchLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchLeadsPropertyFloorsParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  id?: string;
  lead_property_id?: string;
  floor_type?: string;
  floor_name?: string;
}
