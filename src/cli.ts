const { Command } = require("commander");
const program = new Command();

program.version("0.0.1").name("fy").useage("<English>");

program.parse(process.argv);
