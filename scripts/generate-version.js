const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const version = {
  buildId: crypto.randomBytes(8).toString("hex"),
  buildTime: new Date().toISOString(),
};

const outDir = path.join(__dirname, "..", "public");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "version.json"), JSON.stringify(version, null, 2));
console.log(`version.json generiert: ${version.buildId} (${version.buildTime})`);
