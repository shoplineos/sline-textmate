export interface TokenDiff {
  line: number;
  token: number;
  expected?: any;
  actual?: any;
}

export function diffSnapshot(actual: any, expected: any): TokenDiff | null {
  if (!expected || !expected.lines) {
    return {
      line: 0,
      token: 0,
      expected: undefined,
      actual: actual.lines?.[0]?.[0],
    };
  }

  const maxLines = Math.max(actual.lines.length, expected.lines.length);

  for (let i = 0; i < maxLines; i++) {
    const aLine = actual.lines[i] || [];
    const eLine = expected.lines[i] || [];

    const maxTokens = Math.max(aLine.length, eLine.length);

    for (let j = 0; j < maxTokens; j++) {
      const aTok = aLine[j];
      const eTok = eLine[j];

      if (!aTok || !eTok) {
        return {
          line: i,
          token: j,
          expected: eTok,
          actual: aTok,
        };
      }

      if (
        aTok.text !== eTok.text ||
        JSON.stringify(aTok.scopes) !== JSON.stringify(eTok.scopes)
      ) {
        return {
          line: i,
          token: j,
          expected: eTok,
          actual: aTok,
        };
      }
    }
  }

  return null;
}
