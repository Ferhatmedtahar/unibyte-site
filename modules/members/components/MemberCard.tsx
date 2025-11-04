import { generateAvatar } from "@/modules/community/components/generateAvatar";

export default function MemberCard({
  member,
  index,
}: {
  readonly member: { name: string; role: string };
  readonly index: number;
}) {
  return (
    <div className="cursor-default flex items-center gap-3 rounded-lg min-w-[280px] sm:min-w-[320px] flex-shrink-0  border border-primary-100 transition-all duration-500 ease-out hover:shadow-lg hover:shadow-primary-500/20 hover:bg-gradient-to-br hover:from-primary-50 hover:to-indigo-100   lg:rounded-2xl p-2 lg:p-3 ">
      {generateAvatar(member.name, index)}
      <div className="flex flex-col items-start">
        <h3 className="text-sm sm:text-base font-semibold leading-tight text-primary-600">
          {member.name}
        </h3>
        <p className="text-xs sm:text-sm text-primary-500/85">{member.role}</p>
      </div>
    </div>
  );
}
