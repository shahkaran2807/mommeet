"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Implement form submission logic here
    // You can access the form values using the form's name attributes
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber');
    const feedback = formData.get('feedback');

    // For demonstration purposes, you can log the values to the console
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Feedback:', feedback);

    const data = {
      email: email,
      phoneNumber: phoneNumber,
      feedback: feedback,
    };
    fetch(`${process.env.NEXT_PUBLIC_HOST_ADDRESS}/api/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json()).then((res) => {
      if(res.done)
      {
        router.push("/thankyou")
        e.target.reset();
      }
      else{
        window.alert('Error. Please try again')
      }
    })
    
  };

  return (
    <div className="bg-black text-white py-4 mt-5 w-full">
      <div className="container mx-auto flex flex-col items-center">
        <nav className="flex mb-4">
          <Link href="/aboutus" className="hover:text-gray-300">
            About Us
          </Link>

        </nav>

        <form onSubmit={handleSubmit} className="w-full sm:w-auto">
          <div className="mb-2 flex flex-col sm:flex-row">
            <div className="flex flex-col">
              <label htmlFor="email" className="mr-2 text-xs">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="border rounded px-2 py-1 mr-2 text-slate-800"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="mr-2 text-xs">
                Phone Number:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Phone Number"
                className="border rounded px-2 py-1 mr-2 text-slate-800"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="feedback" className="block text-xs">
              Feedback:
            </label>
            <textarea
              name="feedback"
              id="feedback"
              placeholder="Feedback"
              className="border rounded px-2 py-1 w-full mb-2 text-slate-800"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}
