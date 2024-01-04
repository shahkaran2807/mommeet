"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import RegisterSeller from "@/app/components/RegisterSeller";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fetcher = (...args: any) =>
  fetch.apply(null, args).then((res) => res.json());
export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  
  if (isLoaded) {
    const { data, error, isLoading, isValidating } = useSWR(
      `http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/listing/verify/${user.id}`,
      fetcher
      );
      const [verifySuccess, setVerifySuccess] = useState({
        status: "uninitiated",
      });
    useEffect(() => {
      if (!data) {
        setVerifySuccess({status: "waiting"})
      } else if (data && data.decision === true) {
        setVerifySuccess({status: "done"})
        router.push("/listing/new/");
      } else if (data && data.decision === false) {
        setVerifySuccess({status: "failed"})
      }
    }, [isLoading]);
    return (
      <div>
        {/* {isLoading ? (
          <div><LoadingSpinner />Verifying your seller status...</div>
        ) : data && data.descision && 
          <div>
            <div>You are not currently listed in our seller list</div>
            <RegisterSeller user={user} />
          </div>
        }
        { */}
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
                <div>You are not currently listed in our seller list</div>
                <RegisterSeller user={user} />
              </div>
            ),
            done: <div>Done. Redirecting</div>,
            waiting: (
              <div>
                <LoadingSpinner />
                Waiting
              </div>
            ),
          }[verifySuccess.status]
        }
      </div>
    );
  } else {
    return (
      <div>Loading User ...</div>
    )
  }
}
