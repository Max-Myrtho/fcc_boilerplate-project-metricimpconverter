"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api", (req, res) => {
    clog("rendering index...");
    return res.send("It works!");
  });

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) return res.send("invalid number and unit");
    else if (initNum === false) return res.send("invalid number");
    else if (initUnit === false) return res.send("invalid unit");

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    return res
      .status(200)
      .json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
