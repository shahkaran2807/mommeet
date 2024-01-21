"use client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const productName = searchParams.get("productName");
  const phoneNumber = searchParams.get("phoneNumber");
  const mailId = searchParams.get("mailId");
  const selectedDates = searchParams.getAll("selectedDates")

  const { isLoaded, isSignedIn, user } = useUser()


  const handleWhatsAppRedirect = () => {
    if (isLoaded) {
      const encodedPhoneNumber = encodeURIComponent(
        phoneNumber.replace(/[\s\-\[\]()]/g, "")
      );
      const message = `Hi! I am ${
        user.firstName
      }, I'm interested in renting out your ${
        productName
      } for dates ${selectedDates.map(
        (date) => date.split(",")[0]
      )}. Please let me know the best time for pickup. Thanks!`;
      const chatLink = `https://wa.me/${encodedPhoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.location.href = chatLink;
    }
  };
  const handleMailRedirect = () => {
    if (isLoaded) {
     
      const message = `Hi! I am ${
        user.firstName
      }, I'm interested in renting out your ${
        productName
      } for dates ${selectedDates.map(
        (date) => date.split(",")[0]
      )}. Please let me know the best time for pickup. Thanks!`;
      const chatLink = `mailto:${mailId}?subject=Request for ${productName}&body=${message}`;
      
      window.location.href = chatLink;
    }
  };
  handleMailRedirect()
  return (
    <div>Redirecting you to whatsapp</div>
  )
}
