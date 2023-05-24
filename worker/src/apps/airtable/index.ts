import { each, get, isEmpty, startCase } from "lodash";
import qs from "querystring";

import { IEventData } from "../../types";
import { httpClient } from "../../../utils";

const pg = global?.pg;
const { AIRTABLE_CLIENT_ID, AIRTABLE_CLIENT_SECRET_ID } = process.env;

const clientId = AIRTABLE_CLIENT_ID;
const clientSecret = AIRTABLE_CLIENT_SECRET_ID;
const encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString(
  "base64"
);
const authorizationHeader = `Basic ${encodedCredentials}`;

interface IAirtableData extends IEventData {
  userId: string;
  actionSlug: string;
  connId: string;
  apiKeys: {
    accessToken: string;
    refreshToken: string;
  };
  taskData: {
    slug: string;
    template: {
      tableId: string;
      tables: object[];
    };
    [key: string]: any;
  };
  app: {
    slug: string;
    name: string;
    id: string;
    status: string;
    appConfig: {
      baseUrl: string;
      [key: string]: any;
    };
  };
}

const addRecord = async ({
  accessToken,
  formValues,
  table,
  baseUrl = "https://api.airtable.com/v0",
}: any) => {
  const fields = {};
  each(formValues, (value, key) => (fields[startCase(key)] = value));

  const addRecordInTable = await httpClient({
    endPoint: `${baseUrl}/${table.baseId}/${table.value}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: {
      records: [{ fields }],
    },
  });

  return addRecordInTable;
};

const createFields = async ({
  accessToken,
  formValues,
  table,
  baseUrl = "https://api.airtable.com/v0",
}) => {
  const response = await Promise.all(
    Object.keys(formValues).map(async (key) => {
      const formatedName = startCase(key);
      return await httpClient({
        endPoint: `${baseUrl}/meta/bases/${table.baseId}/tables/${table.value}/fields`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: {
          description: `This column contains ${formatedName} data`,
          name: formatedName,
          type: key.includes("email") ? "email" : "richText",
        },
      });
    })
  );

  return response;
};

const refreshAccessToken = async ({ refreshToken, connId }) => {
  const response = await httpClient({
    method: "POST",
    endPoint: `https://www.airtable.com/oauth2/v1/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: authorizationHeader,
    },
    body: qs.stringify({
      client_id: clientId,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!response.success) {
    return {
      success: response.success,
      message: response.message,
    };
  }

  const tokens = response.data || {};

  // Updating the tokens back to the connections
  try {
    await pg("connections")
      .where({ id: connId })
      .update({
        apiKeys: {
          accessToken: tokens?.access_token,
          refreshToken: tokens?.refresh_token,
          additionalData: tokens,
        },
      });
  } catch (e) {}

  return {
    success: true,
    accessToken: tokens?.access_token,
  };
};

const processAirtable = async (data: IAirtableData) => {
  const { eventData, apiKeys, app, taskData, actionSlug, connId } = data;
  const { fields: formValues } = eventData.formSubmissionData;
  const { accessToken, refreshToken } = apiKeys;
  const { baseUrl } = app.appConfig || {};
  const { template } = taskData;

  if (isEmpty(template)) {
    return {
      success: false,
      message: "Airtable data not found",
    };
  }

  const actionMap: any = { addRecord };

  const { tableId, tables = [] } = template;
  const table = tables.find((table: any) => table.value === tableId);

  // Inserting the records to the table
  const requiredData = { accessToken, baseUrl, formValues, table };
  let response = await actionMap[actionSlug](requiredData);

  const errorType = get(response, "response.data.error.type", "");
  // Handling the Column not Exists in the base table
  if (errorType === "UNKNOWN_FIELD_NAME") {
    const fields: any = await createFields(requiredData);

    if (fields.some(({ success }: any) => success)) {
      response = await actionMap[actionSlug](requiredData);
    }
    // Handling the Refreshed Token Error
  } else if (errorType === "UNAUTHORIZED") {
    const newAccessToken: any = refreshAccessToken({ connId, refreshToken });

    if (!newAccessToken.success) {
      return newAccessToken;
    }
    response = await actionMap[actionSlug]({
      ...requiredData,
      ...newAccessToken,
    });
  }

  return response;
};

export default processAirtable;
