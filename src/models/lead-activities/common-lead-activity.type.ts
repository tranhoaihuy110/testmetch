
export interface ILeadActivityGetApi {
  activity_id: string;
  lead_id: string;
  email: string;
  activity_type: string;
  activity_date: string;
  description: string;
  status: string;
}

export interface ILeadActivityResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadActivityPatchApi {
  activity_id: string;
  lead_id: string;
  email: string;
  activity_type: string;
  activity_date: string;
  description: string;
  status: string;
}

export interface ILeadActivityPostApi {
  activity_id: string;
  lead_id: string;
  email: string;
  activity_type: string;
  activity_date: string;
  description: string;
  status: string;
}