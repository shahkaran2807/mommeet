"use client"
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import { ProductData } from "../../category/[slug]/page";
import { useEffect, useState } from "react";
import ListItem from "@/app/components/ListItem";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

export default function Page({ params }: { params: { product_id: string } }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const { data, error, isLoading, isValidating } = useSWR<ProductData[]>(
    `/api/product/` + params.product_id,
    fetcher
  );
  const [canEdit, setCanEdit] = useState("uninitiated");

  const getProductDetails = (data: any) => {
    return {
      product_id: data[0].product_id,
      name: data[0].name,
      price: data[0].price,
      category: data[0].category,
      description: data[0].description,
      seller_user_id: data[0].seller_user_id,
      images: data[0].images,
      listing_price: data[0].listing_price,
      unavailable_dates: data[0].unavailable_dates,
    };
  };

  useEffect(() => {
    if (data && !isLoading && isLoaded) {
      if (data[0].seller_user_id === user.id) {
        setCanEdit("done");
      } else {
        setCanEdit("failed")
      }
    }
  }, [data, isLoading, isLoaded]);
  return (
    <div>
      {
          {
            uninitiated: (
              <div>
                <LoadingSpinner />
                Verifying your seller status...
              </div>
            ),
            failed: (
              <div>
                <div>You cannot edit this product</div>
              </div>
            ),
            done: <div>{data && <ListItem product_details={getProductDetails(data)} />}</div>
          }[canEdit]
        }
    </div>
  );
}
