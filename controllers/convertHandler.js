const verbose = process.env.DEBUG === "true" || false;
clog = (l) => verbose && console.log(l);

function ConvertHandler() {
  const validUnits = {
    gal: { unitSymbol: "gal", unitName: "gallons" },
    l: { unitSymbol: "L", unitName: "liters" },
    lbs: { unitSymbol: "lbs", unitName: "pounds" },
    kg: { unitSymbol: "kg", unitName: "kilograms" },
    mi: { unitSymbol: "mi", unitName: "miles" },
    km: { unitSymbol: "km", unitName: "kilometers" },
  };

  const validUnitsSymbol = ["gal", "L", "lbs", "kg", "mi", "km"];

  this.getNum = function (input) {
    const regex = /^[01-9.\/]+/g;
    clog("getNum");
    const match = regex.exec(input);
    clog(match);

    const is_no_initNum = validUnitsSymbol.some(
      (e) => input.startsWith(e) && this.getUnit(input)
    );
    if (is_no_initNum) return 1;
    clog("is_no_initNum");
    clog(is_no_initNum);
    if (match == null) {
      return false;
    }
    const result = parseFraction(match[0]);
    return result || false;
  };

  function parseFraction(str) {
    if (str.includes("/")) {
      const parts = str.split("/");
      if (parts.length > 2) return false;
      return Number(parts[0]) / Number(parts[1]);
    }
    return Number(str);
  }

  this.getUnit = function (input) {
    const regex = /[^01-9.\/]+$/gi;
    clog("getUnit");
    const match = regex.exec(input.toLowerCase());
    clog(match);

    if (match == null) {
      return false;
    }

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
    clog("converting: |" + initNum + " | " + initUnit + "|");
    if (initUnit && initNum) {
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
      result = result.toFixed(5);
    } else {
      return false;
    }
    clog(result);
    return Number(result);
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    returnUnit = this.spellOutUnit(returnUnit);
    initUnit = this.spellOutUnit(initUnit);
    let result = `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
    clog("String: " + result);
    return result;
  };
}

module.exports = ConvertHandler;
