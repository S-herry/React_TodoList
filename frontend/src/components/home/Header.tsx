import { useState } from "react";
import SettingModel from "../model/SettingModel";
import url from "../../data/url.json";
import { RequestProps } from "../type/Request";
import { StatusFace } from "../type/Status";
import StatusFilterDropdown from "./header/StatusFilterDropdown";
import StatusTagsList from "./header/StatusTagsList";
import ColorPicker from "./header/ColorPicker";

interface HeaderProps {
  status: StatusFace[];
  statusFilter: string;
  onSetStatusFilter: (props: { val: string }) => void;
  onStatusRequest: (props: RequestProps) => void;
}

function Header({
  status = [],
  statusFilter,
  onSetStatusFilter,
  onStatusRequest,
}: HeaderProps) {
  const [newStatus, setNewStatus] = useState({
    status: "",
    color: "",
  }); // 用來存儲新增狀態的 input
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onOpenModal() {
    setIsModalOpen(true);
  }
  function onCloseModal() {
    setIsModalOpen(false);
  }

  function onStatusChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewStatus((prev) => ({
      ...prev,
      status: e.target.value,
    }));
  }
  function onAddStatus() {
    const path = url.host + url.status.GET;
    if (newStatus.status.trim()) {
      onStatusRequest({
        url: path,
        method: "POST",
        data: newStatus,
      });

      setNewStatus({ status: "", color: "" });
      onCloseModal();
    }
  }

  return (
    <header className="flex items-center justify-between  rounded-lg">
      <div>
        <h1 className="text-[#8794BF] text-3xl  font-bold">Todo List</h1>
        <span className="text-[#97A3BC]/75 text-sm">Add things to do</span>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col p-2">
          <StatusFilterDropdown
            onSetStatusFilter={onSetStatusFilter}
            status={status}
            statusFilter={statusFilter}
          />
        </div>

        <SettingModel
          onOpenModal={onOpenModal}
          onCloseModal={onCloseModal}
          isOpen={isModalOpen}
          label="自訂狀態"
          className="bg-red-300"
        >
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Current Status
            </label>
            <div className="flex gap-3 flex-wrap">
              <StatusTagsList status={status} />
            </div>
          </div>

          <div className="mb-6">
            <label
              htmlFor="newStatus"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Add New Status
            </label>
            <input
              id="newStatus"
              type="text"
              value={newStatus.status}
              onChange={onStatusChange}
              placeholder="Enter new status"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="newStatus"
              className="block text-lg font-medium text-gray-700 mb-2"
            >
              Select Color
            </label>
            <section
              className="flex gap-4"
              onChange={(e) => {
                const target = e.target as HTMLInputElement;
                if (target.name === "color") {
                  setNewStatus((prev) => ({
                    ...prev,
                    color: target.id,
                  }));
                }
              }}
            >
              <ColorPicker
                selectedColor={newStatus.color}
                onColorChange={(color) =>
                  setNewStatus((prev) => ({ ...prev, color }))
                }
              />
            </section>
          </div>

          <button
            onClick={onAddStatus}
            className="bg-[#9dade1] text-white cursor-pointer py-3 px-4 rounded-lg  hover:bg-[#8592ba] transition duration-300"
          >
            Add Status
          </button>
        </SettingModel>
      </div>
    </header>
  );
}

export default Header;
