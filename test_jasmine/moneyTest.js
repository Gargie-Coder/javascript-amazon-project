import {formatCurrency} from "../Scripts/utils/money.js";
describe("money formatting tests", function() {
  it("converting cents to formatted dollar string", function() {
    expect(formatCurrency(2095)).toBe('$20.95');//normal case
  });});