import axios from "axios";

import Logger from "./logger";

import { IHttpClient, IHttpClientResp } from "../src/types";

const httpClient = async ({
  endPoint = "",
  method = "get",
  body = {},
  headers,
}: IHttpClient) => {
  const payload = {
    url: endPoint,
    method: method,
    headers: headers || {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    ...(body && { data: body }),
  };

  try {
    const response: IHttpClientResp = await axios(payload);

    return {
      success: true,
      message: response.statusText,
      ...response,
    };
  } catch (err) {
    Logger.info(
      `httpClient | endPoint - ${endPoint} | Error Message - ${err.message}`
    );

    const errResponse: IHttpClientResp = err;

    return {
      success: false,
      ...errResponse,
    };
  }
};

export default httpClient;
