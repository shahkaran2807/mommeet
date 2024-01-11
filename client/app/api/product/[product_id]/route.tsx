import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { product_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM products WHERE product_id = '${params.product_id}'`
  );
  return Response.json(pgRes.rows);
}