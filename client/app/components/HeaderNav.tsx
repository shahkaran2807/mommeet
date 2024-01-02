import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default async function HeaderNav() {
  return (
    <div className="flex flex-none h-12 align-middle justify-between mb-10 pt-6 text-sky-500">
      <Link href="/">
        <h2 className="text-2xl font-bold">Rent Easy</h2>
      </Link>
      <div className="flex flex-row gap-10">
        <Link href="/listing/verify">
          <button className="w-28 hover:text-sky-700">List New Item</button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
