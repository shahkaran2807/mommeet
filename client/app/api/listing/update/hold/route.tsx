import { connectToDatabase } from "@/app/api/db";

export async function POST(request: Request) {
  const { client, imagekit } = await connectToDatabase();
  const body = await request.json();
  let { set_hold, product_id } = body;
  try {
    const pgResInsert = await client.query(
      `UPDATE products SET on_hold = ${set_hold} WHERE product_id = '${product_id}'`
    );
    return Response.json({ done: true });
  } catch (err) {
    console.log(err);
    return Response.json({ done: false });
  }
}
