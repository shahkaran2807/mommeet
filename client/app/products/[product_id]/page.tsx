"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
// import { useSearchParams } from "next/navigation";
import { ProductData } from "../category/[slug]/page";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import useSWR from "swr";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());

export default function Page({ params }: { params: { product_id: string } }) {
  let productData: ProductData;
  let usingSearchParams = false;
  //   if (
  //     searchParams.has("product_id") &&
  //     searchParams.has("name") &&
  //     searchParams.has("price") &&
  //     searchParams.has("category") &&
  //     searchParams.has("description") &&
  //     searchParams.has("seller_user_id") &&
  //     searchParams.has("images")
  //   ) {
  //     usingSearchParams = true;
  //     productData = {
  //       product_id: searchParams.get("product_id"),
  //       name: searchParams.get("name"),
  //       price: parseInt(searchParams.get("price")),
  //       category: searchParams.get("category"),
  //       description: searchParams.get("description"),
  //       seller_user_id: searchParams.get("seller_user_id"),
  //       images: searchParams.getAll("images"),
  //     };
  //   } else {
  // }
  const { data, error, isLoading, isValidating } = useSWR<ProductData[]>(
    "http://localhost:5000/api/product/" + params.product_id,
    fetcher
  );

  return (
    <div>
      <div className="flex flex-row gap-12">
        <div className="w-2/4">
          <Carousel>
            <CarouselContent>
              {!isLoading ? (
                data[0].images.map((image, idx) => {
                  return (
                    <CarouselItem key={image + idx}>
                      <img src={image} />
                    </CarouselItem>
                  );
                })
              ) : (
                <LoadingSpinner />
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {!isLoading ? (
          <div>
            <div className="text-2xl font-extrabold">{data[0].name}</div>
            <div className="text-xs text-slate-400 mb-2">
              {data[0].product_id}
            </div>
            <div className="mb-6">{data[0].description}</div>
            <div className="text-4xl font-semibold">
              {"$" + data[0].price + "/day"}
            </div>
            <div className="text-sm">
              Original Price: {"$" + data[0].price}
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
