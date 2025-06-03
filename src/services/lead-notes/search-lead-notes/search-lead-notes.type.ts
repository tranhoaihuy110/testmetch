import { ILeadNotesGetApi } from "../../../models";

export interface ISearchLeadNotesResponse {
  data: ILeadNotesGetApi[];
}

export interface ISearchLeadNotesError {
  message: string;
  statusCode: number;
  error: string;
}

export interface ISearchLeadNotesParams {
  from?: string;
  to?: string;
  page?: number;
  size?: number;
  lead_id?: string;
  note_id?: string;
  note_text?: string;
}
