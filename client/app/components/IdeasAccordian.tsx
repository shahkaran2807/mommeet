"use client"
import React, { useState } from 'react';


export default function IdeasAccordian({ openAccordion }: { openAccordion?: boolean }) {
    const categories = [
        {
          name: "Electronics",
          items: [
            { name: "Digital Cameras and Lenses/GoPro", description: "Aspiring photographers or professionals for specific projects might benefit from short-term rentals. Could also be beneficial for someone’s holiday trip eg. Wildlife Safari." },
            { name: "Drone", description: "Ideal for travelers, adventure enthusiasts, or capturing unique footage." },
            { name: "Projectors and Screens", description: "Home theater enthusiasts, event planners, and businesses might need them for presentations or outdoor movies." },
            { name: "Speaker/Sound System", description: "Perfect for parties, outdoor gatherings, or musicians on the go." },
            { name: "Karaoke Set", description: "Spice up gatherings and events with fun rental options." },
            { name: "Electric Bikes and Scooters", description: "..." },
            { name: "VR Headset", description: "Offer immersive gaming experiences or showcase VR technology for those curious to try it." },
            { name: "DJ Equipment", description: "..." },
            { name: "Cleaning Appliances", description: "Steam cleaners, carpet cleaners, vacuums for deep cleaning projects without large purchases." }
          ]
        },
        {
          name: "Kitchen or other Home Supplies",
          items: [
            { name: "Coffee Makers and Espresso Machines", description: "..." },
            { name: "Ice Cream Makers and Yogurt Makers", description: "..." },
            { name: "Air Fryers", description: "..." },
            { name: "Instant Pots", description: "..." },
            { name: "Electric Griddles and Waffle Makers", description: "..." },
            { name: "Food Processors and Toasters", description: "..." }
          ]
        },
        {
          name: "Musical Instruments",
          items: [
            { name: "Guitar, Keyboards, and Digital Pianos", description: "..." },
            { name: "Drum Set", description: "..." },
            { name: "Violin", description: "..." },
            { name: "Wind Instruments", description: "..." },
            { name: "Trumpets", description: "..." },
            { name: "Flute", description: "..." },
            { name: "Ukulele", description: "..." }
          ]
        },
        {
          name: "Clothes",
          items: [
            { name: "Evening Gowns and Dresses", description: "For weddings, galas, special occasions where purchasing a specific outfit might not be practical and too expensive." },
            { name: "Cocktail Dresses and Jumpsuits", description: "Versatile options for parties, dinners, events catering to various styles and sizes." },
            { name: "Festival Clothing and Costumes", description: "Cater to themed festivals like Halloween, cosplay events, or themed parties with unique finds." },
            { name: "Vintage Clothing", description: "Unique and authentic vintage finds for fashion enthusiasts, costume parties, or themed events." },
            { name: "Luxury Handbags and Clutches", description: "Statement pieces to elevate evening outfits offering designer brands or unique styles." },
            { name: "High-end Designer Pieces", description: "Luxury apparel and accessories from popular brands for special events or trying out trends." },
            { name: "Limited Edition Sneakers and Streetwear", description: "Catering to collectors and fans with exclusive or hard-to-find items." },
            { name: "Winter Coats and Skiwear", description: "Ideal for travelers visiting colder climates or trying out winter sports without heavy purchases." }
          ]
        },
        {
          name: "Sport Equipment",
          items: [
            { name: "Bikes (Road, Mountain, Hybrid)", description: "Great for exploring new cycling routes if you’re new to the city or trying out a different style before committing to purchase." },
            { name: "Camping and Hiking Gear", description: "Tents, sleeping bags, backpacks, hiking poles for weekend adventures or occasional trips." },
            { name: "Snow Sports Equipment", description: "Skis, ice-skates, snowboards for winter enthusiasts or trying out the snow for the first time." },
            { name: "Water Sports Gear", description: "Surfboards, Stand-up paddleboards, kayaks, canoes, life jackets for exploring lakes, rivers or enjoying beach vacations." },
            { name: "Rock Climbing Gear", description: "Harnesses, helmets, belay devices for enthusiasts or trying out climbing gyms." },
            { name: "Golf Clubs and Bags", description: "Ideal for occasional golfers or travelers without personal sets." },
            { name: "Volleyballs, Soccer Balls, Basketballs, Badminton Sets, Tennis Rackets, Table Tennis Equipment", description: "..." }
          ]
        },
        {
          name: "Tools",
          items: [
            { name: "Drills", description: "..." },
            { name: "Screw Driver Set", description: "..." },
            { name: "Ladder", description: "..." },
            { name: "Painting Supplies", description: "..." }
          ]
        },
        {
          name: "Furniture and Home Decor",
          items: [
            { name: "Folding/Portable Tables and Chairs", description: "Perfect for hosting parties, events or temporary extra seating." },
            { name: "Outdoor Furniture and Patio Equipment", description: "Seasonal rentals for barbecues, poolside lounging or backyard gatherings." },
            { name: "Holiday Decorations and Party Supplies", description: "Festive lights, inflatable ornaments, themed tableware for seasonal occasions." }
          ]
        },
        {
          name: "Accessories",
          items: [
            { name: "Camera Lenses and Filters", description: "Perfect for aspiring photographers or trying out specific equipment before purchase or for someone with just a one-time use." },
            { name: "Camera Stabilizers", description: "Gimbal stabilizers, camera rigs for smooth video capture and creative filmmaking." },
            { name: "Travel Bags and Backpacks", description: "Perfect for weekend getaways or adventurous trips offering diverse styles and functionalities." },
            { name: "Designer and High-end Jewelry", description: "Cater to special occasions with luxury rings, necklaces, earrings, and bracelets." },
            { name: "Lighting Equipment", description: "Portable studio lights, flashes, reflectors for indoor and outdoor photography setups." }
          ]
        }
      ];
      
      const headerId = "what-to-rent-header";

      const [openCategory, setOpenCategory] = useState(null);
      const [openItem, setOpenItem] = useState<any>({});
      const [isIdeasOpen, setIsIdeasOpen] = useState(!!openAccordion);

  return (
        <div>
        <div className="">
        <div className="cursor-pointer hover:text-gray-300 text-blue-600" onClick={() => setIsIdeasOpen(!isIdeasOpen)} id={headerId}>
            Confused what to rent?
        </div>
        <div className={isIdeasOpen ? 'block' : 'hidden'}>
            <p>Here are some sample products that might be lying idle at your home</p>
            <p className="text-xs"><i>These are just a sample set of product ideas for you. You are not restricted to these
             products and you can upload anything else that is not mentioned here. But please make sure that the products you list have the potential 
             to get rented out. For example products like shoes, routine clothes, earphones, etc have very less potential to rent out</i></p>
            {categories.map((category, catIndex) => (
            <div key={catIndex} className="border-b">
                <div className="font-bold p-2 cursor-pointer hover:text-gray-300 text-blue-600" onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)}>
                {category.name}
                </div>
                <div className={openCategory === catIndex ? 'block' : 'hidden'}>
                {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="pl-4 border-l">
                    <div className="font-semibold p-2 cursor-pointer" onClick={() => setOpenItem({ ...openItem, [catIndex]: openItem[catIndex] === itemIndex ? null : itemIndex })}>
                        {item.name}
                    </div>
                    <div className={openItem[catIndex] === itemIndex ? 'block p-2' : 'hidden'}>
                        {item.description}
                    </div>
                    </div>
                ))}
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
}