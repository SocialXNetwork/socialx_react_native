if (typeof __dirname === "undefined") global.__dirname = "/";
if (typeof __filename === "undefined") global.__filename = "";
if (typeof process === "undefined") {
  global.process = require("process");
  console.log(`loaded global.process=`, global.process);
} else {
  console.log(`process existed =`, process);

  const bProcess = require("process");
  for (var p in bProcess) {
    if (!(p in process)) {
      process[p] = bProcess[p];
    }
  }
}

process.browser = false;

if (typeof Buffer === "undefined") global.Buffer = require("buffer").Buffer;

const isDev = typeof __DEV__ === "boolean" && __DEV__;
process.env["NODE_ENV"] = isDev ? "development" : "production";
if (typeof localStorage !== "undefined") {
  localStorage.debug = isDev ? "*" : "";
}

if (!process.version) {
  process.version = "";
  console.log(`[shim] hacking process.version`);
}

require("crypto");
