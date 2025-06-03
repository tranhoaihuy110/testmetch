import { IMartPotentialLeadGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getMartPotentialLeadApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IMartPotentialLeadGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IMartPotentialLeadGetApi[] }>("/api/v1/mart-potential-lead/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
