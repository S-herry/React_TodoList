const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/InitData.json"); // 路徑修正
let todoList = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// 取得資料
router.get("/api/task", (req, res) => {
  res.json(todoList);
});

// 修改資料
router.put("/api/task/:id", (req, res) => {
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
  res.json({
    message: "資料成功修改",
    newTask: todoList[taskIndex],
  });
});

// 刪除資料
router.delete("/api/task/:id", (req, res) => {
  const { id } = req.params;
  const taskIndex = todoList.findIndex((task) => task.id == id);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  todoList.splice(taskIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));

  res.json({ message: "刪除資料成功", todoList });
});

// 新增資料
router.post("/api/task", (req, res) => {
  const { content, completed } = req.body;
  // 創建新任務
  const newTask = {
    id: todoList.length === 0 ? 0 : todoList[todoList.length - 1].id + 1,
    content: content,
    completed: completed ?? "inProgress", // 默認為未完成
    createdAt: new Date().toISOString(),
  };
  todoList.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));
  res.json({ message: "資料新增成功", newTask });
});

// 刪除該狀態的資料
router.get("/api/taskstatus/:status", (req, res) => {
  const { status } = req.params;

  const completedTasksExist = todoList.some(
    (task) => task.completed === status
  );

  if (!completedTasksExist) {
    return res
      .status(404)
      .json({ message: "No completed tasks found to delete" });
  }

  todoList = todoList.filter((task) => task.completed !== status);
  fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2));

  res.json({
    message: `${status} 刪除`,
    todoList,
  });
});

module.exports = router;
