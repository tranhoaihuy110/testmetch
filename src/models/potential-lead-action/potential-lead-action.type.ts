/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPotentialLeadActionGetApi {
  id?: string;
  potential_lead_id: string;
  last_name: string;
  list_potential_lead_id: string;
  action_username: string;
  action_username_id: string;
  json_data: Record<string, any> | null;
  action_type: string;
  create_at: string;
}
export interface IPotentialLeadActionResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IPotentialLeadActionPatchApi {
  id?: string;
  potential_lead_id: string;
  list_potential_lead_id: string;
  action_username: string;
  action_username_id: string;
  json_data: Record<string, any> | null;
  action_type: string;
}

export interface IPotentialLeadActionPostApi {
  potential_lead_id: string;
  list_potential_lead_id: string;
  action_username: string;
  action_username_id: string;
  json_data: Record<string, any> | null;
  action_type: string;
}
