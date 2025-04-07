import query from "../mysql-connect";
import express from "express";
import moment from "moment";
const { version } = require('../package.json');

// getMysqlUser()
async function getMysqlUser() {
  const user = await query("SELECT User, Host FROM mysql.user;");
  console.log(user);
  return user[0].User;
}

let router = express.Router();
router.get("/", async function (req, res) {
  let title = "Nodejs-Template ";
  let today = new moment().format("YYYY-MM-DD HH:mm:ss");

  res.render("index", {
    today,
    title,
    version
  });
});

router.get("/healthz", async function (req, res) {
  res.status(200).send("OK");
});

router.get("/pod-health", async function (req, res) {
  res.status(200).send("OK");
});

// 確認環境變數能讓資料庫連線
router.post("/", async function (req, res) {
  try {
    const userInput = req.body.query;
    console.log(userInput);
    if (userInput != "12345") {
      res.json({
        message: "403",
      });
    } else {
      const sql = "SELECT NOW() AS time;";
      const result = await query(sql);

      if (result && result.length > 0) {
        res.json({
          message: "Database connection successful",
          time: result[0].time,
          userInput: userInput, // 回傳用戶輸入，以確認接收
        });
      } else {
        throw new Error("No results returned from database");
      }
    }
  } catch (error) {
    console.error("Database query error:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

router.post("/error-test", async function (req, res) {
  try {
    throw new Error("This is a test error");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request" });
  }
});

module.exports = router;
