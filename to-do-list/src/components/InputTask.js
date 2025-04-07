import { useRef } from "react";

/* 輸入框 */
const InputTask = ({ addTask }) => {
  const taskInput = useRef(null);

  async function HandleAddTask() {
    const task = taskInput.current.value.trim(); // 取得內容並去除空白
    if (task === "") return;
    taskInput.current.value = "";
    addTask(task);
  }
  return (
    <>
      <div className="flex items-center justify-between text-secondary_content">
        Add to list
      </div>
      <div className="flex flex-col ">
        <div className="relative w-full  rounded-lg overflow-hidden">
          <input
            ref={taskInput}
            className="block p-2.5 w-full z-20  text-sm text-gray-900 bg-gray-50 focus:ring-blue-500 focus:outline-none "
          />
          <button
            onClick={HandleAddTask}
            className="absolute font-bold text-3xl top-0 end-0 w-12 h-full  text-white bg-secondary   hover:bg-[#7f91bc] focus:outline-none "
          >
            +
          </button>
        </div>
      </div>
    </>
  );
};

export default InputTask;
