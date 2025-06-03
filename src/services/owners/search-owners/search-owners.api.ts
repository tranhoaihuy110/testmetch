import { IOwnersGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchOwnersParams } from "./index";

export const searchOwnersApi = (params: ISearchOwnersParams) => {
  return new Promise<IOwnersGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IOwnersGetApi[] }>("/api/v1/owners/list", {
      params: {
        owner_id: params.owner_id,
        email: params.email,
        created_at_from: params.from,
        created_at_to: params.to,
        phone_number: params.phone_number,
        last_name: params.last_name,
        first_name: params.first_name,
        address: params.address,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
