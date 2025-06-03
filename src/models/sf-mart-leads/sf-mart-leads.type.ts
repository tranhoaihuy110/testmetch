export interface ISfMartLeadsGetApi {
  id?: string;
  username: string;
  salesforce_id: string;
  data_type: string;
  salesforce_lead_id: string;
  json_data_lv1: Record<string, any> | null,
  json_data_lv2: Record<string, any> | null,
  created_at: string;
  json_data_lv3: Record<string, any> | null,
}

export interface ISfMartLeadsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ISfMartLeadsPatchApi {
  id: string;
  username: string;
  salesforce_id: string;
  data_type: string;
  salesforce_lead_id: string;
  json_data_lv1: Record<string, any> | null,
  json_data_lv2: Record<string, any> | null,
  json_data_lv3: Record<string, any> | null,
}

export interface ISfMartLeadsPostApi {
  id: string;
  username: string;
  salesforce_id: string;
  data_type: string;
  salesforce_lead_id: string;
  json_data_lv1: Record<string, any> | null,
  json_data_lv2: Record<string, any> | null,
  json_data_lv3: Record<string, any> | null,
}
