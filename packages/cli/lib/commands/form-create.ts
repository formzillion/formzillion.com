import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormCreateCommand(program: any) {
  program
    .command("form:create")
    .description("Create a form.")
    .argument(
      "<name>",
      "The unique name of the form (choose a friendly name, e.g. Conact Us Form)."
    )
    .argument(
      "<emails>",
      "List of emails to be notified during form submissions"
    )
    .action(async function (this: Command) {
      checkEnvVars();
      let body = {
        name: this.args[0],
        emails: this.args[1],
      };

      let url = hostUrl + `/form`;
      await axios
        .post(url, body, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((_) => {
          console.log("\n\n✅ Successfully created a form!\n\n");
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
