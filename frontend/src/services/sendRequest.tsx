import axios, { Method } from "axios";

async function sendRequest<T>(
  path: string,
  method: Method = "GET",
  token: string,
  data: any = null
): Promise<T> {
  const url = "http://localhost:8000/" + path
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const response = await axios({
      url,
      method,
      headers,
      data,
    });
    
    return response.data;
  } catch (error: any) {
    console.error("Request failed:", error.message);
    if (error.response) {
      console.error("Error details:", error.response.data);
    }
    throw new Error(error.response?.data?.message || "An unexpected error occurred");
  }
}

export default sendRequest;
