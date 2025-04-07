const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors"); // 引入 CORS 中介軟體 允取所有來源
const PORT = 5001;

app.use(express.json()); // 自動解析 Content-Type: application/json 結果放在 req.body
app.use(express.urlencoded({ extended: true }));
//處理 Content-Type: application/x-www-form-urlencoded 的請求傳統 HTML <form> 表單格式

const filePath = "./data/InitData.json";
app.use(cors());
let todoList = JSON.parse(fs.readFileSync(filePath, "utf-8"));
// fs 模組同步讀取檔案內容
// "utf-8" 表示讀取為文字
// JSON.parse 將讀進來的 JSON 字串轉成 JavaScript 物件。

// 取得資料
app.get("/api/init", (req, res) => {
  res.json(todoList);
});

// 修改資料
app.put("/api/init/:id", (req, res) => {
  const { id } = req.params;
  const { content, completed } = req.body;
  const taskIndex = todoList.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  // 更新任務內容和狀態
  todoList[taskIndex].content = content ?? todoList[taskIndex].content;
  todoList[taskIndex].completed = completed ?? todoList[taskIndex].completed;
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));
  res.json({ message: "Data updated successfully", completed });
});

// 刪除資料
app.delete("/api/init/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = todoList.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  todoList.splice(taskIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));

  res.json({ message: "Data deleted successfully", todoList });
});

// 新增資料
app.post("/api/init", (req, res) => {
  const { content, completed } = req.body;
  // 創建新任務
  const newTask = {
    id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
    content: content,
    completed: completed ?? "active", // 默認為未完成
    createdAt: new Date().toISOString(),
  };
  todoList.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));
  res.json({ message: "Data created successfully", newTask });
});

// 刪除完成的資料
app.get("/api/init/completed", (req, res) => {
  const completedTasksExist = todoList.some(
    (task) => task.completed === "completed"
  );

  if (!completedTasksExist) {
    return res
      .status(404)
      .json({ message: "No completed tasks found to delete" });
  }

  todoList = todoList.filter((task) => task.completed !== "completed");
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));

  res.json({
    message: "All completed tasks deleted successfully",
    todoList,
  });
});

app.listen(PORT);
