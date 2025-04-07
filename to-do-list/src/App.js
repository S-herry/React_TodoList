import { useEffect, useState, useCallback, useMemo } from "react";
import Header from "./components/Header.js";
import RowLine from "./components/RowLine";
import ProgressBar from "./components/ProgressBar.js";
import AllTask from "./components/AllTask.js";
import Task from "./components/Task.js";
import Toggle from "./components/Toggle.js";
import InputTask from "./components/InputTask.js";
import useTaskRequest from "./hooks/useTaskRequest";
import ShowSwal from "./components/model/ShowSwal.js";
import ShowQues from "./components/model/ShowQues.js";

function App() {
  const { taskRequest, setTaskRequest, handleTaskRequest } = useTaskRequest();
  const [sortByCompleted, setSortByCompleted] = useState(false);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const url = "http://localhost:5001/api/init/completed";

  // 取得任務
  useEffect(() => {
    const fetchTasks = async () => {
      await handleTaskRequest({ method: "GET" });
    };

    fetchTasks();
  }, [handleTaskRequest]);

  // 新增任務
  const AddTask = useCallback(
    async (content) => {
      const addResult = await handleTaskRequest({
        method: "POST",
        content,
      });

      if (addResult?.newTask) {
        ShowSwal({ isS: true, message: "成功新增資料" });
        setTaskRequest((prev = []) => [...prev, addResult.newTask]);
        setIsAddingTask(!isAddingTask);
      } else {
        console.error("新增任務失敗");
        ShowSwal({ isS: false, message: "新增任務失敗" });
      }
    },
    [handleTaskRequest, isAddingTask, setTaskRequest]
  );

  // 删除任務
  const handleDeleteTask = useCallback((taskId) => {
    setTaskRequest((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    );
  }, []);

  // 任務更新狀態
  const handleUpdataTask = useCallback((taskId) => {
    setTaskRequest((prevTasks) => {
      return prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed:
                task.completed === "completed" ? "active" : "completed",
            }
          : task
      );
    });
  }, []);

  // 排序任務
  const tasksSorted = useMemo(() => {
    if (taskRequest == null) return [];

    return sortByCompleted
      ? [...taskRequest].sort(
          (a, b) =>
            (a.completed === "completed" ? 1 : 0) -
            (b.completed === "completed" ? 1 : 0)
        )
      : [...taskRequest].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
  }, [taskRequest, sortByCompleted]);

  const handleDelAllCompleted = () => {
    ShowQues({
      title: "刪除全部已完成事項",
      message: "刪除後無法復原",
      handleConfirmed: handleConfirmed,
    });
  };

  async function handleConfirmed() {
    try {
      const res = await fetch(url, { method: "GET" });
      const data = await res.json();

      if (!res.ok) {
        console.error("刪除錯誤:", data.message);
        return;
      }
      setTaskRequest(data.todoList); // 更新最新資料
      return true;
    } catch (error) {
      console.error("請求失敗:", error);
      return false;
    }
  }

  return (
    <div className=" bg-gradient-blue-light  w-full min-h-screen flex flex-col items-center justify-center">
      <section className="w-full max-w-2xl rounded-lg">
        <Header />
        <RowLine margin={"my-2"} />
        <ProgressBar taskRequest={taskRequest} />
        <AllTask isAddTask={isAddingTask}>
          {tasksSorted && tasksSorted.length > 0 ? (
            tasksSorted.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                state={task.completed}
                title={task.content}
                handleDeleteTask={handleDeleteTask}
                handleUpdataTask={handleUpdataTask}
              />
            ))
          ) : (
            <p className="mx-auto my-3 text-secondary">目前沒有任務</p>
          )}
        </AllTask>
        <div className="w-full flex">
          <button
            className="ms-auto  bg-red-400 text-white px-2 rounded-md mt-2"
            onClick={handleDelAllCompleted}
          >
            刪除已完成資料
          </button>
        </div>
        <RowLine margin={"my-5"} />

        <Toggle
          toggle={sortByCompleted}
          handleToggle={() => setSortByCompleted(!sortByCompleted)}
        >
          move done thing to end ?
        </Toggle>

        <InputTask addTask={AddTask} />
      </section>
    </div>
  );
}

export default App;
