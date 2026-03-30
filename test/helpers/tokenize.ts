import { IGrammar, StateStack } from "vscode-textmate";

export interface Token {
  text: string;
  scopes: string[];
}

export function tokenizeText(grammar: IGrammar, text: string): Token[][] {
  let stack: StateStack | null = null;

  return text.split("\n").map((line, lineIndex) => {
    const r = grammar.tokenizeLine(line, stack);
    stack = r.ruleStack;

    return r.tokens.map((t) => ({
      position: `line: ${lineIndex + 1}, column: ${t.startIndex}`,
      text: line.slice(t.startIndex, t.endIndex),
      scopes: t.scopes.reverse(),
      // slineScopes: t.scopes.reverse().filter((s) => s.endsWith(".sline")),
    }));
  });
}
