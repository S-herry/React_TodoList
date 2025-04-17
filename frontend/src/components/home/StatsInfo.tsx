function StatsInfo({ total, completed }: { total: number; completed: number }) {
  const undone = total - completed;

  return (
    <div className="text-sm text-[#8794BF] ms-auto">
      <span>total {total} / </span>
      <span>completed {completed} / </span>
      <span>undone {undone}</span>
    </div>
  );
}

export default StatsInfo;
