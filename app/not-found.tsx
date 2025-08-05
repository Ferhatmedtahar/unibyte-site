"use client";

import Button from "@/common/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-primary-700">404</h1>
      <p className="mt-4 text-lg text-primary-700 mb-4 ">
        The page you are looking for does not exist
      </p>
      <Button>
        {" "}
        <Link href="/"> Go back home</Link>
      </Button>
    </div>
  );
}
