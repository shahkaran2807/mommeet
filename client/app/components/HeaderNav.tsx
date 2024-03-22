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
    <div className="mb-10">
      <div className="flex flex-none align-middle justify-between mb-3 pt-6 text-red-300">
        <Link href="/">
          <h2 className="text-xl lg:text-2xl font-bold">MomMeet</h2>
        </Link>
        <div className="hidden lg:block lg:flex-grow lg:mx-5">
          <SearchBox />
        </div>
        <div className="flex flex-row gap-10">
          <Link href="/listing/verify">
            <button className="w-28 hover:text-red-300">List New Item</button>
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
      <div className="flex lg:flex-row flex-col lg:gap-10 text-red-300 bg-gray-100 p-3 justify-center items-center">
        <Link href="/aboutus#how-does-it-work">
          How Does MomMeet Work?
        </Link>
        <Link href="/aboutus" className="hover:text-gray-300">
          About Us
        </Link>
        <Link href="/aboutus#contact-us" className="hover:text-gray-300">
          Contact Us
        </Link>
        <Link
          href={"/aboutus#what-to-rent-header"}
          className="hover:text-gray-300"
        >
          Confused what to rent?
        </Link>
      </div>
    </div>
  );
}
