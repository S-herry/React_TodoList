import { useEffect, useRef, memo } from "react";
/* 全部任務 */
const AllTask = memo(({ isAddTask = false, children }) => {
  useEffect(() => {
    if (taskContainerRef.current) {
      taskContainerRef.current.scrollTop =
        taskContainerRef.current.scrollHeight;
    }
  }, [isAddTask]);

  const taskContainerRef = useRef(null);

  return (
    <div
      ref={taskContainerRef}
      className="flex flex-col justify-start pe-4 gap-4 max-h-72 overflow-y-auto  
      [&::-webkit-scrollbar]:w-2 
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[#97AEF5] pt-2"
    >
      {children}
    </div>
  );
});

export default AllTask;
