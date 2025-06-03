import { IRentalsGetApi } from "../../../models";
import { MS_API } from "../../api";

export const getRentalsApi = (params?: Record<string, any>) => {
  return new Promise<{ data: IRentalsGetApi[] }>((resolve, reject) => {
    MS_API.get<{ data: IRentalsGetApi[] }>("/api/v1/rentals/list", { params })
      .then((res) => resolve(res.data))
      .catch(() => reject());
  });
};
