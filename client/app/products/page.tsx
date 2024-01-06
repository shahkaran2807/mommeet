"use client";
import useSWR from "swr";
import SideBar from "../components/SideBar";
import { ProductData } from "./category/[slug]/page";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

export default function Products() {
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/products`,
    fetcher
  );
  return (
    <div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grow flex flex-row">
          <div className="hidden sm:block">
            <SideBar />
          </div>
          <div>
            <p className="pb-6 text-xs">All products</p>
            <div className="flex gap-10 flex-wrap">
              {data.map((item: ProductData, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex flex-col shrink-0 w-64 md:w-36"
                  >
                    <div className="h-36 bg-slate-300 rounded"></div>
                    <div>{item.name}</div>
                    <div>{item.product_id}</div>
                    <div>{"$" + item.price}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
