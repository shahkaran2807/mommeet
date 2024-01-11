import { connectToDatabase } from "../../../db";

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const sellerId = params.user_id;
  const pgRes = await client.query(
    `SELECT * FROM sellers WHERE user_id = '${sellerId}'`
  );
  return Response.json(
    { decision: !!pgRes.rowCount },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
