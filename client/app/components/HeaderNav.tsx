import {
  SignOutButton,
  UserButton,
  currentUser,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/nextjs";
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
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import Image from "next/image";
import SearchBox from "./SearchBox";

export default async function HeaderNav() {
  const user = await currentUser();
  return (
    <div>
      <div className="flex flex-none align-middle justify-between mb-3 lg:mb-10 pt-6 text-sky-500">
        <Link href="/">
          <h2 className="text-xl lg:text-2xl font-bold">Rent Easy</h2>
          <div>Roosevelt Island</div>
        </Link>
        <div className="hidden lg:block lg:flex-grow lg:mx-5">
          <SearchBox />
        </div>
        <div className="flex flex-row gap-10">
          <Link href="/listing/verify">
            <button className="w-28 hover:text-sky-700">List New Item</button>
          </Link>
          <div className="h-6 border-1 rounded">
            <SignedIn>
              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-6 w-6">
                      <Image
                        alt={user.username}
                        src={user.imageUrl}
                        height={80}
                        width={80}
                      />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                      <Link href={"/products/seller/" + user.id}>
                        My Listings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Manage Account</DropdownMenuItem>
                      <DropdownMenuItem>
                        <SignOutButton>Sign Out</SignOutButton>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </div>
      <div className="block mb-5 lg:hidden lg:mb-0">
        <SearchBox />
      </div>
    </div>
  );
}
