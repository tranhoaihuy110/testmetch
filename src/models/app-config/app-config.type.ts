export interface IAppConfigGetApi {
  key: string;
  value: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface IAppConfigResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface IAppConfigPatchApi {
  key: string;
  value: string;
  description: string | null;
}

export interface IAppConfigPostApi {
  key: string;
  value: string;
  description: string | null;
}
