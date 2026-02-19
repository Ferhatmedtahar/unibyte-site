import MemberCard from "./MemberCard";

const MarqueeRow = ({
  members,
  direction = "left",
}: {
  members: Array<{ name: string; role: string }>;
  direction?: "left" | "right";
}) => {
  return (
    <div className="relative flex w-full overflow-hidden">
      <div
        className={`flex gap-2 ${
          direction === "left"
            ? "animate-[marquee-left_120s_linear_infinite]"
            : "animate-[marquee-right_120s_linear_infinite]"
        } hover:pause`}
        style={{
          width: "max-content",
        }}
      >
        {[...Array(4)].map((_, setIndex) =>
          members.map((member, i) => (
            <MemberCard key={`${setIndex}-${i}`} member={member} index={i} />
          )),
        )}
      </div>
      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-purple-50  to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-purple-50 to-transparent" />
    </div>
  );
};

export default MarqueeRow;
