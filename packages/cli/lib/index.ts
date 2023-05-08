import { Command } from "commander";
import { registerFormGetCommand } from "./commands/form-get";
import { registerFormListCommand } from "./commands/form-list";
import { registerFormCreateCommand } from "./commands/form-create";
import { registerFormDeleteCommand } from "./commands/form-delete";

const program = new Command();

// Test from the package root (/packages/cli) with 'node dist/index.js'
program
  .name("formzillion")
  .description(
    `A CLI tool to configure Formzillion:\n- By defaults, the CLI assumes that you are running Formzillion on localhost:3001\n- For Formzillion Cloud: Set the FZ_HOST_URL & FZ_SECRET_KEY env variables\n- For Self-Hosting: set the FZ_HOST_URL env variable`
  );

registerFormListCommand(program);
registerFormGetCommand(program);
registerFormCreateCommand(program);
registerFormDeleteCommand(program);

program.parseAsync(process.argv);
