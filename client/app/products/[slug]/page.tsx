import SideBar from "../../components/SideBar"

async function getData(category: string): Promise<ProductData[]> {
  let url = "";
  if (category != "all") {
    url = "/" + category;
  }
  let fetchUrl = "http://localhost:5000/api/products" + url
  const res = await fetch(fetchUrl);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

  return res.json();
}

export const revalidate = 0

export type ProductData = {
  product_id: number;
  name: string;
  price: number;
};

export default async function Page({ params }: { params: { slug: string } }) {
    const data: ProductData[] = await getData(params.slug);
    return (
        <div className="grow flex flex-row">
            <div className="hidden sm:block">
                <SideBar />
            </div>
            <div>
                <p className="pb-6 text-xs">All products</p>
                <div className="flex gap-10 flex-wrap">
                    {data.map((item: ProductData, idx: number) => {
                        return <div key={idx} className="flex flex-col shrink-0 w-64 md:w-36 hover:text-sky-500 hover:font-bold hover:cursor-pointer">
                                <div className="h-36 bg-slate-300 rounded"></div>
                                <div>{item.name}</div>
                                <div>{item.product_id}</div>
                                <div>{"$" + item.price}</div>
                            </div>
                    })}
                </div>
            </div>
        </div>
    )
}