import { IAppUserGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchAppUserParams } from "./index";

export const searchAppUserApi = (params: ISearchAppUserParams) => {
  return new Promise<IAppUserGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IAppUserGetApi[] }>("/api/v1/app-user/list", {
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        page: params.page,
        size: params.size,
        user_id: params.user_id,
        user_email: params.user_email,
        user_status: params.user_status,
        username: params.username,
        user_fullname: params.user_fullname,
        phone_number: params.phone_number,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
