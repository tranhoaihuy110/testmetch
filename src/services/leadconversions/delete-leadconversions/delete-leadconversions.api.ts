import axios, { AxiosError } from "axios";
import {
  IDeleteLeadConversionsError,
  IDeleteLeadConversionsResponse,
} from "./delete-leadconversions.type";

export const deleteLeadConversionsApi = async (
  leadconversions_id: string
): Promise<IDeleteLeadConversionsResponse> => {
  try {
    const token = localStorage.getItem("access_token");
    if (!token) {
      throw new Error("No access token found");
    }
    const response = await axios.delete(
      `/leadconversions/v1/delete/${leadconversions_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data as IDeleteLeadConversionsResponse;
  } catch (error) {
    const err = error as AxiosError<IDeleteLeadConversionsError>;
    if (err.response?.data) {
      throw err.response.data;
    }
    throw {
      message: "Failed to delete",
      statusCode: err.response?.status || 0,
      error: err.message || "Network Error",
    } as IDeleteLeadConversionsError;
  }
};
