import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormGetCommand(program: any) {
  program
    .command("form:get")
    .description("Get an provider configuration.")
    .argument(
      "<provider_config_key>",
      "The unique key of the provider configuration (chosen by you upon creating this provider configuration)."
    )
    .action(async function (this: Command) {
      checkEnvVars();
      let url = hostUrl + `/config/${this.args[0]}`;
      await axios
        .get(url, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((res) => {
          console.table(res.data["config"]);
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
