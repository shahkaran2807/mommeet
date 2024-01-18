import Link from "next/link";
import Image from "next/image";
import { ProductData } from "../products/category/[slug]/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import useSWR, { useSWRConfig } from "swr";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ProductsShowcase({
  data,
  allowProductEdit,
  dataAPISource,
}: {
  data: any[];
  allowProductEdit?: boolean;
  dataAPISource?: string;
}) {
  const { mutate } = useSWRConfig();
  const [settingHold, setSettingHold] = useState("none");
  const setHold = (toggle: boolean, product_id: string) => {
    setSettingHold(product_id);
    fetch(`${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/listing/update/hold`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ set_hold: toggle, product_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.done) {
          // show sonner
          toast(
            toggle
              ? "Item has been held from listing"
              : "Listing hold has been removed from the item"
          );
          setSettingHold("none");
          mutate(dataAPISource);
        } else {
        }
      });
  };

  const deleteItem = (product_name: string, product_id: string) => {
    fetch(`${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/listing/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.done) {
          // show sonner
          toast("Item " + product_name + "deleted");
          mutate(dataAPISource);
        }
      });
  };

  return (
    <div className="flex gap-10 flex-wrap">
      {data.map((item: ProductData, idx: number) => {
        return (
          <div key={idx} className="flex flex-col shrink-0 w-90 md:w-64">
            <Card className="w-full hover:font-bold hover:cursor-pointer">
              <Link href={"/products/"+item.product_id}>
                <CardHeader>
                  <div className="w-54 h-24 overflow-hidden mb-5">
                    {item.images && (
                      <Image
                        className=""
                        src={item?.images[0]}
                        alt={item.name}
                        width={200}
                        height={100}
                      />
                    )}
                  </div>
                  {!item.images && (
                    <div className="h-36 bg-slate-300 rounded"></div>
                  )}
                  <CardTitle>
                    <div className="text-xl">{item.name}</div>
                  </CardTitle>
                  <CardDescription>
                    <div className="text-lg">{"$" + item.listing_price}</div>
                    {/* <div className="text-sm italic">
                      Valued at: {"$" + item.price}
                    </div> */}
                    {item.on_hold?<div className="text-amber-500">Unavailable</div>:<div></div>}
                  </CardDescription>
                </CardHeader>
              </Link>
              {allowProductEdit && (
                <CardFooter className="flex gap-2 flex-col">
                  <div className="flex gap-2 flex-row items-strech w-full">
                    <div className="w-1/2">
                      <Button className="w-full">
                        <Link href={`/products/edit/${item.product_id}`}>
                          Edit
                        </Link>
                      </Button>
                    </div>
                    <div className="w-1/2">
                      <Button
                        variant="outline"
                        onClick={() => setHold(!item.on_hold, item.product_id)}
                        className={
                          "w-full " +
                          (item.on_hold ? "text-amber-500" : "text-em")
                        }
                      >
                        <div
                          className={
                            settingHold === item.product_id ? "" : "hidden"
                          }
                        >
                          <ReloadIcon className="animate-spin mr-2" />
                        </div>
                        {item.on_hold ? "On" : ""} Hold
                      </Button>
                    </div>
                  </div>
                  <div className="w-full">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="w-full">
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Confirm Delete</DialogTitle>
                          <DialogDescription>
                            Please confirm if you want to delete item{" "}
                            {item.name}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              variant="destructive"
                              onClick={() =>
                                deleteItem(item.name, item.product_id)
                              }
                            >
                              Confirm
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="secondary">Cancel</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              )}
            </Card>
          </div>
        );
      })}
    </div>
  );
}
