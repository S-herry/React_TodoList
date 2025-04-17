import { ReactNode } from "react";
import CloseButton from "../CloseButton";

function SettingModel({
  label,
  children,
  className,
  onOpenModal,
  onCloseModal,
  isOpen,
}: {
  children: ReactNode;
  label: string;
  className?: string;
  onOpenModal: () => void;
  onCloseModal: () => void;
  isOpen: boolean;
}) {
  return (
    <>
      <button
        onClick={onOpenModal}
        className={`${className} px-2 py-1 cursor-pointer text-white rounded-sm my-auto ms-2 `}
      >
        {label}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed  inset-0 bg-black/50  flex items-center justify-center z-50"
          onClick={onCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3 max-md:w-2/3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onCloseModal} />
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default SettingModel;
