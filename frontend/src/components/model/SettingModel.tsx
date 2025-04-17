import { ReactNode } from "react";

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
          className="fixed inset-0 bg-black/50  flex items-center justify-center z-50"
          onClick={onCloseModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-1/3 relative"
            onClick={(e) => e.stopPropagation()} // 防止點擊 modal 內部關閉
          >
            {/* Close button (X) */}
            <button
              onClick={onCloseModal}
              className="absolute cursor-pointer top-2 right-2 text-xl font-bold text-black"
            >
              X
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default SettingModel;
