
export interface ILeadsourcesGetApi {
  source_id?: string;
  source_name: string | null;
  description: string | null;
}
export interface ILeadsourcesResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}

export interface ILeadsourcesPatchApi {
  source_id?: string;
  source_name: string | null;
  description: string | null;
}

export interface ILeadsourcesPostApi {
  source_name?: string;
  description: string | null;
  
}
