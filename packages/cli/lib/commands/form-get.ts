import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormGetCommand(program: any) {
  program
    .command("form:get")
    .description("Get a form detail.")
    .argument(
      "<form_id>",
      "The unique slug of the form (chosen by system upon creating this form)."
    )
    .action(async function (this: Command) {
      checkEnvVars();
      let url = hostUrl + `/form/${this.args[0]}`;
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
