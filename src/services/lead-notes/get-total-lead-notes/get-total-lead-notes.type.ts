
export interface IGetTotalLeadNotesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface IGetTotalLeadNotesParams {
  note_id?: string | null;
  lead_id?: string | null;
  from?: string; 
  to?: string; 
}