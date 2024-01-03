import { SignOutButton, UserButton, currentUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import Image from "next/image";

export default async function HeaderNav() {
  const user = await currentUser();
  return (
    <div className="flex flex-none h-12 align-middle justify-between mb-10 pt-6 text-sky-500">
      <Link href="/">
        <h2 className="text-2xl font-bold">Rent Easy</h2>
      </Link>
      <div className="flex flex-row gap-10">
        <Link href="/listing/verify">
          <button className="w-28 hover:text-sky-700">List New Item</button>
        </Link>
        <div className="h-6 w-6 border-1 rounded">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image alt={user.username} src={user.imageUrl} height={80} width={80} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                <Link href={"/products/seller/"+user.id}>
                  My Listings
                </Link>
                </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Manage Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton>Sign Out</SignOutButton>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
