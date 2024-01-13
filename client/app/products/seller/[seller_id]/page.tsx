"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import useSWR from "swr";
import SideBar from "@/app/components/SideBar";
import ProductsShowcase from "@/app/components/ProductsShowcase";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

export default function Page({ params }: { params: { seller_id: string } }) {
  const dataSource = `${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/listing/${params.seller_id}`;
  const { data, error, isLoading, isValidating } = useSWR(
    dataSource,
    fetcher
  );
  const { isLoaded, isSignedIn, user } = useUser();
  const [editFlag, setEditFlag] = useState(false)

  useEffect(() => {
    if (isLoaded && user) {
      if (params.seller_id === user.id) {
        setEditFlag(true)
      }
    }
  }, [user, isLoaded]);
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
            {data.error ? (
              <div>{data.error}</div>
            ) : (
              <div>
                <p className="pb-6 text-xs">
                  {data.seller[0].name}&apos;s products
                </p>
                <ProductsShowcase data={data.products} allowProductEdit={editFlag} dataAPISource={dataSource} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
