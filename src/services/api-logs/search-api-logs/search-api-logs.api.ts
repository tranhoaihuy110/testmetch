
import { IApiLogsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchApiLogsParams } from "./index";

export const searchApiLogs = (params: ISearchApiLogsParams) => {
  return new Promise<IApiLogsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IApiLogsGetApi[] }>("/api/v1/api-log/list", {  
      params: {
        id: params.id,
        name_log: params.name_log,
        create_date_from: params.from,
        create_date_to: params.to,
        page: params.page,
        size: params.size
      },  
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};