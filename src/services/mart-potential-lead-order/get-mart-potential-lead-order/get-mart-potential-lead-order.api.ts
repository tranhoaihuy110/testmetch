import { IMartPotentialLeadOrderGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getMartPotentialLeadOrderApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IMartPotentialLeadOrderGetApi[] }>(
    (resolve, reject) => {
      MS_API.get<{ data: IMartPotentialLeadOrderGetApi[] }>(
        "/api/v1/mart-potential-lead-order/list",
        { params }
      )
        .then((res) => resolve(res.data))
        .catch(() => reject());
    }
  );
};
