import { IRentalsGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchRentalsParams } from "./index";

export const searchRentalsApi = (params: ISearchRentalsParams) => {
  return new Promise<IRentalsGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IRentalsGetApi[] }>("/api/v1/rentals/list", {
      params: {
        rental_id: params.rental_id,
        tenant_name: params.tenant_name,
        created_at_from: params.from,
        created_at_to: params.to,
        property_id: params.property_id,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
