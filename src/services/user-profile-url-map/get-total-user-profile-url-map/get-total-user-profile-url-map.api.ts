import { MS_API } from "../../api";
import { IGetTotalUserProfileUrlMapParams } from "./index";
interface GetTotalUserProfileUrlMapResponse {
  data: { total: number }[];
}
export const getTotalUserProfileUrlMapApi = async (
  params: IGetTotalUserProfileUrlMapParams
) => {
  const token = localStorage.getItem("access_token");

  const res = await MS_API.get<GetTotalUserProfileUrlMapResponse>(
    "/api/v1/user-profile-url-map/total",
    {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        id: params.id,
        email: params.email,
      },
    }
  );
  return res.data.data[0].total || 0;
};
