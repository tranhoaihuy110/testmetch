import { IUserProfileUrlMapGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchUserProfileUrlMapParams } from "./index";

export const searchUserProfileUrlMapApi = (
  params: ISearchUserProfileUrlMapParams
) => {
  return new Promise<IUserProfileUrlMapGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IUserProfileUrlMapGetApi[] }>(
      "/api/v1/user-profile-url-map/list",
      {
        params: {
          id: params.id,
          email: params.email,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
