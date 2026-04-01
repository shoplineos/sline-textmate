import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import vsctm from "vscode-textmate";
const { Registry, parseRawGrammar } = vsctm;
import vscodeOniguruma from "vscode-oniguruma";
import YAML from "yaml";
import { createRequire } from "module";

const { OnigScanner, OnigString } = vscodeOniguruma;
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wasmUrl = import.meta.resolve("vscode-oniguruma/release/onig.wasm");
const wasm = fs.readFileSync(fileURLToPath(wasmUrl));

function loadJsonGrammar(grammarPath: string) {
  return parseRawGrammar(fs.readFileSync(grammarPath, "utf8"), grammarPath);
}

export async function loadHtmlWithSlineGrammar() {
  await vscodeOniguruma.loadWASM(wasm.buffer);

  const registry = new Registry({
    onigLib: Promise.resolve({
      createOnigScanner: (sources) => new OnigScanner(sources),
      createOnigString: (str) => new OnigString(str),
    }),

    loadGrammar: async (scopeName) => {
      switch (scopeName) {
        case "text.html.sline": {
          const yamlPath = path.join(
            __dirname,
            "../../grammars/sline.tmLanguage.yaml",
          );

          const grammarObject = YAML.parse(fs.readFileSync(yamlPath, "utf8"));

          return parseRawGrammar(
            JSON.stringify(grammarObject),
            yamlPath.replace(/\.ya?ml$/, ".json"),
          );
        }

        case "text.html.basic":
          return loadJsonGrammar(
            path.join(
              __dirname,
              "../third-party-grammars/html.tmLanguage.json",
            ),
          );

        case "source.js":
          return loadJsonGrammar(
            path.join(
              __dirname,
              "../third-party-grammars/javascript.tmLanguage.json",
            ),
          );

        case "source.css":
          return loadJsonGrammar(
            path.join(__dirname, "../third-party-grammars/css.tmLanguage.json"),
          );

        case "source.json":
          return loadJsonGrammar(
            path.join(
              __dirname,
              "../third-party-grammars/json.tmLanguage.json",
            ),
          );

        default:
          return null;
      }
    },
  });

  return registry.loadGrammar("text.html.sline");
}
