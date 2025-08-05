export const generateAvatar = (name: string, index: number) => {
  const colors = [
    "bg-green-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-red-500",
    "bg-teal-500",
    "bg-cyan-500",
  ];

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const colorClass = colors[index % colors.length];

  return (
    <div
      className={`h-12 w-12 rounded-full ${colorClass} flex items-center justify-center text-white font-semibold text-sm`}
    >
      {initials}
    </div>
  );
};
