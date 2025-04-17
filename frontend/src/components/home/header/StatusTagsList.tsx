import url from "../../../data/url.json";
import { ColorGroup } from "../../type/ColorGroup";
import { StatusFace } from "../../type/Status";
import { RequestProps } from "../../type/Request";
import IsConfirm from "../../model/IsConfirm";

interface Props {
  status: StatusFace[];
  onStatusRequest: (props: RequestProps) => void;
  onSetStatusFilter: (props: RequestProps) => void;
}

function StatusTagsList({ status, onStatusRequest, onSetStatusFilter }: Props) {
  const handleRemoveTag = (id: number, statusValue: string) => {
    IsConfirm({
      title: "是否確認刪除?",
      text: "相關任務也會跟著刪除",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        const deleteUrl = url.host + url.status.DELETE.replace("{id}", `${id}`);
        const filterUrl =
          url.host +
          url.task.DELETE_Status.replace("{status}", `${statusValue}`);

        onStatusRequest({ url: deleteUrl, method: "DELETE" });

        onSetStatusFilter({
          url: filterUrl,
          method: "GET",
          data: { status: statusValue },
        });
      }
    });
  };

  return (
    <>
      {status.map(({ id, status: statusValue, color }, index) => {
        const bgColor =
          ColorGroup[color as keyof typeof ColorGroup] || "bg-gray-200";

        return (
          <span
            key={index}
            className={`
              ${bgColor}
              relative inline-block mr-2 mb-2 group
              text-white px-3 py-1 pr-6 rounded-full
              text-sm font-medium
            `}
          >
            {statusValue}
            {id != 1 && id != 2 && (
              <button
                onClick={() => handleRemoveTag(id, statusValue)}
                className={`
                absolute top-0 right-0 translate-x-1/2 -translate-y-1/2
                w-4 h-4 text-xs rounded-full bg-white text-gray-700
                flex items-center justify-center
                opacity-0 group-hover:opacity-100 transition-opacity
                cursor-pointer
              `}
                aria-label="Remove tag"
              >
                ×
              </button>
            )}
          </span>
        );
      })}
    </>
  );
}

export default StatusTagsList;
