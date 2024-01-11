import { connectToDatabase } from "../db";
export const revalidate = 0;
export async function GET(req: Request) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query("SELECT * from products");
  return Response.json(pgRes.rows, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
