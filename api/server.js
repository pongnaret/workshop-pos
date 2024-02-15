const express = require("express");
const cors = require("cors");
const app = express();
const port = 3005;
const bodyParser = require("body-parser");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const conn = require("./connect")

app.get("/testConnect", async(req,res)=>{
    try {
        await conn.authenticate()
        res.send("Connection has been Successfully")
    } catch (error) {
        res.send("Unable to connect to the database",error)
    }
})
// app.use("/uploads", express.static("uploads"));

app.use(require("./controllers/PackageController"));
app.use(require("./controllers/MemberController"));
// app.use(require("./controllers/ProductController"));
// app.use(require("./controllers/ProductImageController"));
// app.use(require("./controllers/UserController"));
// app.use(require("./controllers/BillSaleController"));
// app.use(require("./controllers/StockController"));
// app.use(require("./controllers/BankController"));
// app.use(require("./controllers/AdminController"));
// app.use(require("./controllers/ChangePackageController"));

app.listen(port, () => {
  console.log(`Example app listening on port `, port);
});
