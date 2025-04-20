#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of this script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to package.json and index.ts
const packageJsonPath = path.join(__dirname, "../package.json");
const indexTsPath = path.join(__dirname, "../src/index.ts");

// Read package.json to get the version
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const version = packageJson.version;

  if (!version) {
    console.error("Version not found in package.json");
    process.exit(1);
  }

  // Read index.ts file
  let indexContent = fs.readFileSync(indexTsPath, "utf8");

  // Replace the version in index.ts
  const updated = indexContent.replace(
    /(version:\s*)"([^"]+)"/,
    (match, prefix, oldVersion) => {
      if (oldVersion === version) {
        console.log(`Version is already up to date (${version})`);
        return match;
      }
      console.log(`Updating version from ${oldVersion} to ${version}`);
      return `${prefix}"${version}"`;
    }
  );

  // Write the updated content back to index.ts
  fs.writeFileSync(indexTsPath, updated, "utf8");
  console.log("Version updated successfully in index.ts");
} catch (error) {
  console.error("Error updating version:", error);
  process.exit(1);
}
