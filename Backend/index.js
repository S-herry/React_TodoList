const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors"); // 引入 CORS 中介軟體 允取所有來源
const PORT = 5001;
const task = require("./api/task");
const status = require("./api/status");

app.use(express.json()); // 自動解析 Content-Type: application/json 結果放在 req.body
app.use(express.urlencoded({ extended: true }));
//處理 Content-Type: application/x-www-form-urlencoded 的請求傳統 HTML <form> 表單格式

app.use(cors());
app.use(task);
app.use(status);

// fs 模組同步讀取檔案內容
// "utf-8" 表示讀取為文字
// JSON.parse 將讀進來的 JSON 字串轉成 JavaScript 物件。

app.listen(PORT);
