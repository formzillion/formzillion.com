import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormDeleteCommand(program: any) {
  program
    .command("form:delete")
    .description("Delete a form.")
    .argument("<form_id>", "The unique id of the form.")
    .action(async function (this: Command) {
      checkEnvVars();
      let url = hostUrl + `/form/${this.args[0]}`;
      await axios
        .delete(url, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((_) => {
          console.log("\n\n✅ Successfully deleted the form!\n\n");
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
