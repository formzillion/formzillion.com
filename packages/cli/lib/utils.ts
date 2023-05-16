import https from "https";

export let hostUrl = process.env["FZ_HOST_URL"] || "http://localhost:3000/api";
export let cloudHost = "https://formzillion.com/api";
export let stagingHost = "https://dev.formzillion.com/api";

if (hostUrl.slice(-1) === "/") {
  hostUrl = hostUrl.slice(0, -1);
}

export function appendHeaders(
  headers: Record<string, string | number | boolean> = {}
) {
  if (
    (process.env["FZ_HOST_URL"] === cloudHost ||
      process.env["FZ_HOST_URL"] === stagingHost) &&
    process.env["FZ_SECRET_KEY"]
  ) {
    // For Formzillion Cloud (unified)
    headers["Authorization"] = "Bearer " + process.env["FZ_SECRET_KEY"];
  } else if (process.env["FZ_SECRET_KEY"]) {
    // For Formzillion OSS
    headers["Authorization"] =
      "Basic " +
      Buffer.from(process.env["FZ_SECRET_KEY"] + ":").toString("base64");
  }

  headers["Accept-Encoding"] = "application/json";

  return headers;
}

export function httpsAgent() {
  return new https.Agent({
    rejectUnauthorized: false,
  });
}

export function checkEnvVars() {
  if (hostUrl === "http://localhost:3000") {
    console.log(
      `Assuming you are running Formzillion on localhost:3001 because you did not set the FZ_HOST_URL env var.\n\n`
    );
  } else if (hostUrl === cloudHost || hostUrl === stagingHost) {
    if (!process.env["FZ_SECRET_KEY"]) {
      console.log(
        `Assuming you are using Formzillion Cloud but your are lacking the FZ_SECRET_KEY env var.`
      );
    } else if (hostUrl === cloudHost) {
      console.log(
        `Assuming you are using Formzillion Cloud (because you set the FZ_HOST_URL env var to https://formzillion.com/api).`
      );
    } else if (hostUrl === stagingHost) {
      console.log(
        `Assuming you are using Formzillion Cloud (because you set the FZ_HOST_URL env var to https://dev.formzillion.com/api).`
      );
    }
  } else {
    console.log(
      `Assuming you are self-hosting Formzillion (becauses you set the FZ_HOST_URL env var to ${hostUrl}).`
    );
  }
}
