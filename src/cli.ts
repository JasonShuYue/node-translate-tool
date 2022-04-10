#!/usr/bin/env node
import { translate } from "./main";

const { Command } = require("commander");
const program = new Command();

program
  .version("0.0.1")
  .name("fy")
  .usage("<English>")
  .arguments("<English>")
  .action((word: string) => {
    translate(word);
  });

program.parse(process.argv);
