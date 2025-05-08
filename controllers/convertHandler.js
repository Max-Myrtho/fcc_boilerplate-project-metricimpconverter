const verbose = true;
clog = (l) => verbose && console.log(l);

function ConvertHandler() {
  const validUnits = {
    gal: { unitSymbol: "gal", unitName: "gallon" },
    l: { unitSymbol: "L", unitName: "liters" },
    lbs: { unitSymbol: "lbs", unitName: "pounds" },
    kg: { unitSymbol: "kg", unitName: "kilogram" },
    mi: { unitSymbol: "mi", unitName: "miles" },
    km: { unitSymbol: "km", unitName: "kilometers" },
  };

  this.getNum = function (input) {
    const regex = /^[1-9.\/]+/g;
    clog("getNum");
    const match = regex.exec(input);
    clog(match);
    let result = match ? match[0] : false;
    return result || false;
  };

  this.getUnit = function (input) {
    const regex = /[^1-9.\/]+$/gi;
    clog("getUnit");
    const match = regex.exec(input.toLowerCase());
    clog(match);
    let input_unit = match ? match[0] : false;
    clog("Is " + match[0] + " a valid unit?");
    let result = validUnits[input_unit]
      ? validUnits[input_unit].unitSymbol
      : false;
    clog(result);
    return result;
  };

  this.getReturnUnit = function (initUnit) {
    const conversionUnits = [
      ["gal", "L"],
      ["lbs", "kg"],
      ["mi", "km"],
    ];

    let result;
    conversionUnits.map((e) => {
      const index_of_the_unit = e.indexOf(initUnit);
      if (index_of_the_unit > -1) {
        result = e[index_of_the_unit === 0 ? 1 : 0];
      }
      return;
    });

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result = validUnits[unit.toLowerCase()].unitName;
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    clog("converting: " + initNum + " " + initUnit);
    if (initUnit === "gal") {
      result = initNum * galToL;
    } else if (initUnit === "L") {
      result = initNum / galToL;
    } else if (initUnit === "lbs") {
      result = initNum * lbsToKg;
    } else if (initUnit === "kg") {
      result = initNum / lbsToKg;
    } else if (initUnit === "mi") {
      result = initNum * miToKm;
    } else if (initUnit === "km") {
      result = initNum / miToKm;
    }
    clog(result);
    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    return result;
  };
}

module.exports = ConvertHandler;
