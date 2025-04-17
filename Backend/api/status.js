const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const statusPath = "./data/status.json";

const statusList = JSON.parse(fs.readFileSync(statusPath, "utf-8"));
router.get("/api/status", (req, res) => {
  res.json(statusList);
});
router.post("/api/status", (req, res) => {
  const { status, color } = req.body;
  const isDuplicate = statusList.some(
    (item) => item.status.toLowerCase() === status.toLowerCase()
  );

  if (isDuplicate) {
    return res.status(400).json({ message: "Status already exists." });
  }

  const newStatus = {
    id: statusList.length === 0 ? 0 : statusList[statusList.length - 1].id + 1,
    status: status,
    color: color,
  };
  statusList.push(newStatus);
  fs.writeFileSync(statusPath, JSON.stringify(statusList, null, 2));

  res.json({ message: "成功新增狀態", newStatus });
});
router.delete("/api/status/:id", (req, res) => {
  const { id } = req.params;
  if (id == 1 || id == 2) {
    return res.status(404).json({ message: "不可刪除" });
  }
  const statusIndex = statusList.findIndex((status) => status.id == id);

  if (statusIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  statusList.splice(statusIndex, 1);
  fs.writeFileSync(statusPath, JSON.stringify(statusList, null, 2));

  res.json({ message: "成功刪除狀態", statusList });
});

module.exports = router;
