export interface ILeadAssignmentGetApi {
  assignment_id?: string;
  lead_id: string;
  email?: string;
  assigned_to_id: string;
  assigned_to: string;
  assigned_date?: string;
}

export interface ILeadAssignmentResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadAssignmentPatchApi {
  assignment_id: string;
  lead_id: string;
  email?: string;
  assigned_to_id?: string;
  assigned_to?: string;
  assigned_date?: string;
}

export interface ILeadAssignmentPostApi {
  lead_id: string;
  assigned_to_id: string;
  assigned_to: string;
  email?: string;
  assigned_date?: string;
  assignment_id?: string;
}
