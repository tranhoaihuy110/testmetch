import { IPotentialLeadActionGetApi } from "../../../models";

export interface ISearchPotentialLeadActionResponse {
  data: IPotentialLeadActionGetApi[];
}

export interface ISearchPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchPotentialLeadActionParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  id?: string;
  potential_lead_id?: string;
  list_potential_lead_id?: string;
  last_name?: string;
  action_username?: string;
  action_type?: string;
  action_username_id?: string;
}
