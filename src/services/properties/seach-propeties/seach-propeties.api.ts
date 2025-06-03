import { IPropertiesGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchPropertiesParams } from "./index";

export const searchPropertiesApi = (params: ISearchPropertiesParams) => {
  return new Promise<IPropertiesGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: IPropertiesGetApi[] }>("/api/v1/properties/list", {
      params: {
        created_at_from: params.from,
        created_at_to: params.to,
        property_id: params.property_id,
        property_name: params.property_name,
        property_type: params.property_type,
        description: params.description,
        full_address: params.full_address,
        city: params.city,
        state: params.state,
        postal_code: params.postal_code,
        country: params.country,
        longtitude: params.longtitude,
        latitude: params.latitude,
        created_by: params.created_by,
        page: params.page,
        size: params.size,
      },
    })
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
