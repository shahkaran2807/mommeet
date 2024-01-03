"use client";
import LoadingSpinner from "@/app/components/LoadingSpinner/LoadingSpinner";
import RegisterSeller from "@/app/components/RegisterSeller";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import useSWR from "swr";

const fetcher = (...args: any[]) => fetch(...args).then((res) => res.json());
export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  if (isLoaded) {
    console.log(`http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:${process.env.NEXT_PUBLIC_HOST_PORT}/api/listing/verify/${user.id}`)
    const { data, error, isLoading, isValidating } = useSWR(
      `http://${process.env.NEXT_PUBLIC_HOST_ADDRESS}:${process.env.NEXT_PUBLIC_HOST_PORT}/api/listing/verify/${user.id}`,
      fetcher
    );
    return (
      <div>
        {isLoading ? (
          <div><LoadingSpinner />Verifying your seller status...</div>
        ) : data.descision ? (
          redirect("/listing/new")
        ) : (
          <div>
            <div>You are not currently listed in our seller list</div>
            <RegisterSeller user={user} />
          </div>
        )}
      </div>
    );
  } else {
    return <div><LoadingSpinner />Loading user...</div>;
  }
}
