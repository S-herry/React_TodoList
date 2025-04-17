function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute cursor-pointer top-2 right-2 text-xl font-bold text-black"
    >
      X
    </button>
  );
}

export default CloseButton;
