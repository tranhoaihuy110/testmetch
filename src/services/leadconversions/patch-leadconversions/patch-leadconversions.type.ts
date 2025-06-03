import { ILeadConversionsPatchApi } from "../../../models";

export interface IPatchLeadConversionsResponse {
  data: ILeadConversionsPatchApi[];
}

export interface IPatchLeadConversionsError {
  message: string;
  statusCode: number;
  error: string;
}
