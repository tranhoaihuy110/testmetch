import { IPropertiesPostApi } from "../../../models";

export interface IPostPropertiesResponse {
  data: IPropertiesPostApi[];
}

export interface IPostPropertiesError {
  message: string;
  statusCode: number;
  error: string;
}
