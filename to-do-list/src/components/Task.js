/*
completed  任務已完成
active   任務進行中
*/

import { memo, useCallback, useState } from "react";
import useTaskRequest from "../hooks/useTaskRequest";
import ShowSwal from "./model/ShowSwal.js";

// 任務狀態
const task_state = {
  completed: "completed",
  active: "active",
};

const Task = memo(
  ({ id, state, title, handleDeleteTask, handleUpdataTask }) => {
    const { handleTaskRequest } = useTaskRequest();
    const [taskState, setTaskState] = useState(task_state[state]);

    // 更新任務
    const updateTaskCallback = useCallback(
      async (taskId, completed) => {
        const data = await handleTaskRequest({
          method: "PUT",
          id: taskId,
          completed,
        });
        if (data) {
          handleUpdataTask(taskId);
          setTaskState(completed);
        }
      },
      [handleTaskRequest, handleUpdataTask]
    );

    // 删除任務
    const delTaskCallback = useCallback(
      async (taskId) => {
        const delTask = await handleTaskRequest({
          method: "DELETE",
          id: taskId,
        });

        if (delTask) {
          ShowSwal({ isS: true, message: "成功刪除" });
          handleDeleteTask(taskId);
        } else {
          ShowSwal({ isS: false, massage: "刪除失敗" });
        }
      },
      [handleTaskRequest, handleDeleteTask]
    );

    return (
      <div className="bg-white relative min-h-14 w-full flex text-primary_title overflow-hidden rounded-lg  ">
        <div className="bg-primary_title w-2 me-3"></div>
        <div className="flex w-full rounded-lg">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={taskState === task_state.completed}
              onChange={() => {
                const nextState =
                  taskState === task_state.completed
                    ? task_state.active
                    : task_state.completed;

                updateTaskCallback(id, nextState);
              }}
            />

            <label
              className={`${taskState === "completed" ? "line-through" : ""}`}
            >
              {title}
            </label>
          </div>
          <div className="ms-auto me-5 text-secondary_content rounded-lg flex gap-2">
            <button onClick={() => delTaskCallback(id)}>X</button>
          </div>
        </div>
      </div>
    );
  }
);

export default Task;
