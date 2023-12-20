import { UserButton } from "@clerk/nextjs";

export default function HeaderNav() {
    return (
        <div className="flex flex-none h-12 align-middle justify-between mb-10 pt-6 text-sky-500">
            <h2 className="text-2xl font-bold">Rent Easy</h2>
            <div className="flex flex-row gap-10">
                <button className="w-28 hover:text-sky-700">List New Item</button>
                <UserButton afterSignOutUrl="/"/>
            </div>
        </div>
    )
}