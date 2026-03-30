import { promises as fs } from "fs";
import path from "path";
import yaml from "js-yaml";

async function convertYamlToJson(yamlPath) {
  try {
    // Read yaml file content
    const yamlContent = await fs.readFile(yamlPath, "utf8");

    // Parse yaml into json object
    const jsonObject = yaml.load(yamlContent, { schema: yaml.FAILSAFE_SCHEMA });

    // Build output json file path (replace extension)
    const jsonPath = yamlPath.replace(/\.(yaml|yml)$/i, ".json");

    // Write json object to file
    await fs.writeFile(jsonPath, JSON.stringify(jsonObject, null, 2), "utf8");

    console.log(`Successfully converted: ${yamlPath} -> ${jsonPath}`);
    return true;
  } catch (error) {
    console.error(`Conversion failed ${yamlPath}:`, error.message);
    return false;
  }
}

async function batchConvertYamlFiles(directory) {
  try {
    // Read directory contents
    const entries = await fs.readdir(directory, { withFileTypes: true });

    let successCount = 0;
    let totalCount = 0;

    // Iterate through each entry in the directory
    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        // Process subdirectories recursively
        const { success, total } = await batchConvertYamlFiles(entryPath);
        successCount += success;
        totalCount += total;
      } else if (entry.isFile() && /\.(yaml|yml)$/i.test(entry.name)) {
        // Process yaml files
        totalCount++;
        const success = await convertYamlToJson(entryPath);
        if (success) successCount++;
      }
    }

    return { success: successCount, total: totalCount };
  } catch (error) {
    console.error(`Process directory ${directory} error:`, error.message);
    return { success: 0, total: 0 };
  }
}

async function main() {
  // Specify the directory to process
  const targetDirectory = "./grammars";

  console.log(
    `Start converting directory ${targetDirectory} all yaml files under...`
  );

  const { success, total } = await batchConvertYamlFiles(targetDirectory);

  console.log(
    `Conversion completed: ${success} succeeded, ${
      total - success
    } failed, ${total} files total`
  );
}

main().catch(console.error);
