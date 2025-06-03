import { ILeadsourcesPatchApi } from "../../../models";

export interface IPatchLeadsourcesResponse {
  data: ILeadsourcesPatchApi[];
}

export interface IPatchLeadsourcesError {
  message: string;
  statusCode: number;
  error: string;
}
