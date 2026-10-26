import Button from "@/common/Button";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-paper text-center px-4">
      <h1 className="text-gradient font-bold tracking-[-0.06em] leading-none text-[clamp(7rem,24vw,16rem)]">
        404
      </h1>
      <p className="mt-2 mb-8 text-lg md:text-xl text-primary-600/80">
        The page you are looking for does not exist
      </p>
      <Button href="/">Go back home</Button>
    </div>
  );
}
