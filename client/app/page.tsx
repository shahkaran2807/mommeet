import Link from 'next/link'

const categories = [
  {
    link: "sale",
    description: "On Sale"
  },
  {
    link: "electronics",
    description: "Electronics"
  },
  {
    link: "school-supplies",
    description: "School Supplies"
  },
  {
    link: "entertainment",
    description: "Entertainment"
  },
  {
    link: "kitchen-supplies",
    description: "Kitchen Supplies"
  }
];
export default function Home() {
  return (
    <main className="flex flex-wrap gap-10">
      {categories.map((category, idx) => {
        return <Link key={category.link+idx} href={"/products/" + category.link}>
            <div className="flex flex-col w-96 hover:text-sky-500 hover:font-bold hover:cursor-pointer md:w-64">
              <div className="h-36 bg-slate-300 rounded"></div>
              <div>{category.description}</div>
            </div>
          </Link>
      })}
      <Link href="/products/all">
        <div className="flex flex-col w-96 hover:text-sky-500 hover:font-bold hover:cursor-pointer md:w-64">
          <div className="h-36 bg-slate-300 rounded"></div>
            <div>All</div>
          </div>
      </Link>
    </main>
  )
}
