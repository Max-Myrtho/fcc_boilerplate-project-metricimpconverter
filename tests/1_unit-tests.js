const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler should correctly read a whole number input.", () => {
    assert.equal(convertHandler.getNum("32L"), 32);
  });
  test("convertHandler should correctly read a decimal number input.", () => {
    assert.equal(convertHandler.getNum("3.2g"), 3.2);
  });
  test("convertHandler should correctly read a fractional input.", () => {
    assert.equal(convertHandler.getNum("6/3g"), 2);
  });
  test("convertHandler should correctly read a fractional input with a decimal.", () => {
    assert.equal(convertHandler.getNum("2.2/2g"), 1.1);
  });
  test("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", () => {
    assert.strictEqual(convertHandler.getNum("3/2/3"), false);
  });
  test("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", () => {
    assert.equal(convertHandler.getNum("km"), 1);
  });
  test("convertHandler should correctly read each valid input unit.", () => {
    assert.equal(convertHandler.getUnit("km"), "km");
  });
  test("convertHandler should correctly return an error for an invalid input unit.", () => {
    assert.strictEqual(convertHandler.getUnit("kmr"), false);
  });
  test("convertHandler should return the correct return unit for each valid input unit.", () => {
    assert.equal(convertHandler.getUnit("km"), "km");
  });
  test("convertHandler should correctly return the spelled-out string unit for each valid input unit.", () => {
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
  });
  test("convertHandler should correctly convert gal to L.", () => {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });
  test("convertHandler should correctly convert L to gal.", () => {
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
  });
  test("convertHandler should correctly convert mi to km.", () => {
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
  });
  test("convertHandler should correctly convert km to mi.", () => {
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });
  test("convertHandler should correctly convert lbs to kg.", () => {
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
  });
  test("convertHandler should correctly convert kg to lbs.", () => {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
});
