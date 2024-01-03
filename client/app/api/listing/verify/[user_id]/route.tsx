import { connectToDatabase } from "../../../db";

export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const sellerId = params.user_id;
  const pgRes = await client.query(
    `SELECT * FROM sellers WHERE user_id = '${sellerId}'`
  );
  return Response.json({ decision: !!pgRes.rowCount });
}
