import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { seller_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM sellers WHERE user_id = '${params.seller_id}'`
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
