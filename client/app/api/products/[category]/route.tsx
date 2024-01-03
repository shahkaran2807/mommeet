import { connectToDatabase } from "../../db";
export async function GET(
  request: Request,
  { params }: { params: { category: string } }
) {
  const { client, imagekit } = await connectToDatabase();
  const pgRes = await client.query(
    `SELECT * FROM products WHERE category = '${params.category}'`
  );
  return Response.json(pgRes.rows);
}
