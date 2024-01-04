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
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import Image from "next/image";

const fetcher = (...args: any) => fetch.apply(null, args).then((res) => res.json());

export default function Page({ params }: { params: { product_id: string } }) {
  const { data, error, isLoading, isValidating } = useSWR<ProductData[]>(
    `${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/product/` + params.product_id,
    fetcher
  );

  const [selectedDates, setSelectedDates] = useState<Date[]>();

  return (
    <div>
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="mb-24 md:w-2/4">
          <Carousel>
            <CarouselContent>
              {!isLoading ? (
                data[0].images.map((image, idx) => {
                  return (
                    <CarouselItem
                      key={image + idx}
                      className="w-96 h-80 rounded border"
                    >
                      <Image alt={image} src={image} className="object-cover" fill={true}/>
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
            <div className="mb-6 max-h-36 w-96 overflow-y-auto">
              {data[0].description}
            </div>
            <div className="text-4xl font-semibold">
              {"$" + data[0].listing_price + "/day"}
            </div>
            <div className="text-sm mb-5">Original Price: {"$" + data[0].price}</div>
            <div>Listed By: <Link href={"/products/seller/"+data[0].seller_user_id} className="text-sky-500">{data[0].seller_user_id}</Link></div>
            <div className="mt-12">
              <div>
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  disabled={(date) => {
                    return date < new Date() ||
                      data[0].unavailable_dates.includes(date.toISOString())
                  }}
                  className="rounded-md border w-64"
                />
              </div>
              <small className="block">
                Please enter the dates when the item will not be available.
              </small>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
