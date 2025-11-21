import {
  cat,
  cd,
  help,
  ls,
  mkdir,
  mkfile,
  mpwd,
  pwd,
  rm,
  fs
} from "./shellFunction.js";
import { encode} from "../encodeObject.js";

const commands = { cd, mkdir, ls, pwd, cat, help, rm, mkfile};

export const initializeShell = () => {
  console.log("\n\nuse 'help' or 'help cmd name to get help \n");

  while (true) {
    const currentPos = mpwd();
    const input = prompt(`${currentPos} > `).trim().split(" ");
    const [cmd, args] = input;

    if (cmd === "quit") {
      if (confirm("Do you want to save the changes in file system : ")) {
        Deno.writeTextFileSync("./src/fileSystem.txt", encode(fs));
        console.log("\n\nchanges saved \n\n");
      }
      console.log("BYE BYE USER");
      return 
    }

    if (!commands[cmd]) {
      console.log(cmd.length > 0 ? `${cmd} not found` : undefined);
      continue;
    }

    commands[cmd](args);
  }
};
