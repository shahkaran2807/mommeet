"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProductData } from "../category/[slug]/page";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());

export default function Page({ params }: { params: { product_id: string } }) {
  const { isSignedIn, user, isLoaded } = useUser();

  const [phoneNumber, setPhoneNumber] = useState("");

  const { data, error, isLoading, isValidating } = useSWR<ProductData[]>(
    `/api/product/` + params.product_id,

    fetcher
  );

  useEffect(() => {
    if (data && !isLoading) {
      // The first request is successfully completed
      // Now, make the second request here
      const sellerData = async () => {
        try {
          // Replace with your second request logic
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/sellerinfo/` +
              data[0].seller_user_id
          );
          const result = await response.json();
          setPhoneNumber(result[0].phonenumber);
        } catch (error) {
          // Handle any errors from the second request
          console.error("Error in seller request:", error);
        }
      };

      sellerData();
    }
  }, [data, isLoading]);

  const [selectedDates, setSelectedDates] = useState<Date[]>();

  const handleWhatsAppRedirect = () => {
    if (isLoaded) {
      const encodedPhoneNumber = encodeURIComponent(
        phoneNumber.replace(/[\s\-\[\]()]/g, "")
      );
      const message = `Hi! I am ${
        user.firstName
      }, I'm interested in renting out your ${
        data[0].name
      } for dates ${selectedDates.map(
        (date) => date.toLocaleString().split(",")[0]
      )}. Please let me know the best time for pickup. Thanks!`;
      const chatLink = `https://wa.me/${encodedPhoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.location.href = chatLink;
    }
  };

  return (
    <div>
      {!isLoading && data && (  
        <Alert variant="destructive" className={"mb-10 "+(data[0].on_hold ? "" : "hidden")}>
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            This item is held from listing. You cannot rent is currently.
          </AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col md:flex-row md:gap-12">
        <div className="mb-24 md:w-2/4">
          <Carousel>
            <CarouselContent>
              {!isLoading && data ? (
                data[0].images.map((image, idx) => {
                  return (
                    <CarouselItem
                      key={image + idx}
                      className="w-96 h-80 rounded border"
                    >
                      <img src={image} className="object-cover" />
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
        {!isLoading && data ? (
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
            <div className="text-sm mb-5">
              Original Price: {"$" + data[0].price}
            </div>
            <div>
              Listed By:{" "}
              <Link
                href={"/products/seller/" + data[0].seller_user_id}
                className="text-sky-500"
              >
                {data[0].seller_user_id}
              </Link>
            </div>
            <div className="mt-12">
              <div>
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => {
                    setSelectedDates(dates);
                  }}
                  disabled={(date) => {
                    return (
                      date < new Date() ||
                      data[0].unavailable_dates.some(
                        (unavailable_date) =>
                          unavailable_date.slice(0, 10) ==
                          date.toISOString().slice(0, 10)
                      )
                    );
                  }}
                  className="rounded-md border w-64"
                />
              </div>
              <small className="block">Please select your rental dates</small>
            </div>

            <div className="container mx-auto my-4">
              <Button
                className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold"
                onClick={handleWhatsAppRedirect}
                disabled={data[0].on_hold}
              >
                Request on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
