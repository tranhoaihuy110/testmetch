export interface ILeadsReferPartnerActivityGetApi {
  id?: string;
  refer_partner_id: string;
  json_metadata: Record<string, any>;
  user_action: string;
  note: string;
  status_old: string;
  status_new: string;
  created_at: string;
  updated_at: string;
}

export interface ILeadsReferPartnerActivityResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsReferPartnerActivityPatchApi {
  id?: string;
  refer_partner_id: string;
  user_action: string;
  note: string;
  status_old: string;
  status_new: string;
}

export interface ILeadsReferPartnerActivityPostApi {
  refer_partner_id: string;
  user_action: string;
  note: string;
  status_old: string;
  status_new: string;
}
