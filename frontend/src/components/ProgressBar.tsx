interface ProgressBarProps {
  progressPercentage: number;
}

function ProgressBar({ progressPercentage }: ProgressBarProps) {
  return (
    <div className=" flex items-center justify-center gap-2">
      <div className="mb-1 text-lg font-medium text-[#8794BF] ">
        {progressPercentage.toFixed(0)}%
      </div>
      <div className="w-full h-4 my-auto bg-white rounded-full">
        <div
          className="h-4 bg-[#97AEF5] rounded-full"
          style={{ width: `${progressPercentage.toFixed(0)}%` }}
        ></div>
      </div>
    </div>
  );
}
export default ProgressBar;
