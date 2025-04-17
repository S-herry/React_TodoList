
function PencilIcon(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        // className="hover:bg-red-400"
        className="w-6 text-black hover:text-red-500 cursor-pointer"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.123 19.59a2.25 2.25 0 01-.796.53l-4.052 1.508 1.508-4.052a2.25 2.25 0 01.53-.796L16.862 3.487z"
        />
      </svg>
    </button>
  );
}

export default PencilIcon;
