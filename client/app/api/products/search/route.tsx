import { connectToDatabase, convertToPSQLArray } from "../../db";
export async function POST(request: Request) {
  const { client, imagekit } = await connectToDatabase();
  const body = await request.json();
  let {
    search_term
  } = body;

  try {
    const pgResSearch = await client.query(
      `SELECT * FROM products WHERE name ILIKE '%${search_term}%'`
    );
    return Response.json(pgResSearch.rows);
  } catch (err) {
    console.log(err);
    return Response.json({ done: false });
  }
}