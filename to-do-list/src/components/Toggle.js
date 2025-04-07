const Toggle = ({ toggle, handleToggle, children }) => {
  return (
    <div className="flex items-center justify-end w-full max-w-2xl  rounded-lg ">
      <span className=" text-sm font-medium text-secondary_content me-2">
        {children}
      </span>
      <label className="inline-flex items-center cursor-pointer justify-end">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={toggle}
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-0.5 after:start-[2px]   after:border after:rounded-full after:h-5 after:w-5 after:transition-all bg-white after:bg-[#CED2F5]  peer-checked:after:bg-white  peer-checked:bg-[#CED2F5] "></div>
      </label>
    </div>
  );
};

export default Toggle;
