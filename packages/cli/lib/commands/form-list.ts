import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormListCommand(program: any) {
  program
    .command("form:list")
    .description("List all provider configurations.")
    .action(async function (this: Command) {
      checkEnvVars();
      let url = hostUrl + "/config";
      await axios
        .get(url, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((res) => {
          console.table(
            res.data["configs"].map((o: any) => {
              return {
                unique_key: o.unique_key,
                provider: o.provider,
                created: o.created_at,
              };
            })
          );
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
