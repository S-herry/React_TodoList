import { StatusFace } from "../../type/Status";

interface Props {
  status: StatusFace[];
  statusFilter: string;
  onSetStatusFilter: (props: { val: string }) => void;
}

function StatusFilterDropdown({
  status,
  statusFilter,
  onSetStatusFilter,
}: Props) {
  return (
    <select
      name="statusFilter"
      id="statusFilter"
      value={statusFilter}
      onChange={(e) => onSetStatusFilter({ val: e.target.value })}
      className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="0" className="px-2">
        all
      </option>
      {status.map((item, index) => (
        <option key={index} value={item.status} className="px-2">
          {item.status}
        </option>
      ))}
    </select>
  );
}

export default StatusFilterDropdown;
