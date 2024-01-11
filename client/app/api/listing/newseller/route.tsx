import { connectToDatabase } from "../../db";
export async function POST(request: Request) {
  const { client, imagekit } = await connectToDatabase();
  const body = await request.json();
  let { name, email, user_id, username, phonenumber, address } = body;
  if (name === "") name = username;
  try {
    const pgRes = await client.query(
      `INSERT INTO sellers(name, email, user_id, username, phonenumber, address) VALUES ('${name}', '${email}', '${user_id}', '${username}', '${phonenumber}', '${address}')`
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
