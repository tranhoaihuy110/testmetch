import { ILeadPropertyFloorsResponseApi } from "../../../models";

export interface IDeleteLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsResponseApi[];
}

export interface IDeleteLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}
