import { connectToDatabase, convertToPSQLArray } from "../db";
export async function POST(request: Request) {
  const { client, imagekit } = await connectToDatabase();
  const body = await request.json();
  let { email, phoneNumber, feedback } = body;

  try {
    const pgResInsert = await client.query(
      `INSERT INTO feedback(email, phonenumber, feedback) VALUES ('${email}', '${phoneNumber}', '${feedback}')`
    );
    return Response.json(
      { done: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (err) {
    console.log(err);
    return Response.json(
      { done: false },
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
}
