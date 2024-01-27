"use client";
import ProductsShowcase from "@/app/components/ProductsShowcase";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

export default function Page({ params }: { params: { search_term: string } }) {
  const [searchData, setSearchData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/products/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search_term: params.search_term }),
    })
      .then((res) => res.json())
      .then((res) => setSearchData(res));
  }, []);
  return (
    <div>
      <div className="grow flex flex-row">
        <div className="hidden sm:block">{/* <SideBar /> */}</div>
        <div>
          <p className="pb-6 text-slate-500 text-xl">
            <b>Search Results for: {params.search_term}</b>
          </p>
          <ProductsShowcase data={searchData} allowProductEdit={false} />
        </div>
      </div>
    </div>
  );
}
