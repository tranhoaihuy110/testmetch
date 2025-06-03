export interface ICommonBranchPostcodeGetApi {
  id?: string;
  user_name: string;
  branch: string;
  postcodes: string;
  created_at?: string;
}

export interface ICommonBranchPostcodeResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ICommonBranchPostcodePatchApi {
  id: string;
  user_name: string;
  branch: string;
  postcodes: string | null;
}

export interface ICommonBranchPostcodePostApi {
  id?: string;
  user_name: string;
  branch: string;
  postcodes: string | null;
}