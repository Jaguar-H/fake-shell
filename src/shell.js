import {
  cat,
  cd,
  help,
  ls,
  mkdir,
  mkfile,
  pwd,
  rm,
  mpwd,
  run
} from "./shellFunction.js";

const commands = { cd, mkdir, ls, pwd, cat, help, rm, mkfile,run };

export const initializeShell = () => {
  console.log("\n\nuse 'help' or 'help cmd name to get help \n");
  
  while (true) {
    const currentPos = mpwd()
    const input = prompt(`${currentPos} > `).trim().split(" ");
    const [cmd, args] = input;

    if (!commands[cmd]) {
      console.log(cmd.length > 0 ? `${cmd} not found` : undefined);
      continue;
    }
    commands[cmd](args);
  }
};
