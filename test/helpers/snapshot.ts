import fs from "fs";
import path from "path";
import { tokenizeText } from "./tokenize.js";
import { IGrammar } from "vscode-textmate";

export interface ScopeSnapshot {
  fixture: string;
  lines: {
    text: string;
    scopes: string[];
  }[][];
}

export function generateSnapshot(
  grammar: IGrammar,
  fixturePath: string
): ScopeSnapshot {
  const text = fs.readFileSync(fixturePath, "utf8");
  const lines = tokenizeText(grammar, text);

  return {
    fixture: path.basename(fixturePath),
    lines,
  };
}
