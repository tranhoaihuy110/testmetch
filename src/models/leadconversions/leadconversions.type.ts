export interface ILeadConversionsGetApi {
  conversion_id: string;
  lead_id: string;
  conversion_date: string;
  conversion_value: string;
  converted_to: string;
}

export interface ILeadConversionsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadConversionsPatchApi {
  conversion_id: string;
  lead_id: string;
  conversion_date: string;
  conversion_value: string;
  converted_to: string;
}

export interface ILeadConversionsPostApi {
  lead_id: string;
  conversion_date: string;
  conversion_value: string;
  converted_to: string;
}
