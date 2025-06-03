import { ILeadPropertyFloorsPatchApi } from "../../../models";

export interface IPatchLeadsPropertyFloorsResponse {
  data: ILeadPropertyFloorsPatchApi[];
}

export interface IPatchLeadsPropertyFloorsError {
  message: string;
  statusCode: number;
  error: string;
}
