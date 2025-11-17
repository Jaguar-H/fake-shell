import { fs } from "./fileSystem.js";
import { commands } from "./help.js";

const path = [];

const getNode = () => path.reduce((node, key) => node[key], fs);
const isDir = (x) => x && typeof x === "object" && !Array.isArray(x);
const isFunction = (x) => typeof x === "function";

export const cd = (name) => {
  if (name === "..") return path.pop();

  const cur = getNode();
  const next = cur[name];

  if (!isDir(next) || isFunction(next)) {
    console.log("no such directory");
    return;
  }

  path.push(name);
};

export const run = (func) => {
  const node = getNode()[func];
  if (isFunction(node)) return node();
  console.log(func, "is not a function to run");
};

export const mkdir = (name) => {
  const cur = getNode();
  if (cur[name]) return console.log("already exists");
  cur[name] = {};
};

export const mkfile = (name) => {
  const cur = getNode();
  if (cur[name]) return console.log(`\n\n${name} already exists`);

  console.log("\n\n>@end< to end the file\n");
  const lines = [];
  while (true) {
    const line = prompt("- ");
    if (line === "@end") break;
    lines.push(line);
  }

  cur[name] = lines.join("\n");
};

export const ls = () => {
  const cur = getNode();
  if (!isDir(cur)) return console.log("not a directory");
  console.log("\n\n", Object.keys(cur).join("       "));
};

export const mpwd = () => "/" + path.join("/");
export const pwd = () => console.log(mpwd());


export const cat = (name) => {
  const file = getNode()[name];
  if (typeof file === "string") return console.log("\n\n" + file);
  console.log(`${name} is not a file`);
};

export const help = (cmd = "") => {
  if (!cmd) {
    console.log("The Available commands are:");
    for (const c in commands) console.log(`\n\t${c} : ${commands[c]}\n`);
    return;
  }
  if (!commands[cmd]) return console.log("\n no help available for this command \n");
  console.log(`\n\t${cmd} : ${commands[cmd]}\n`);
};

export const rm = (name) => {
  const curr = getNode();
  if (!curr[name]) return console.log("file not found");
  delete curr[name];
  console.log(name, "\n succesFully deleted\n");
};
