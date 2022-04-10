import { translate } from "./main";

const { Command } = require("commander");
const program = new Command();

program
  .version("0.0.1")
  .name("fy")
  .usage("<English>")
  .arguments("<English>")
  .action((word: string) => {
    const result = translate(word);
  });

program.parse(process.argv);
