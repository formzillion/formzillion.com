import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormDeleteCommand(program: any) {
  program
    .command("form:delete")
    .description("Delete an provider configuration.")
    .argument(
      "<provider_config_key>",
      "The unique key of the provider configuration (chosen by you upon creating this provider configuration)."
    )
    .action(async function (this: Command) {
      checkEnvVars();
      let url = hostUrl + `/config/${this.args[0]}`;
      await axios
        .delete(url, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((_) => {
          console.log(
            "\n\n✅ Successfully deleted the provider configuration!\n\n"
          );
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
