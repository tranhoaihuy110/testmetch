import { ICommonBranchPostcodeGetApi } from "../../../models";

export interface ISearchCommonBranchPostcodeResponse {
  data: ICommonBranchPostcodeGetApi[];
}

export interface ISearchCommonBranchPostcodeError {
  message: string;
  statusCode: number;
  error: string;
}


export interface ISearchCommonBranchPostcodeParams {
 from?: string ,
  to?: string ,
  page? : number,
  size?: number ,
  id?: string , 
  user_name?: string ,
}