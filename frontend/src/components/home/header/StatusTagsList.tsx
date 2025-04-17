import { ColorGroup } from "../../type/ColorGroup";
import { StatusFace } from "../../type/Status";

interface Props {
  status: StatusFace[];
}

function StatusTagsList({ status }: Props) {
  return (
    <>
      {status?.map((item, index) => {
        const color =
          ColorGroup[item.color as keyof typeof ColorGroup] || "bg-gray-200";
        return (
          <span
            key={index}
            className={`${color} text-white px-3 py-1 rounded-full text-sm font-medium`}
          >
            {item.status}
          </span>
        );
      })}
    </>
  );
}

export default StatusTagsList;
