import { IAppUserPendingGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchAppUserPendingParams } from "./index";

export const searchAppUserPendingApi = (params: ISearchAppUserPendingParams) => {
  return new Promise<IAppUserPendingGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IAppUserPendingGetApi[] }>("/api/v1/app-user-pending/list", {  
      params: {
        user_id: params.user_id,
        username: params.username,
        created_at_from: params.from,
        created_at_to: params.to,
        phone_number: params.phone_number,
        verify_status: params.verify_status,
        page: params.page,
        size: params.size
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};

