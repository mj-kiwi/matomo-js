#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get the directory name of this script
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Path to package.json, index.ts, and test file
const packageJsonPath = path.join(__dirname, "../package.json");
const indexTsPath = path.join(__dirname, "../src/index.ts");
const indexTestPath = path.join(__dirname, "../tests/index.test.ts");

// Read package.json to get the version
try {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  const version = packageJson.version;

  if (!version) {
    console.error("Version not found in package.json");
    process.exit(1);
  }

  // Update version in index.ts
  let indexContent = fs.readFileSync(indexTsPath, "utf8");
  const updatedIndex = indexContent.replace(
    /(version:\s*)"([^"]+)"/,
    (match, prefix, oldVersion) => {
      if (oldVersion === version) {
        console.log(`Version in index.ts is already up to date (${version})`);
        return match;
      }
      console.log(
        `Updating version in index.ts from ${oldVersion} to ${version}`
      );
      return `${prefix}"${version}"`;
    }
  );

  // Write the updated content back to index.ts
  fs.writeFileSync(indexTsPath, updatedIndex, "utf8");
  console.log("Version updated successfully in index.ts");

  // Update version in index.test.ts
  let testContent = fs.readFileSync(indexTestPath, "utf8");
  const updatedTest = testContent.replace(
    /(version:\s*)"([^"]+)"/,
    (match, prefix, oldVersion) => {
      if (oldVersion === version) {
        console.log(
          `Version in index.test.ts is already up to date (${version})`
        );
        return match;
      }
      console.log(
        `Updating version in index.test.ts from ${oldVersion} to ${version}`
      );
      return `${prefix}"${version}"`;
    }
  );

  // Write the updated content back to index.test.ts
  fs.writeFileSync(indexTestPath, updatedTest, "utf8");
  console.log("Version updated successfully in index.test.ts");
} catch (error) {
  console.error("Error updating version:", error);
  process.exit(1);
}
