
import Link from "next/link"

export default function thankyou() {
    return (
     <div>
       <div className="flex row justify-center items-center h-screen">
            <p className="text-green-500 text-4xl font-bold">Done! Thank you!</p>
            <p>
            <Link href="/" className="text-blue-500 underline hover:text-blue-700">
                Go back to Homepage
            </Link>
            </p>
            
        </div>
     </div>
    )
  }