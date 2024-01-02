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
    const { data, error, isLoading, isValidating } = useSWR(
      `http://localhost:5000/api/listing/verify/${user.id}`,
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
