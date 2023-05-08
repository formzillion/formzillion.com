import axios from "axios";
import { Command } from "commander";
import { checkEnvVars, appendHeaders, hostUrl, httpsAgent } from "../utils";

export function registerFormCreateCommand(program: any) {
  program
    .command("form:create")
    .description("Create an provider configuration.")
    .argument(
      "<provider_config_key>",
      "The unique key of the provider configuration (choose a friendly name, e.g. hubspot_staging)."
    )
    .argument(
      "<provider>",
      "The provider of the 3rd-party API, must match the template keys in https://Formzillion.dev/oauth-providers (e.g. hubspot)."
    )
    .argument(
      "<oauth_client_id>",
      "The OAuth Client ID obtained from the API provider."
    )
    .argument(
      "<oauth_client_secret>",
      "The OAuth Client Secret obtained from the API provider."
    )
    .argument(
      "<oauth_scopes>",
      "The OAuth Scopes obtained from the API provider (comma-separated)."
    )
    .action(async function (this: Command) {
      checkEnvVars();
      let body = {
        provider_config_key: this.args[0],
        provider: this.args[1],
        oauth_client_id: this.args[2],
        oauth_client_secret: this.args[3],
        oauth_scopes: this.args[4],
      };

      let url = hostUrl + `/config`;
      await axios
        .post(url, body, { headers: appendHeaders(), httpsAgent: httpsAgent() })
        .then((_) => {
          console.log(
            "\n\n✅ Successfully created a new provider configuration!\n\n"
          );
        })
        .catch((err) => {
          console.log(`❌ ${err.response?.data.error || JSON.stringify(err)}`);
        });
    });
}
