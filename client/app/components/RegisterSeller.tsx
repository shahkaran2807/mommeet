"use client";
import { User } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default function RegisterSeller({ user }: { user: User }) {
  const [registerSuccess, setRegisterSuccess] = useState({
    status: "uninitiated",
  });
  const registerSeller = () => {
    setRegisterSuccess({ status: "waiting" });
    const data = {
      name: (user.firstName || "") + (user.lastName || ""),
      email: user.emailAddresses.filter(
        (emailAddress) => emailAddress.id === user.primaryEmailAddressId
      )[0].emailAddress,
      user_id: user.id,
      username: user.username,
    };
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:${process.env.NEXT_PUBLIC_HOST_PORT}/api/listing/newseller`, {
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
          redirect("/listing/new/")
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
              onClick={registerSeller}
            >
              Registering as seller
            </span>
          ),
          failed: (
            <span
              className="text-sky-500 hover:text-sky-700 cursor-pointer"
              onClick={registerSeller}
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
