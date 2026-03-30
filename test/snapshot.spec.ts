import fs from "fs";
import path from "path";
import { expect } from "chai";
import { loadHtmlWithSlineGrammar } from "./helpers/loadGrammar.js";
import { generateSnapshot } from "./helpers/snapshot.js";
import { fileURLToPath } from "url";
import { diffSnapshot } from "./helpers/diff.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FIX = path.join(__dirname, "fixtures");
const SNAP = path.join(__dirname, "snapshots");
const UPDATE = process.env.UPDATE_SNAPSHOTS === "1";

function walk(dir: string): string[] {
  return fs.readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("sline snapshots", () => {
  let grammar: any;

  before(async () => {
    grammar = await loadHtmlWithSlineGrammar();
  });

  for (const file of walk(FIX)) {
    if (!file.endsWith(".slt")) continue;

    const rel = path.relative(FIX, file);
    const out = path.join(SNAP, `${rel}.json`);

    it(rel, () => {
      const snap = generateSnapshot(grammar, file);

      fs.mkdirSync(path.dirname(out), { recursive: true });

      if (UPDATE || !fs.existsSync(out)) {
        fs.writeFileSync(out, JSON.stringify(snap, null, 2));
        return;
      }

      const expected = JSON.parse(fs.readFileSync(out, "utf8"));
      const diff = diffSnapshot(snap, expected);

      if (diff) {
        console.error(`
          ❌ Snapshot mismatch
          
          file: ${rel}
          line: ${diff.line + 1}
          token: ${diff.token + 1}

          text:
            ${diff.actual?.text}

          expected scopes:
            ${diff.expected?.scopes?.join("\n  ")}

          actual scopes:
            ${diff.actual?.scopes?.join("\n  ")}
        `);
      }

      expect(diff).to.equal(null);
    });
  }
});
