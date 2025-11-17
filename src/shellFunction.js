import { fs } from "./fileSystem.js";
import { commands } from "./help.js";

const path = [];

const getNode = () => path.reduce((node, curr) => node[curr], fs);

const isDir = (dir) => typeof dir === "object" && !Array.isArray(dir);
 
const isFunction = (x) => typeof x === "function"

export const cd = (dir) => {
  const cur = getNode();

  if (dir === "..") {
    path.pop();
    return;
  }
  if (!cur[dir] || !isDir(cur[dir])|| isFunction(cur[dir])) {
    return console.log("no such directory");
  }
  path.push(dir);
};


export const run = (func)=>{
  const curr = getNode()
  if (isFunction(curr[func])){
    curr[func]();
    return 
  }

  console.log(func," is not a function to run "); 
}

export const mkdir = (name) => {
  const cur = getNode();
  if (cur[name]) return console.log("already exists");
  cur[name] = {};
};

export const mkfile = (name) => {
  const cur = getNode();
  if (cur[name]) {
    return console.log("\n\n", name, " already exists");
  }
  const data = [];
  console.log("\n\n>@end< to end the file\n");

  while (true) {
    const line = prompt("- ");
    if (line === "@end") break;
    data.push(line);
  }
  getNode()[name] = data.join("\n");
};

export const ls = () => {
  const cur = getNode();
  if (!isDir(cur)) return console.log("not a directory");

  console.log("\n\n", Object.keys(cur).join("       "));
};


export const mpwd = () => {
  return "/" + path.join("/")}

export const pwd = () => {
  console.log(mpwd());
}


export const cat = (filename) => {
  const curr = getNode()

  if (!isDir(curr[filename]) && !isFunction(curr[filename])) {
    console.log("\n\n",curr[filename]);
    return;
  }
  console.log(`${filename} is not a file`);
  return;
};


export const help = (cmd = "") => {
  if (cmd.length === 0) {
    console.log("The Available commands are :");
    for (const cmnd in commands) {
      console.log(`\n\t${cmnd} : ${commands[cmnd]}\n`);
    }
    return;
  }
  
  if (commands[cmd]) {
    console.log(`\n\t${cmd} : ${commands[cmd]}\n`);
    return;
  }

  console.log("\n no help available for this command \n");
};

export const rm = (dirName) => {
  const data = getNode();
  
  if (data[dirName]) {
    delete (data[dirName]);
    console.log(dirName, "\n succesFully deleted\n");
    return;
  }
  console.log("file not found");
};


