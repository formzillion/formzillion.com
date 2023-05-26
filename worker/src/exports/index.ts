import { httpClient } from "../../utils";
import { ExportSubmissionsEmail } from "./exportEmail";
import { convertJsonToCsv, uploadFileToSupabase } from "./helper";
import { apiKey, fromEmailData } from "../config/sengrid";

const pg = global.pg;

const sendEmail = async ({ data, apiKey }) => {
  return await httpClient({
    endPoint: `https://api.sendgrid.com/v3/mail/send`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: data,
  });
};

const exportSubmissions = async (eventData) => {
  const exportDays = new Date();
  const { userEmail } = eventData;
  exportDays.setDate(exportDays.getDate() - eventData.exportDays);

  const jsonData = await pg("form_submissions")
    .where("form_id", eventData.formId)
    .where("created_at", ">=", exportDays)
    .select("*");

  const { csvData, fileName }: any = convertJsonToCsv(jsonData);
  const fileUrl = await uploadFileToSupabase(csvData, fileName);
  console.log("fileUrl: ", fileUrl);

  const exportSubmissionsEmail = {
    from: fromEmailData,
    personalizations: [
      {
        to: [
          {
            email: userEmail.replaceAll(`"`, ""),
          },
        ],
      },
    ],
    subject: `Export File Submission`,
    content: [
      {
        type: "text/html",
        value: ExportSubmissionsEmail({
          fileUrl,
        }),
      },
    ],
  };

  const res: any = await sendEmail({ data: exportSubmissionsEmail, apiKey });
  if (res.status === 202) {
    return {
      success: true,
      message: `Export event processed successfully!`,
    };
  } else {
    return {
      success: false,
      message: `error: ${res.status} ${res.message}`,
    };
  }
};

export default exportSubmissions;
