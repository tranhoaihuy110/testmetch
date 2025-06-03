
export interface ILeadsGetApi {
  lead_id?: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  company_name: string | null;
  job_title: string | null;
  lead_source: string | null;
  lead_stage: string | null;
  lead_status: string | null;
  created_at: string;
  updated_at: string;
  json_moredata: Record<string, any>;
  salesforce_lead_id: string | null;
}
export interface ILeadsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsPatchApi {
    lead_id?: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  company_name: string | null;
  job_title: string | null;
  lead_source: string | null;
  lead_stage: string | null;
  lead_status: string | null;
  created_at: string;
  updated_at: string;
  json_moredata: Record<string, any>;
  salesforce_lead_id: string | null
}

export interface ILeadsPostApi {
     lead_id?: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  company_name: string | null;
  job_title: string | null;
  lead_source: string | null;
  lead_stage: string | null;
  lead_status: string | null;
  created_at: string;
  updated_at: string;
  json_moredata: Record<string, any>;
  salesforce_lead_id: string | null
}
