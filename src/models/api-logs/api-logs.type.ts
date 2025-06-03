export interface IApiLogsGetApi {
  id: string;
  name_log: string;
  input: string | null;
  output: string;
  create_date: string;
}

export interface IApiLogsResponseApi {
  statusCode: number;
  data: {
    message: string;
  };
}


