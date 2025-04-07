import { memo, useMemo, useEffect, useState } from "react";

const ProgressBar = memo(({ taskRequest }) => {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [completed, setCompleted] = useState(0); // 完成數量
  const [active, setActive] = useState(0); // 未完成數量

  // 計算進度條
  const calculatedProgress = useMemo(() => {
    if (!taskRequest || taskRequest.length === 0)
      return { taskRequest: 0, completed: 0, activeTasks: 0 };

    const completedTasks = taskRequest.filter(
      (task) => task.completed === "completed"
    ).length;
    const activeTasks = taskRequest.filter(
      (task) => task.completed === "active"
    ).length;

    return {
      taskRequest: ((completedTasks / taskRequest.length) * 100).toFixed(0),
      completed: completedTasks,
      activeTasks: activeTasks,
    };
  }, [taskRequest]);

  // 更新進度條和完成未完成
  useEffect(() => {
    if (calculatedProgress) {
      setProgressPercentage(calculatedProgress.taskRequest);
      setCompleted(calculatedProgress.completed);
      setActive(calculatedProgress.activeTasks);
    }
  }, [calculatedProgress]);

  return (
    <div className="w-full flex flex-col">
      <div className="ms-auto">
        <small className="text-primary_title text-xs">
          total {taskRequest?.length} / completed {completed} / undone {active}
        </small>
      </div>
      <div className="w-full flex items-center justify-center gap-2">
        <div className="mb-1 text-lg font-medium text-primary_title ">
          {progressPercentage}%
        </div>
        <div className="w-full h-4 my-auto bg-white rounded-full">
          <div
            className="h-4 bg-[#97AEF5] rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default ProgressBar;
