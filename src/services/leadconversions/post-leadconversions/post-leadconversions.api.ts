import axios, { AxiosError } from "axios";
import {
  IPostLeadConversionsError,
  IPostLeadConversionsResponse,
} from "./post-leadconversions.type";
import { ILeadConversionsPostApi } from "../../../models";

export const postLeadConversionsApi = async (
  leadconversions_id: Partial<ILeadConversionsPostApi>
): Promise<IPostLeadConversionsResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.post(
      `/leadconversions/v1/insert`,
      leadconversions_id,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data as IPostLeadConversionsResponse;
  } catch (error) {
    const err = error as AxiosError<IPostLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to add leadconversions_id",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as IPostLeadConversionsError;
  }
};
