"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";
import SellerForm from "./SellerForm/SellerForm";

export default function RegisterSeller({ user }: { user: any }) {
  const [registerSuccess, setRegisterSuccess] = useState({
    status: "uninitiated",
  });
  const router = useRouter();
  const registerSeller = (phoneNumber: string, address: string) => {
    setRegisterSuccess({ status: "waiting" });
    const data = {
      name: (user.firstName || "") + (user.lastName || ""),
      email: user.emailAddresses.filter(
        (emailAddress: any) => emailAddress.id === user.primaryEmailAddressId
      )[0].emailAddress,
      user_id: user.id,
      username: user.username,
      phonenumber: phoneNumber,
      address: address
    };
    fetch(`${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/listing/newseller`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.done) {
          setRegisterSuccess({ status: "done" });
          router.push("/listing/new/");
        } else {
          setRegisterSuccess({ status: "failed" });
        }
      })
      .catch((err) => console.error(err));
  };
  return (
    <div>
     
      {
        {
          uninitiated: (
            <span
              className="text-sky-500 hover:text-sky-700 cursor-pointer"
            >
               <SellerForm onSubmit={registerSeller}/>
            </span>
          ),
          failed: (
            <span
              className="text-sky-500 hover:text-sky-700 cursor-pointer"
              onClick={registerSeller as any}
            >
              Try Again
            </span>
          ),
          done: <div>Done. Redirecting</div>,
          waiting: <div><LoadingSpinner />Waiting</div>,
        }[registerSuccess.status]
      }
    </div>
  );
}
