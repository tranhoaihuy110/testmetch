export interface ILeadNotesGetApi {
  note_id: string;
  lead_id: string;
  note_text: string;
  created_at: string;
}

export interface ILeadNotesResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadNotesPatchApi {
  note_id: string;
  lead_id: string;
  note_text: string;
}

export interface ILeadNotesPostApi {
  lead_id: string;
  note_text: string;
}