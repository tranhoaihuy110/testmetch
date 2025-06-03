import { ILeadAssignmentGetApi } from "../../../models";
import { MS_API } from "../../api";
import { ISearchLeadAssignmentParams } from "./index";

export const searchLeadAssignmentApi = (
  params: ISearchLeadAssignmentParams
) => {
  return new Promise<ILeadAssignmentGetApi[]>((resolve, reject) => {
    MS_API.get<{ data: ILeadAssignmentGetApi[] }>(
      "/api/v1/leadassignments/list",
      {
        params: {
          assigned_to_id: params.assigned_to_id,
          assigned_to: params.assigned_to,
          lead_id: params.lead_id,
          email: params.email,
          assignment_id: params.assignment_id,
          assigned_date_from: params.from,
          assigned_date_to: params.to,
          page: params.page,
          size: params.size,
        },
      }
    )
      .then((res) => resolve(res.data.data))
      .catch(() => reject());
  });
};
