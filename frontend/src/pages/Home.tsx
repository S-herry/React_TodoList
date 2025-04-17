import { useEffect, useState, useMemo, useRef } from "react";
import useRequest from "../../hooks/useRequest";

import url from "../data/url.json";
import Header from "../components/home/Header";
import ProgressBar from "../components/ProgressBar";
import Toggle from "../components/Toggle";
import AddTask from "../components/AddTask";
import { TaskFace } from "../components/type/Task";
import { StatusFace } from "../components/type/Status";
import StatsInfo from "../components/home/StatsInfo";
import TaskList from "../components/home/TaskList";
import MixinModel from "../components/model/MixinModel";
const TASK_GET_URL = url.host + url.task.GET;
const TASK_STATUS_GET_URL = url.host + url.status.GET;
const TASK_POST_URL = url.host + url.task.POST;
const HR_CLASS = "w-full border text-[#8794BF]";

function Home() {
  const [tasks, setTasks] = useState<TaskFace[]>([]);
  const [statuses, setStatuses] = useState<StatusFace[]>([]);
  const [sortByCompleted, setSortByCompleted] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("0");

  const { response: taskList, handleRequest: onTaskListRequest } = useRequest<
    { newTask: TaskFace } | TaskFace[]
  >();

  const { response: taskStatus, handleRequest: onTaskStatusListRequest } =
    useRequest<{ newStatus: StatusFace } | StatusFace[]>();

  const didFetch = useRef(false);

  // 初始資料請求
  useEffect(() => {
    if (didFetch.current) return;
    onTaskListRequest({ url: TASK_GET_URL, method: "GET" });
    onTaskStatusListRequest({ url: TASK_STATUS_GET_URL, method: "GET" });
    didFetch.current = true;
  }, []);

  useEffect(() => {
    if (!taskList) return;

    if ("newTask" in taskList) {
      setTasks((prev) => [...prev, taskList.newTask]);
    } else if ("todoList" in taskList) {
      setTasks(taskList.todoList as TaskFace[]);
    } else if (Array.isArray(taskList)) {
      setTasks(taskList);
    }

    if (
      typeof taskList === "object" &&
      "message" in taskList &&
      typeof taskList.message === "string"
    ) {
      MixinModel({
        icon: "success",
        title: taskList.message,
        timer: 2000,
      });
    }
  }, [taskList]);

  useEffect(() => {
    if (!taskStatus) return;

    if ("newStatus" in taskStatus) {
      setStatuses((prev) => [...prev, taskStatus.newStatus]);
    } else if ("statusList" in taskStatus) {
      setStatuses(taskStatus.statusList as StatusFace[]);
    } else if (Array.isArray(taskStatus)) {
      setStatuses(taskStatus);
    }

    if (
      typeof taskStatus === "object" &&
      "message" in taskStatus &&
      typeof taskStatus.message === "string"
    ) {
      MixinModel({
        icon: "success",
        title: taskStatus.message,
        timer: 2000,
      });
    }
  }, [taskStatus]);

  // 切換任務排序
  function onToggle() {
    setSortByCompleted((prev) => !prev);
  }

  // 處理進度資料
  const { completedCount, totalCount, progressPercentage } = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.completed === "completed"
    ).length;
    const total = tasks.length;
    const progress = total === 0 ? 0 : (completed / total) * 100;
    return {
      completedCount: completed,
      totalCount: total,
      progressPercentage: progress,
    };
  }, [tasks]);

  // 任務過濾與排序
  const processedTasks = useMemo(() => {
    if (!tasks) return [];
    let result = [...tasks];
    if (statusFilter !== "0") {
      result = result.filter((task) => task.completed === statusFilter);
    }
    if (sortByCompleted) {
      result.sort(
        (a, b) =>
          (a.completed === "completed" ? 1 : 0) -
          (b.completed === "completed" ? 1 : 0)
      );
    } else {
      result.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
    return result;
  }, [tasks, sortByCompleted, statusFilter]);

  function onSetStatusFilter({ val }: { val: string }) {
    setStatusFilter(val);
  }

  return (
    <div className="backgroundImage min-h-screen flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col">
        <Header
          statusFilter={statusFilter}
          onSetStatusFilter={onSetStatusFilter}
          status={statuses}
          onStatusRequest={onTaskStatusListRequest}
          onTaskListRequest={onTaskListRequest}
        />

        <hr className={HR_CLASS} />

        <StatsInfo total={totalCount} completed={completedCount} />
        <ProgressBar progressPercentage={progressPercentage} />

        <TaskList
          tasks={processedTasks}
          statuses={statuses}
          onTaskRequest={onTaskListRequest}
          onStatusRequest={onTaskStatusListRequest}
        />

        <hr className={HR_CLASS} />

        <Toggle toggle={sortByCompleted} onToggle={onToggle}>
          move done thing to end ?
        </Toggle>

        <AddTask
          tasks={processedTasks}
          url={TASK_POST_URL}
          onRequest={onTaskListRequest}
        />
      </div>
    </div>
  );
}

export default Home;
