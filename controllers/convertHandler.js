function ConvertHandler() {
  const validUnits = {
    gal: { unitSymbol: "gal", unitName: "gallon" },
    l: { unitSymbol: "l", unitName: "liters" },
    lbs: { unitSymbol: "lbs", unitName: "pounds" },
    kg: { unitSymbol: "kg", unitName: "kilogram" },
    mi: { unitSymbol: "mi", unitName: "miles" },
    km: { unitSymbol: "km", unitName: "kilometers" },
  };

  this.getNum = function (input) {
    let result;

    return result;
  };

  this.getUnit = function (input) {
    let result;
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;

    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
}

module.exports = ConvertHandler;
