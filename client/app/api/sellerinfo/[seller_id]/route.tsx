import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { seller_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM sellers WHERE user_id = '${params.seller_id}'`
  );
  return Response.json(pgRes.rows);
}