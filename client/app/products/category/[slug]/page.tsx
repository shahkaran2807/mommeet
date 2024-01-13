"use client"
import SideBar from "../../../components/SideBar";
import useSWR from "swr";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import ProductsShowcase from "@/app/components/ProductsShowcase";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

// const urlEndpoint = "https://ik.imagekit.io/m3c9xvobb";

export type ProductData = {
  product_id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  seller_user_id: string;
  images: string[];
  listing_price: number;
  unavailable_dates: string[];
  on_hold?: boolean;
};

export default function Page({ params }: { params: { slug: string } }) {
  let url = "";
  if (params.slug != "all") {
    url = "/" + params.slug;
  }
  const { data, error, isLoading, isValidating } = useSWR(
    `${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/products/${url}`,
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
            <ProductsShowcase data={data} allowProductEdit={false} />
          </div>
        </div>
      )}
    </div>
  );
}
