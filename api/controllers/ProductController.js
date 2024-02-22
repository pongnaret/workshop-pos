const express = require("express");
const app = express();
const ProductModel = require("../models/ProductModel");
const Service = require("./Service");

app.post("/product/insert", Service.isLogin, async (req, res) => {
  try {
    let payload = req.body;
    payload.userId = Service.getMemberId(req);

    const result = await ProductModel.create(payload);
    res.send({ result: result, message: "success" });
  } catch (e) {
    res.statusCode = 500;
    res.send({ message: e.message });
  }
});

module.exports = app;