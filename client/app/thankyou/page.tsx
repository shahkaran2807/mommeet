
import Link from "next/link"

export default function thankyou() {
    return (
     <div>
       <div className="flex flex-col justify-center items-center h-screen">
            <div className="text-green-500 text-4xl font-bold">Done! Thank you!</div>
            <div>
            <Link href="/" className="text-blue-500 underline hover:text-blue-700">
                Go back to Homepage
            </Link>
            </div>
            
        </div>
     </div>
    )
  }