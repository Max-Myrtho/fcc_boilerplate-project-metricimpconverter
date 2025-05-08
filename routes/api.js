"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.get("/api", (req, res) => {
    console.log("rendering index...");
    return res.json({ d: "1" });
  });

  app.get("/api/convert", (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (!initNum || !initUnit)
      return res.json({ initNum, initUnit, data: "invalid unit" });
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);

    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    return res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
