import Link from "next/link";
import IdeasAccordian from "../components/IdeasAccordian";

export default function AboutUs() {
    return (
     <div>

        
        <h1 className="text-3xl"><b>About</b></h1>   
        <br></br>     
        <p>Welcome to RentEasy, A peer-to-peer marketplace to rent (almost) anything!
        Think of it as Airbnb for (almost) anything and everything!
        People owning idle assets like Camera, Bicycle, Projector can upload their products
        on our platform and people needing temporary access to these items can rent them out here. 
        In this way owner can earn passive income on their idle assets, and people needing temporary access 
        to these items wont need to buy them, instead just rent it out and save money.
        Founded by a passionate group of Cornell Tech students situated on the Roosevelt Island, 
        we&apos;re thrilled to introduce our first prototype with the main goal of fostering a community of sharing and accessibility.</p>

        <br></br>
        <IdeasAccordian openAccordion={true}></IdeasAccordian>
        <br></br>

        <h1 className="text-3xl"><b>How does it work?</b></h1>  
        <br></br>
        <p><b>Owner:</b> You have have an asset lying idle in your home eg. Camera, Bicycle, Projector, you can upload it on our platform for free. 
        Click on &apos;List New Item&apos; on top right of the page to register as a owner and start listing your items. You will have to provide
        your phone number, Address and Email to register as a owner. If someone wishes to rent out the products that you have listed, you will
        be reached out by them over your provided email id.</p>
        <p>While handing over the product make sure that the renter/customer is trustworthy and we recommend asking their address and phone number. 
        Once you have handed over your product, go to My Listings Page by clicking on the profile icon at the top right of your screen, and mark 
        the product as rented and make those dates unavailable by clicking on the edit option.</p>
        <p>Once the rental period is over and you get back your product, go to My Listings Page and click the Rented button to make the product 
        available again and change the dates to available.</p>
        <br></br>
       <p><b>Customer/renter:</b> If you need temporary access to an asset eg. a DSLR Camera for a holiday trip, you can reach out to people in your neighborhood
        having those items, via our platform. Once you request for a product, you will automatically be redirected to WhatsApp with a pre written message.</p>
        <p>When you go to pickup the product please make sure the product is functioning properly</p>
        <p>During your rental period please make sure to handle the product carefully and in case of damage/loss/theft you will be responsible to pay the full amount
         of the product to the owner. </p>

        <br></br>

        <h1 className="text-3xl"><b>This is our first prototype</b></h1>
        <br></br>
        <p>
        You might be thinking of this product as too basic with only a few features - and we get it! This is simply our initial prototype - the start of something big, created with the sole 
        purpose of assessing product-market fit, validating our idea, and engaging with customers. Currently, our service is restricted to individuals on Roosevelt 
        Island, and we want to clarify that we are not a registered company. We do not offer protection, payment processing, or delivery facilitation at this stage, 
        and we cannot be held responsible for any damage or loss incurred during a rental. We recognize the importance of these elements for building trust, and we 
        plan to incorporate them in the future.
        </p>

        <br></br>

        <h1 className="text-3xl"><b>Contact Us</b></h1>
        <br></br>
        <p><b>Karan Shah (Meng CS student at Cornell Tech)</b></p>
        <p>Email: shahkaran2807@gmail.com</p>
        <p>Mobile: +19295229890</p>
        <p>
            <Link href="https://wa.me/+19295229890" className="text-blue-500 underline hover:text-blue-700">
                Chat on Whatsapp
            </Link>
        </p>
        <br></br>
        <p><b>Lakshit Dua (Meng CS student at Cornell Tech)</b></p>
        <p>Email: lakshit99@gmail.com</p>
        <p>Mobile: +19144699641</p>
        <Link href="https://wa.me/+19144699641" className="text-blue-500 underline hover:text-blue-700">
                Chat on Whatsapp
        </Link>
     </div>
    )
  }