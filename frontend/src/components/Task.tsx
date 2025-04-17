import { useState } from "react";
import PencilIcon from "./svg/PencilIcon";
import SettingModel from "./model/SettingModel";
import url from "../data/url.json";
import { ColorGroup } from "./type/ColorGroup";
import { TaskProps } from "./type/Task";

function Task({
  onTaskRequest,
  onStatusRequest,
  status,
  statuses = [],
  content,
  color,
  id,
}: TaskProps) {
  const DELETE = url.host + url.task.DELETE.replace("{id}", `${id}`);
  const PUT = url.host + url.task.PUT.replace("{id}", `${id}`);
  const [currentStatus, setCurrentStatus] = useState(status);
  const [changeContent, setChangeContent] = useState(false);
  const [currentContent, setCurrentContent] = useState(content);
  const [isModalOpen, setIsModalOpen] = useState(false);
  function onOpenModal() {
    setIsModalOpen(true);
  }
  function onCloseModal() {
    setIsModalOpen(false);
  }

  function handleStatusChange(status: string) {
    if (status.trim() == "") {
      return;
    }
    setCurrentStatus(status);
    onStatusRequest({
      url: PUT,
      method: "PUT",
      data: {
        completed: status,
      },
    });
    onCloseModal();

    setTimeout(() => {
      onTaskRequest({ url: url.host + url.task.GET, method: "GET" });
    }, 10);
  }
  function onPutTask() {
    if (currentContent.trim() == "") {
      return;
    }
    setChangeContent(!changeContent);
    if (changeContent) {
      onStatusRequest({
        url: PUT,
        method: "PUT",
        data: {
          completed: status,
          content: currentContent,
        },
      });
    }
  }
  const className =
    ColorGroup[color as keyof typeof ColorGroup] || "bg-gray-200";
  return (
    <div className="flex min-h-14 rounded-md overflow-hidden border">
      <div className="bg-[#8794BF] w-2"> </div>
      <SettingModel
        onOpenModal={onOpenModal}
        onCloseModal={onCloseModal}
        isOpen={isModalOpen}
        label={currentStatus}
        className={className}
      >
        <div className="flex gap-1 me-3 justify-center flex-wrap">
          {statuses.map((status) => (
            <button
              key={status.id}
              onClick={() => handleStatusChange(status.status)}
              className={`text-sm px-2 py-1 rounded-md border ${
                currentStatus === status.status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status.status}
            </button>
          ))}
        </div>
      </SettingModel>
      <input
        type="text"
        value={currentContent}
        onChange={(e) => setCurrentContent(e.target.value)}
        name="content"
        id="content"
        className={`my-auto px-3 mx-2 w-full ${changeContent ? "border" : ""}`} // border
        disabled={!changeContent}
      />

      <PencilIcon onClick={onPutTask} />
      <button
        onClick={() => onTaskRequest({ url: DELETE, method: "DELETE" })}
        className="ms-auto hover:text-red-500 cursor-pointer p-3"
      >
        X
      </button>
    </div>
  );
}
export default Task;
