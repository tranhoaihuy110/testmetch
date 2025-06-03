export interface IGetTotalPotentialLeadActionError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalPotentialLeadActionParams {
  id?: string;
  potential_lead_id?: string;
  list_potential_lead_id?: string;
  action_username?: string;
  action_username_id?: string;
  action_type?: string;
  from?: string;
  to?: string;
}
