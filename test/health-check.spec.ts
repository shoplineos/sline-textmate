// test/smoke.spec.ts
import { loadHtmlWithSlineGrammar } from "./helpers/loadGrammar.js";
import { expect } from "chai";

it("grammar loads", async () => {
  const g = await loadHtmlWithSlineGrammar();
  expect(g).to.not.equal(null);
});
