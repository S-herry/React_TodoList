import { useEffect, useRef } from "react";
import { TaskFace } from "./type/Task";
import { RequestProps } from "./type/Request";

interface TaskAddProps {
  url: string;
  onRequest: ({ url, method, data }: RequestProps) => void;
  tasks: TaskFace[];
}

function AddTask({ url, tasks, onRequest }: TaskAddProps) {
  const taskInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (taskInput.current) {
      taskInput.current.value = "";
    }
  }, [tasks]);

  function onAddTask() {
    const content = taskInput.current?.value?.trim();
    if (!content) return;

    onRequest({
      url,
      method: "POST",
      data: { content },
    });
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") onAddTask();
  }

  return (
    <>
      <div className="flex items-center justify-between text-[#8794BF]">
        Add to list
      </div>
      <div className="flex flex-col  ">
        <div className="relative w-full  rounded-lg overflow-hidden">
          <input
            ref={taskInput}
            onKeyDown={onKeyDown}
            className="block p-2.5 w-full z-20  text-sm text-gray-900 bg-gray-50 focus:ring-blue-500 focus:outline-none "
          />
          <button
            onClick={onAddTask}
            className="absolute cursor-pointer font-bold text-3xl top-0 end-0 w-12 h-full  text-white bg-[#7f91bc] hover:bg-[#7f91bc] focus:outline-none "
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}

export default AddTask;
