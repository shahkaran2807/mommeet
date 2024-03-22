"use client";
import Link from "next/link";
import Image from 'next/image';

import { useRouter } from "next/navigation";

const categories = [
  {
    link: "strollers",
    description: "Strollers",
    image:"/assets/strollers.png",
  },
  {
    link: "gear",
    description: "Baby Gear",
    image:"/assets/gear.png",
  },
  {
    link: "clothes",
    description: "clothes",
    image:"/assets/clothes.png",
  },
  {
    link: "accessories",
    description: "Accessories",
    image:"/assets/accessories.png",
  },
];
export default function Home() {
  // const router = useRouter();
  // router.push("/listing/verify")
  return (
    <main className="flex flex-wrap gap-10 lg:gap-15">
      {categories.map((category, idx) => {
        return (
          <Link
            key={category.link + idx}
            href={"/products/category/" + category.link}
          >
            {/* <div className="flex flex-col w-80 hover:text-sky-500 hover:font-bold hover:cursor-pointer lg:w-100"> */}
              {/* <div className="h-36 bg-slate-300 rounded"></div> */}
               <img
                src={category.image}
                alt={category.description}
                // className="h-36 bg-slate-300 rounded-t-lg object-cover"
                width={320}
                height={180}
              />
              {/* <div className="text-center text-slate-500"><b>{category.description}</b></div> */}
            {/* </div> */}
          </Link>
        );
      })}
      {/* <Link href="/products/category/all">
        <div className="border rounded-lg shadow flex flex-col w-80 hover:text-sky-500 hover:font-bold hover:cursor-pointer lg:w-100">
          <div className="h-36 bg-slate-300 rounded"></div>
          <img
                src={"/assets/all.jpeg"}
                alt={"all products"}
                className="h-36 bg-slate-300 rounded-t-lg object-cover"
                width={320}
                height={180}
              />
          <div className="text-center text-slate-500"><b>All</b></div>
        </div>
      </Link> */}
      
    </main>
  );
}
