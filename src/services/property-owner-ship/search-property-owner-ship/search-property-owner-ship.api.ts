import { IPropertyOwnerShipGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPropertyOwnerShipParams } from "./index";

export const searchPropertyOwnerShipApi = (
  params: ISearchPropertyOwnerShipParams
) => {
  return new Promise<IPropertyOwnerShipGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IPropertyOwnerShipGetApi[] }>(
      "/api/v1/property-owner-ship/list",
      {
        params: {
          ownership_id: params.ownership_id,
          property_id: params.property_id,
          owner_id: params.owner_id,
          start_date_from: params.from,
          start_date_to: params.to,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
