import { generateAvatar } from "@/modules/community/components/generateAvatar";

export default function MemberCard({
  member,
  index,
}: {
  readonly member: { name: string; role: string };
  readonly index: number;
}) {
  return (
    <div className="group cursor-default flex items-center gap-3.5 rounded-2xl w-[272px] sm:w-[300px] flex-shrink-0 p-3 bg-primary-100/70 transition-colors duration-300 hover:bg-primary-200/60">
      {generateAvatar(member.name, index)}
      <div className="flex flex-col items-start min-w-0">
        <h3 className="w-full truncate text-sm sm:text-[0.9375rem] font-semibold leading-tight tracking-[-0.01em] text-primary-900">
          {member.name}
        </h3>
        <p className="w-full truncate mt-0.5 text-xs sm:text-[0.8125rem] text-primary-700/80 transition-colors duration-300 group-hover:text-primary-800">
          {member.role}
        </p>
      </div>
    </div>
  );
}
