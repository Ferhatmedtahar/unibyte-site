export const generateAvatar = (name: string, index: number) => {
  const styles = [
    "from-primary-400 to-primary-600 text-white",
    "from-primary-600 to-primary-800 text-gold-200",
    "from-gold-300 to-gold-500 text-primary-900",
    "from-primary-500 to-primary-700 text-gold-100",
    "from-primary-700 to-primary-900 text-gold-300",
    "from-gold-200 to-gold-400 text-primary-800",
  ];

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  const styleClass = styles[index % styles.length];

  return (
    <div
      className={`h-11 w-11 sm:h-12 sm:w-12 shrink-0 select-none rounded-full bg-gradient-to-br ${styleClass} flex items-center justify-center text-[0.8125rem] font-semibold tracking-wide ring-2 ring-transparent transition-[box-shadow] duration-300 group-hover:ring-gold-300`}
    >
      {initials}
    </div>
  );
};
