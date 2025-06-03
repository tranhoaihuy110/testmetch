
export interface IGetTotalLeadAssignmentError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadAssignmentParams {
  assignment_id?: string | null;
  lead_id?: string | null;
  email?: string | null;
  assigned_to_id?: string | null;
  assigned_to?: string | null;
  status?: string | null;
  from?: string; 
  to?: string; 
}