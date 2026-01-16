import {formatCurrency} from "../Scripts/utils/money.js";
describe("money formatting tests", function() {
  it("converting cents to formatted dollar string", function() {
    expect(formatCurrency(2095)).toBe('$20.95');//normal case
  });
 it("working with 0",()=>{
  expect(formatCurrency(0)).toBe('$0.00');//zero case
 });
 it("round up to nearest cent",()=>{
  expect(formatCurrency(1999.99)).toBe('$20.00');//decimal case
 });
 it("round down to nearest cent",()=>{
  expect(formatCurrency(2000.5)).toBe('$20.01');//decimal case
 });
});