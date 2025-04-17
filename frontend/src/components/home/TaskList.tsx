import Task from "../Task";
import { TaskFace } from "../type/Task";
import { StatusFace } from "../type/Status";
import { RequestProps } from "../type/Request";

type Props = {
  tasks: TaskFace[];
  statuses: StatusFace[];
  onTaskRequest: ({ url, method, data }: RequestProps) => void;
  onStatusRequest: ({ url, method, data }: RequestProps) => void;
};

function TaskList({ tasks, statuses, onTaskRequest, onStatusRequest }: Props) {
  if (tasks.length === 0) {
    return <p className="mx-auto my-3 text-[#8794BF]">目前沒有任務</p>;
  }

  return (
    <section className="flex gap-4 flex-col my-5 overflow-y-auto max-h-[20rem]">
      {tasks.map((item) => {
        const matchedStatus = statuses.find(
          (status) => status.status === item.completed
        );
        const color = matchedStatus ? matchedStatus.color : "red";

        return (
          <Task
            key={item.id}
            statuses={statuses}
            onTaskRequest={onTaskRequest}
            onStatusRequest={onStatusRequest}
            content={item.content}
            status={item.completed}
            id={item.id}
            color={color}
          />
        );
      })}
    </section>
  );
}

export default TaskList;
