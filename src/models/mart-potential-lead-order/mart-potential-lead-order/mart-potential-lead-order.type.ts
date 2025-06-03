export interface IMartPotentialLeadOrderGetApi {
      potential_lead_order_id: string,
      full_address: string,
      postal_code: string,
      created_at: string,
      updated_at: string,
      username_order: string ,
      order_status: string,
}

export interface IMartPotentialLeadOrderResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IMartPotentialLeadOrderPatchApi {
  potential_lead_order_id : string,
  full_address: string,
  postal_code: string,
  username_order: string,
  order_status: string
}

export interface IMartPotentialLeadOrderPostApi {
  potential_lead_order_id: string,
  full_address: string,
  postal_code: string,
  username_order: string,
  order_status: string
}