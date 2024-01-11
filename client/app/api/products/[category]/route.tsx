import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM products WHERE category = '${params.category}'`
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
