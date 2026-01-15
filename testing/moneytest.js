//automated tests for money formatting function
import {formatCurrency} from "../Scripts/utils/money.js"
console.log("Test suite: money formatting tests");
console.log("converting cents to formatted dollar string");
  if(formatCurrency(2095)==='$20.95'){//normal case

      console.log("moneytest passed");}
  else
    console.log("moneytest failed");
  console.log("edge cases:");
  console.log("working with 0");
  if(formatCurrency(0)==='$0.00')//zero case
    console.log("moneytest passed");
  else
   console.log("moneytest failed");
  console.log("negative values");
  if(formatCurrency(-500)==='$-5.00')//negative case
    console.log("moneytest passed");
  else
   console.log("moneytest failed");
  console.log("round up to nearest cent");
  if(formatCurrency(1999.99)==='$20.00')//decimal case
    console.log("moneytest passed");  
  else
   console.log("moneytest failed");
  console.log("large numbers");
  if(formatCurrency(1000000)==='$10000.00')//large number case
    console.log("moneytest passed");
  else
   console.log("moneytest failed"); 
  console.log("round down to nearest cent");
  if(formatCurrency(2000.5)==='$20.01')//large number case
    console.log("moneytest passed");
  else
    console.log("moneytest failed");
    console.log(formatCurrency(2000.5));