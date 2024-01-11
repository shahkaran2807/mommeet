import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { product_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM products WHERE product_id = '${params.product_id}'`
  );
  return Response.json(pgRes.rows, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
