import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import { parse as json2csv } from "json2csv";
const { BUCKET_URL, BUCKET_KEY } = process.env;

const bucketName = "exports";

export const supabase = createClient(BUCKET_URL, BUCKET_KEY);

// Function to convert JSON to CSV
export function convertJsonToCsv(jsonData) {
  const random = Math.floor(Math.random() * 900) + 100;
  const fileName = `uploads_${Date.now()}${random}.csv`;
  try {
    const csvFilePath = `${fileName}`;
    const csvData = json2csv(jsonData.map((data) => data.fields));
    fs.writeFileSync(csvFilePath, csvData, "utf8");
    return { csvData, fileName };
  } catch (error) {
    console.error("Error converting JSON to CSV:", error);
  }
}

// Function to upload file to Supabase storage and get file URL
export async function uploadFileToSupabase(csvFile, fileName) {
  // Upload file to Supabase storage
  const { data, error }: any = await supabase.storage
    .from(bucketName)
    .upload(fileName, csvFile, { contentType: "text/csv" });
  if (error) {
    console.error("Error uploading file to Supabase:", error);
    return null;
  }

  // Get file URL
  const fileUrl = await getUrl(fileName);
  if (fileUrl) {
    fs.unlinkSync(fileName);
  }
  return fileUrl;
}

export const getUrl = async (fileName) => {
  const { data } = await supabase.storage.from(bucketName).getPublicUrl(fileName);
  return data.publicUrl;
};
