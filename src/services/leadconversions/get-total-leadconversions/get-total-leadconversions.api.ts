import axios, { AxiosError } from "axios";
import {
  IGetTotalLeadConversionsError,
  IGetTotalLeadConversionsParams,
} from "./get-total-leadconversions.type";

export const getTotalLeadConversionsApi = async (
  params: IGetTotalLeadConversionsParams
): Promise<number> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }

    const response = await axios.get("/leadconversions/v1/total", {
      params: {
        conversion_id: params.conversion_id,
        created_at_from: params.from,
        created_at_to: params.to,
        lead_id: params.lead_id,
        converted_to: params.converted_to,
        conversion_value: params.conversion_value,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const total = response.data.data[0].total || 0;
    return total;
  } catch (error) {
    const err = error as AxiosError<IGetTotalLeadConversionsError>;

    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to fetch total items",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as IGetTotalLeadConversionsError;
  }
};
